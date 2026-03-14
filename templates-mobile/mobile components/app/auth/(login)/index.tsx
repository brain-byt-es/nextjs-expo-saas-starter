import * as Haptics from 'expo-haptics';
import { Link, Stack, router } from 'expo-router';
import * as React from 'react';
import { Image, Platform, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlertAnchor } from '@/components/nativewindui/Alert';
import type { AlertMethods } from '@/components/nativewindui/Alert/types';
import { Button } from '@/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '@/components/nativewindui/Form';
import { Text } from '@/components/nativewindui/Text';
import { TextField } from '@/components/nativewindui/TextField';
import { useAuth } from '@/lib/hooks/useAuth';

const LOGO_SOURCE = {
  uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/original-logo.28276aeb.png&w=2048&q=75',
};

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { signInWithEmailPassword, isLoaded } = useAuth();
  const [focusedTextField, setFocusedTextField] = React.useState<'email' | 'password' | null>(null);
  const alertRef = React.useRef<AlertMethods>(null);
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function onSubmit() {
    if (!isLoaded || loading) return;
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    const result = await signInWithEmailPassword(email, password);

    if (result.success) {
      if (result.needsMfa) {
        console.log('MFA is required for this account.');
        // In a real app, you would navigate to an MFA screen here.
        alertRef.current?.alert({
          title: 'MFA Required',
          message: 'Please complete the next step to secure your account.',
        });
      }
      // On success (with or without MFA), the root layout watcher will handle navigation.
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      const errorMessage = result.error || 'Sign in failed. Please check your credentials.';
      setError(errorMessage);
      Platform.select({
        ios: alertRef.current?.alert({
          title: 'Sign In Error',
          message: errorMessage,
          buttons: [{ text: 'OK' }],
        }),
      });
    }

    setLoading(false);
  }

  return (
    <>
      <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
        <Stack.Screen
          options={{
            title: 'Log in',
            headerShadowVisible: false,
            headerLeft() {
              return (
                <Button
                  variant="plain"
                  className="ios:px-0"
                  onPressOut={() => {
                    // workaround for https://github.com/expo/expo/issues/29489
                    router.back();
                  }}>
                  <Text className="text-primary">Cancel</Text>
                </Button>
              );
            },
          }}
        />
        <KeyboardAwareScrollView
          bottomOffset={Platform.select({ ios: 175 })}
          bounces={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="ios:pt-12 pt-20">
          <View className="ios:px-12 flex-1 px-8">
            <View className="items-center pb-1">
              <Image
                source={LOGO_SOURCE}
                className="ios:h-12 ios:w-12 h-8 w-8"
                resizeMode="contain"
              />
              <Text variant="title1" className="ios:font-bold pb-1 pt-4 text-center">
                {Platform.select({ ios: 'Welcome back!', default: 'Log in' })}
              </Text>
              {Platform.OS !== 'ios' && (
                <Text className="ios:text-sm text-muted-foreground text-center">Welcome back!</Text>
              )}
            </View>
            <View className="ios:pt-4 pt-6">
              <Form className="gap-2">
                <FormSection className="ios:bg-background">
                  <FormItem>
                    <TextField
                      onChangeText={setEmail}
                      placeholder={Platform.select({ ios: 'Email', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'Email' })}
                      onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                      submitBehavior="submit"
                      autoFocus
                      onFocus={() => setFocusedTextField('email')}
                      onBlur={() => setFocusedTextField(null)}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      returnKeyType="next"
                      errorMessage={error.includes('Email') || error.includes('identifier') ? error : undefined}
                    />
                  </FormItem>
                  <FormItem>
                    <TextField
                      onChangeText={setPassword}
                      placeholder={Platform.select({ ios: 'Password', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'Password' })}
                      onFocus={() => setFocusedTextField('password')}
                      onBlur={() => setFocusedTextField(null)}
                      secureTextEntry
                      returnKeyType="done"
                      textContentType="password"
                      onSubmitEditing={onSubmit}
                      errorMessage={error.includes('Password') ? error : undefined}
                    />
                  </FormItem>
                </FormSection>
                <View className="flex-row">
                  <Link asChild href="/auth/(login)/forgot-password">
                    <Button size="sm" variant="plain" className="px-0.5">
                      <Text className="text-primary text-sm">Forgot password?</Text>
                    </Button>
                  </Link>
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView
          offset={{
            closed: 0,
            opened: Platform.select({ ios: insets.bottom + 30, default: insets.bottom }),
          }}>
          {Platform.OS === 'ios' ? (
            <View className=" px-12 py-4">
              <Button loading={loading || !isLoaded} size="lg" onPress={onSubmit}>
                <Text>Continue</Text>
              </Button>
            </View>
          ) : (
            <View className="flex-row justify-between py-4 pl-6 pr-8">
              <Button
                variant="plain"
                className="px-2"
                onPress={() => {
                  router.replace('/auth/(create-account)');
                }}>
                <Text className="text-primary px-0.5 text-sm">Create Account</Text>
              </Button>
              <Button
                loading={loading || !isLoaded}
                onPress={() => {
                  if (focusedTextField === 'email') {
                    KeyboardController.setFocusTo('next');
                    return;
                  }
                  KeyboardController.dismiss();
                  onSubmit();
                }}>
                <Text className="text-sm">{focusedTextField === 'email' ? 'Next' : 'Submit'}</Text>
              </Button>
            </View>
          )}
        </KeyboardStickyView>
        {Platform.OS === 'ios' && (
          <Button
            variant="plain"
            onPress={() => {
              router.replace('/auth/(create-account)');
            }}>
            <Text className="text-primary text-sm">Create Account</Text>
          </Button>
        )}
      </View>
      <AlertAnchor ref={alertRef} />
    </>
  );
}