import * as Haptics from 'expo-haptics';
import { Stack, router } from 'expo-router';
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
import { OTPInput } from '@/components/OTPInput';
import { useAuth } from '@/lib/hooks/useAuth';

const LOGO_SOURCE = {
  uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/original-logo.28276aeb.png&w=2048&q=75',
};

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const { isLoaded, resetPassword, attemptPasswordReset } = useAuth();

  const alertRef = React.useRef<AlertMethods>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [successfulCreation, setSuccessfulCreation] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onRequestReset = async () => {
    if (!isLoaded || loading) return;

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    const result = await resetPassword(email);
    if (result.success) {
      setSuccessfulCreation(true);
      setError('');
    } else {
      const errorMessage = result.error || 'An unknown error occurred.';
      setError(errorMessage);
      alertRef.current?.alert({ title: 'Error', message: errorMessage });
    }
    setLoading(false);
  };

  const onReset = async () => {
    if (!isLoaded || loading) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await attemptPasswordReset(code, password);

    if (result.success) {
      alertRef.current?.alert({
        title: 'Success',
        message: 'Password reset successfully.',
        buttons: [{ text: 'OK', onPress: () => router.back() }],
      });
    } else {
      const errorMessage = result.error || 'Password reset failed.';
      setError(errorMessage);
      alertRef.current?.alert({ title: 'Error', message: errorMessage });
    }
    setLoading(false);
  };

  if (successfulCreation) {
    return (
      <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
        <Stack.Screen options={{ title: 'Reset Password' }} />
        <KeyboardAwareScrollView contentContainerClassName="p-8">
          <View className="items-center pb-1">
            <Text variant="title1" className="pb-1 pt-4 text-center">
              Enter Code & New Password
            </Text>
          </View>
          <Form className="gap-2 pt-6">
            <FormSection>
              <FormItem>
                <OTPInput
                  value={code}
                  onChangeText={setCode}
                  isLoading={loading}
                  onSubmit={() => KeyboardController.setFocusTo('next')}
                  hasError={!!error}
                />
              </FormItem>
              <FormItem>
                <TextField label="New Password" onChangeText={setPassword} secureTextEntry />
              </FormItem>
              <FormItem>
                <TextField
                  label="Confirm New Password"
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  errorMessage={error.includes('Passwords') ? error : undefined}
                />
              </FormItem>
            </FormSection>
          </Form>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
          <View className="px-12 py-4">
            <Button loading={loading || !isLoaded} size="lg" onPress={onReset}>
              <Text>Set New Password</Text>
            </Button>
          </View>
        </KeyboardStickyView>
        <AlertAnchor ref={alertRef} />
      </View>
    );
  }

  return (
    <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
      <Stack.Screen options={{ title: 'Forgot Password' }} />
      <KeyboardAwareScrollView contentContainerClassName="ios:pt-12 pt-20 px-8">
        <View className="items-center pb-1">
          <Image source={LOGO_SOURCE} className="ios:h-12 ios:w-12 h-8 w-8" resizeMode="contain" />
          <Text variant="title1" className="ios:font-bold pb-1 pt-4 text-center">
            What&apos;s your email?
          </Text>
        </View>
        <View className="ios:pt-4 pt-6">
          <Form>
            <FormSection>
              <FormItem>
                <TextField
                  onChangeText={setEmail}
                  label="Email"
                  autoFocus
                  keyboardType="email-address"
                  errorMessage={error ? error : undefined}
                />
              </FormItem>
            </FormSection>
          </Form>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
        <View className="px-12 py-4">
          <Button loading={loading || !isLoaded} size="lg" onPress={onRequestReset}>
            <Text>Submit</Text>
          </Button>
        </View>
      </KeyboardStickyView>
      <AlertAnchor ref={alertRef} />
    </View>
  );
}