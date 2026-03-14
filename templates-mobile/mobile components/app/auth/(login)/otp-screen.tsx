import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import {
  Image,
  type FocusEvent,
  Keyboard,
  Platform,
  Pressable,
  type TextInputKeyPressEvent,
  View,
} from 'react-native';
import { KeyboardAwareScrollView, KeyboardController } from 'react-native-keyboard-controller';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator } from '@/components/nativewindui/ActivityIndicator';
import { AlertAnchor } from '@/components/nativewindui/Alert';
import type { AlertMethods } from '@/components/nativewindui/Alert/types';
import { Button } from '@/components/nativewindui/Button';
import { Text } from '@/components/nativewindui/Text';
import { TextField } from '@/components/nativewindui/TextField';
import { useColorScheme } from '@/lib/useColorScheme';
import { cn } from '@/lib/cn';

const LOGO_SOURCE = {
  uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/original-logo.28276aeb.png&w=2048&q=75',
};

const COUNTDOWN_SECONDS_TO_RESEND_CODE = 10;

const NUM_OF_CODE_CHARACTERS = 6;

const SCREEN_OPTIONS = {
  headerTransparent: true,
  title: '',
  headerShown: true,
};

let countdownInterval: ReturnType<typeof setInterval> | null = null;

export default function OneTimePasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const insets = useSafeAreaInsets();
  const [countdown, setCountdown] = React.useState(COUNTDOWN_SECONDS_TO_RESEND_CODE);
  const [codeValues, setCodeValues] = React.useState(Array(NUM_OF_CODE_CHARACTERS).fill(''));
  const [errorIndexes, setErrorIndexes] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const alertRef = React.useRef<AlertMethods>(null);
  const headerHeight = useHeaderHeight();

  React.useEffect(() => {
    countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownInterval) {
            clearInterval(countdownInterval);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, []);

  async function resendCode() {
    // Handle the resend code action here
    setCountdown(COUNTDOWN_SECONDS_TO_RESEND_CODE);
    countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          if (countdownInterval) {
            clearInterval(countdownInterval);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIsLoading(true);
    console.warn('resendCode is deprecated and should not be used.');
    setIsLoading(false);
  }

  async function onSubmit() {
    const errorIndexes = codeValues
      .map((str, index) => (str === '' ? index : -1))
      .filter((index) => index !== -1);

    if (errorIndexes.length > 0) {
      setErrorIndexes(errorIndexes);
      alertRef.current?.alert({
        title: 'Error',
        message: 'Incomplete one-time-password',
        buttons: [{ text: 'OK' }],
      });
      return;
    }
    setErrorIndexes([]);
    // Handle sending the OTP to the server here
    // Simulate a network request
    setIsLoading(true);

    console.warn('onSubmit for OTP is deprecated and should not be used.');
    alertRef.current?.alert({
      title: 'Error',
      message: 'This screen is no longer in use.',
      buttons: [{ text: 'OK' }],
    });

    setIsLoading(false);
  }

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-1 px-8"
        style={{ paddingBottom: insets.bottom, paddingTop: headerHeight }}
        extraKeyboardSpace={-insets.bottom + 12}>
        <View className="flex-1 justify-center gap-3">
          <View className="items-center pb-1">
            <Image source={LOGO_SOURCE} className="h-10 w-10" resizeMode="contain" />
          </View>
          <View className="gap-1">
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
          <View className="flex-row justify-between gap-2 py-3">
            {codeValues.map((value, index) => (
              <OTPField
                key={index}
                index={index}
                value={value}
                codeValues={codeValues}
                setCodeValues={setCodeValues}
                isLoading={isLoading}
                onSubmit={onSubmit}
                hasError={errorIndexes.includes(index)}
              />
            ))}
          </View>

          <Animated.View className="flex-row justify-center gap-0.5">
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
                <Pressable className="active:opacity-70" onPress={resendCode} disabled={isLoading}>
                  <Text className="text-xs font-semibold opacity-90">Resend</Text>
                </Pressable>
              </Animated.View>
            )}
          </Animated.View>
        </View>
        <Button size="lg" onPress={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <View className="py-1">
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <Text>Continue</Text>
          )}
        </Button>
      </KeyboardAwareScrollView>
      <AlertAnchor ref={alertRef} />
    </>
  );
}

const OTP_FIELD_SELECTION = { start: 0, end: 1 };

type OTPFieldProps = {
  index: number;
  value: string;
  codeValues: string[];
  setCodeValues: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean;
  onSubmit: () => void;
  hasError: boolean;
};

function OTPField({
  index,
  value,
  codeValues,
  setCodeValues,
  isLoading,
  onSubmit,
  hasError,
}: OTPFieldProps) {
  const { colors } = useColorScheme();
  const [isFocused, setIsFocused] = React.useState(false);

  function onKeyPress({ nativeEvent }: TextInputKeyPressEvent) {
    if (nativeEvent.key === 'Backspace' && value === '') {
      KeyboardController.setFocusTo('prev');
    }
    if (value === nativeEvent.key) {
      KeyboardController.setFocusTo('next');
    }
  }

  function onFocus(e: FocusEvent) {
    e.currentTarget.setNativeProps({
      selection: { start: 0, end: value?.toString().length },
    });
    setIsFocused(true);
  }

  function onBlur() {
    setIsFocused(false);
  }

  function onChangeText(text: string) {
    setCodeValues((prev) => {
      const values = [...prev];

      if (text.length === 0) {
        values[index] = '';
        if (codeValues[index + 1] === '') {
          KeyboardController.setFocusTo('prev');
        }
        return values;
      }

      for (let i = 0; i < text.length; i++) {
        if (index + i >= NUM_OF_CODE_CHARACTERS) {
          break;
        }
        values[index + i] = text.charAt(i);
      }
      if (text.length < NUM_OF_CODE_CHARACTERS - 1) {
        KeyboardController.setFocusTo('next');
      } else {
        Keyboard.dismiss();
      }

      return values;
    });
  }

  return (
    <TextField
      value={value}
      editable={!isLoading}
      keyboardType="numeric"
      autoComplete="sms-otp"
      textContentType="oneTimeCode"
      containerClassName={cn(
        'flex-1 ios:bg-background ios:shadow-sm ios:shadow-muted/40 ios:border ios:border-border ios:rounded-lg',
        isFocused && 'ios:border-primary border-primary'
      )}
      className="bg-card/80 ios:rounded-lg pr-2.5 text-center"
      clearButtonMode="never"
      materialHideActionIcons
      materialRingColor={hasError ? colors.destructive : undefined}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      onChangeText={onChangeText}
      onSubmitEditing={
        index === NUM_OF_CODE_CHARACTERS - 1
          ? onSubmit
          : () => KeyboardController.setFocusTo('next')
      }
      submitBehavior="submit"
      selection={OTP_FIELD_SELECTION}
      accessibilityHint={hasError ? 'Missing OTP Character' : undefined}
    />
  );
}
