import { useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import * as React from 'react';

import { Image, Platform, Pressable, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlertAnchor } from '@/components/nativewindui/Alert';
import type { AlertMethods } from '@/components/nativewindui/Alert/types';
import { Button } from '@/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '@/components/nativewindui/Form';
import { Text } from '@/components/nativewindui/Text';
import { TextField } from '@/components/nativewindui/TextField';
import { OTPInput } from '@/components/OTPInput';
import { useAuth } from '@/lib/hooks/useAuth';

const LOGO_SOURCE = {
  uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/original-logo.28276aeb.png&w=2048&q=75',
};

const COUNTDOWN_SECONDS_TO_RESEND_CODE = 10;
let countdownInterval: ReturnType<typeof setInterval> | null = null;

export default function CredentialsScreen() {
  const insets = useSafeAreaInsets();
  const auth = useAuth();

  const [focusedTextField, setFocusedTextField] = React.useState<
    'email' | 'password' | 'confirm-password' | 'code' | null
  >(null);
  const alertRef = React.useRef<AlertMethods>(null);
  const [error, setError] = React.useState('');
  const { firstName, lastName } = useLocalSearchParams<{ firstName: string; lastName: string }>();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [countdown, setCountdown] = React.useState(COUNTDOWN_SECONDS_TO_RESEND_CODE);

  React.useEffect(() => {
    if (!pendingVerification) return;
    
    countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownInterval) clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [pendingVerification]);

  async function resendCode() {
    if (loading || !auth.isLoaded || !auth.signUp) return;

    setLoading(true);
    try {
      await auth.signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setCountdown(COUNTDOWN_SECONDS_TO_RESEND_CODE); // Reset countdown on success
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.longMessage || 'An unknown error occurred.';
      setError(errorMessage);
      alertRef.current?.alert({ title: 'Error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  async function onSignUpPress() {
    if (loading || !auth.isLoaded) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    
    const result = await auth.signUpWithEmailPassword(email, password, firstName, lastName);

    if (result.success) {
      setPendingVerification(true);
      setError('');
    } else {
      const errorMessage = result.error || 'An unknown error occurred.';
      setError(errorMessage);
      alertRef.current?.alert({
        title: 'Sign Up Error',
        message: errorMessage,
      });
    }

    setLoading(false);
  }

  const onVerifyPress = async () => {
    if (!auth.isLoaded) return;
    if (code.length !== 6) {
      setError('Please enter a complete 6-digit code.');
      return;
    }

    setLoading(true);
    const result = await auth.verifyEmail(code);

    if (!result.success) {
      const errorMessage = result.error || 'Verification failed.';
      setError(errorMessage);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      alertRef.current?.alert({
        title: 'Verification Error',
        message: errorMessage,
      });
    }
    // On success, the root layout watcher will handle navigation
    setLoading(false);
  };

  if (pendingVerification) {
    return (
      <>
        <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
          <KeyboardAwareScrollView
            bottomOffset={Platform.select({ ios: 8 })}
            bounces={false}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentContainerClassName="ios:pt-12 pt-20">
            <View className="ios:px-12 flex-1 px-8">
              <View className="items-center pb-1">
                <Image source={LOGO_SOURCE} className="h-10 w-10" resizeMode="contain" />
              </View>
              <View className="gap-1 pb-6">
                <Text variant="title1" className="text-center font-semibold">
                  Enter your code
                </Text>
                <Text variant="subhead" className="text-center">
                  We sent the code to{' '}
                  <Text variant="subhead" className="font-semibold">
                    {email}
                  </Text>
                </Text>
              </View>
              <View>
                <Form className="gap-2">
                  <FormSection className="ios:bg-background">
                    <FormItem>
                      <OTPInput
                        value={code}
                        onChangeText={setCode}
                        isLoading={loading}
                        onSubmit={onVerifyPress}
                        hasError={!!error}
                      />
                      {error ? (
                        <Text className="text-destructive px-4 pt-2 text-sm">{error}</Text>
                      ) : null}
                    </FormItem>
                  </FormSection>
                </Form>
                <Animated.View className="flex-row justify-center gap-0.5 pt-4">
                  <Animated.View layout={Platform.select({ ios: LinearTransition })}>
                    <Text variant="caption1" className="text-center font-medium opacity-70">
                      Didn&apos;t receive the code?{' '}
                    </Text>
                  </Animated.View>
                  {countdown > 0 ? (
                    <Animated.View
                      key="resend-in"
                      entering={Platform.select({ ios: FadeIn })}
                      layout={Platform.select({ ios: LinearTransition })}>
                      <Text variant="caption1" className="font-normal opacity-70">
                        Resend in {countdown} second{countdown > 1 ? 's' : ''}
                      </Text>
                    </Animated.View>
                  ) : (
                    <Animated.View
                      key="resend"
                      entering={Platform.select({ ios: FadeIn.duration(500) })}
                      layout={Platform.select({ ios: LinearTransition })}>
                      <Pressable
                        className="active:opacity-70"
                        onPress={resendCode}
                        disabled={loading}>
                        <Text className="text-xs font-semibold opacity-90">Resend</Text>
                      </Pressable>
                    </Animated.View>
                  )}
                </Animated.View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
            <View className="px-12 py-4">
              <Button loading={loading} size="lg" onPress={onVerifyPress}>
                <Text>Verify</Text>
              </Button>
            </View>
          </KeyboardStickyView>
        </View>
        <AlertAnchor ref={alertRef} />
      </>
    );
  }

  return (
    <>
      <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
        <KeyboardAwareScrollView
          bottomOffset={Platform.select({ ios: 8 })}
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
                {Platform.select({ ios: 'Set up your credentials', default: 'Create Account' })}
              </Text>
              {Platform.OS !== 'ios' && (
                <Text className="ios:text-sm text-muted-foreground text-center">
                  Set up your credentials
                </Text>
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
                      onFocus={() => setFocusedTextField('email')}
                      onBlur={() => setFocusedTextField(null)}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      returnKeyType="next"
                      errorMessage={error.includes('Email') ? error : undefined}
                    />
                  </FormItem>
                  <FormItem>
                    <TextField
                      onChangeText={setPassword}
                      placeholder={Platform.select({ ios: 'Password', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'Password' })}
                      onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                      onFocus={() => setFocusedTextField('password')}
                      onBlur={() => setFocusedTextField(null)}
                      submitBehavior="submit"
                      secureTextEntry
                      returnKeyType="next"
                      textContentType="newPassword"
                      errorMessage={error.includes('Password') ? error : undefined}
                    />
                  </FormItem>
                  <FormItem>
                    <TextField
                      onChangeText={setConfirmPassword}
                      placeholder={Platform.select({ ios: 'Confirm password', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'Confirm password' })}
                      onFocus={() => setFocusedTextField('confirm-password')}
                      onBlur={() => setFocusedTextField(null)}
                      onSubmitEditing={onSignUpPress}
                      secureTextEntry
                      returnKeyType="done"
                      textContentType="newPassword"
                      errorMessage={error.includes('Passwords do not match') ? error : undefined}
                    />
                  </FormItem>
                </FormSection>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
          {Platform.OS === 'ios' ? (
            <View className=" px-12 py-4">
              <Button loading={loading || !auth.isLoaded} size="lg" onPress={onSignUpPress}>
                <Text>Submit</Text>
              </Button>
            </View>
          ) : (
            <View className="flex-row justify-end py-4 pl-6 pr-8">
              <Button
                loading={loading || !auth.isLoaded}
                onPress={() => {
                  if (focusedTextField !== 'confirm-password') {
                    KeyboardController.setFocusTo('next');
                    return;
                  }
                  KeyboardController.dismiss();
                  onSignUpPress();
                }}>
                <Text className="text-sm">
                  {focusedTextField !== 'confirm-password' ? 'Next' : 'Submit'}
                </Text>
              </Button>
            </View>
          )}
        </KeyboardStickyView>
      </View>
      <AlertAnchor ref={alertRef} />
    </>
  );
}