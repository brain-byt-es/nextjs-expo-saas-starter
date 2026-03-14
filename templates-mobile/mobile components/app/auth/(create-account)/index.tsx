import * as Haptics from 'expo-haptics';
import { Link, router } from 'expo-router';
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

const LOGO_SOURCE = {
  uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/original-logo.28276aeb.png&w=2048&q=75',
};

export default function InfoScreen() {
  const alertRef = React.useRef<AlertMethods>(null);
  const [error, setError] = React.useState('');
  const insets = useSafeAreaInsets();
  const [focusedTextField, setFocusedTextField] = React.useState<'first-name' | 'last-name' | null>(
    null
  );

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  function onSubmit() {
    if (!firstName) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      Platform.select({
        ios: alertRef.current?.alert({
          title: 'First Name is required',
          message: 'Please enter your first name',
          buttons: [{ text: 'OK' }],
        }),
      });

      setError('First Name is required');
      return;
    }
    if (!lastName) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      Platform.select({
        ios: alertRef.current?.alert({
          title: 'Last Name is required',
          message: 'Please enter your last name',
          buttons: [{ text: 'OK' }],
        }),
      });
      setError('Last Name is required');
      return;
    }
    setError('');
    router.push({
      pathname: '/auth/(create-account)/credentials',
      params: { firstName, lastName },
    });
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
                {Platform.select({ ios: "What's your name?", default: 'Create your account' })}
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
                      onChangeText={(text) => {
                        setFirstName(text);
                      }}
                      placeholder={Platform.select({ ios: 'First Name', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'First Name' })}
                      onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                      submitBehavior="submit"
                      autoFocus
                      onFocus={() => setFocusedTextField('first-name')}
                      onBlur={() => setFocusedTextField(null)}
                      textContentType="givenName"
                      returnKeyType="next"
                      errorMessage={error.includes('First Name') ? error : undefined}
                    />
                  </FormItem>
                  <FormItem>
                    <TextField
                      onChangeText={(text) => {
                        setLastName(text);
                      }}
                      placeholder={Platform.select({ ios: 'Last Name', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'Last Name' })}
                      onFocus={() => setFocusedTextField('last-name')}
                      onBlur={() => setFocusedTextField(null)}
                      textContentType="familyName"
                      returnKeyType="next"
                      submitBehavior="submit"
                      onSubmitEditing={onSubmit}
                      errorMessage={error.includes('Last Name') ? error : undefined}
                    />
                  </FormItem>
                </FormSection>
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
              <Button size="lg" onPress={onSubmit}>
                <Text>Continue</Text>
              </Button>
            </View>
          ) : (
            <View className="flex-row justify-between py-4 pl-6 pr-8">
              <Link href="/auth/(login)" asChild replace>
                <Button variant="plain" className="px-2">
                  <Text className="text-primary text-sm">Already have an account?</Text>
                </Button>
              </Link>
              <Button
                onPress={() => {
                  if (focusedTextField === 'first-name') {
                    KeyboardController.setFocusTo('next');
                    return;
                  }
                  KeyboardController.dismiss();
                  onSubmit();
                }}>
                <Text className="text-sm">Next</Text>
              </Button>
            </View>
          )}
        </KeyboardStickyView>
        {Platform.OS === 'ios' && (
          <Link href="/auth/(login)" asChild replace>
            <Button variant="plain">
              <Text className="text-primary text-sm">Already have an account?</Text>
            </Button>
          </Link>
        )}
      </View>
      <AlertAnchor ref={alertRef} />
    </>
  );
}
