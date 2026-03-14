import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import * as React from 'react';
import { Image, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlertAnchor } from '@/components/nativewindui/Alert';
import type { AlertMethods } from '@/components/nativewindui/Alert/types';
import { Button } from '@/components/nativewindui/Button';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/nativewindui/Text';
import { useAuth } from '@/lib/hooks/useAuth';

const GOOGLE_SOURCE = {
  uri: 'https://www.pngall.com/wp-content/uploads/13/Google-Logo.png',
};

export default function AuthIndexScreen() {
  const alertRef = React.useRef<AlertMethods>(null);
  const [loading, setLoading] = React.useState<'google' | 'apple' | false>(false);
  const { signInWithGoogle, signInWithApple } = useAuth(); // Use the new hook

  const handleGoogleSignIn = React.useCallback(async () => {
    setLoading('google');
    const result = await signInWithGoogle();
    if (!result.success) {
      // Don't show an error if the user cancelled, which can happen in SSO flows
      if (!result.cancelled) {
        alertRef.current?.alert({
          title: 'Authentication Error',
          message: result.error || 'An error occurred during Google sign-in.',
          buttons: [{ text: 'OK' }],
        });
      }
    }
    // On success, the root layout will handle the navigation change.
    setLoading(false);
  }, [signInWithGoogle]);

  const handleAppleSignIn = React.useCallback(async () => {
    setLoading('apple');
    const result = await signInWithApple();
    if (!result.success) {
      // Don't show an error if the user cancelled
      if (!result.cancelled) {
        alertRef.current?.alert({
          title: 'Authentication Error',
          message: result.error || 'An error occurred during Apple sign-in.',
          buttons: [{ text: 'OK' }],
        });
      }
    }
    // On success, the root layout will handle the navigation change.
    setLoading(false);
  }, [signInWithApple]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 justify-center px-8 py-6">
          {/* Headline + logo + subcopy */}
          <View className="items-center pb-4">
            <Text className="text-center text-3xl font-bold tracking-tight">Welcome to</Text>
            <Logo className="mt-2" size={26} />
            <Text variant="title1" className="text-primary text-center font-semibold">
              DoseCalculator
            </Text>
            <Text className="text-center text-sm text-muted-foreground pt-4">
              Create an account to get started.
            </Text>
          </View>

          {/* Primary CTA — Continue with Email */}
          <Link href="/auth/(create-account)" asChild>
            <Button size={Platform.select({ ios: 'lg', default: 'md' })} onPressOut={lightHaptic}>
              <Text className="font-bold">Continue with Email</Text>
            </Button>
          </Link>

          {/* Divider */}
          <View className="flex-row items-center py-6">
            <View className="flex-1 border-t border-border" />
            <Text className="px-3 text-sm text-muted-foreground">OR</Text>
            <View className="flex-1 border-t border-border" />
          </View>

          {/* Social Sign-On */}
          <View className="gap-3">
            {/* Google visible on all platforms */}
            <Button
              variant="secondary"
              className="ios:border-foreground/60"
              size={Platform.select({ ios: 'lg', default: 'md' })}
              onPress={handleGoogleSignIn}
              disabled={loading !== false}>
              <Image
                source={GOOGLE_SOURCE}
                className="absolute left-4 h-5 w-5"
                resizeMode="contain"
              />
              <Text>{loading === 'google' ? 'Loading...' : 'Continue with Google'}</Text>
            </Button>

            {/* Apple only on iOS */}
            {Platform.OS === 'ios' && (
              <Button
                variant="secondary"
                className="ios:border-foreground/60"
                size={Platform.select({ ios: 'lg', default: 'md' })}
                onPress={handleAppleSignIn}
                disabled={loading !== false}>
                <Text className="absolute left-4 text-[22px]"></Text>
                <Text>{loading === 'apple' ? 'Loading...' : 'Continue with Apple'}</Text>
              </Button>
            )}
          </View>

          {/* Existing user link */}
          <View className="items-center pt-6">
            <Text className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/(login)" asChild>
                <Text className="text-primary font-medium">Log In</Text>
              </Link>
            </Text>
          </View>

          {/* Divider */}
          <View className="flex-row items-center py-6">
            <View className="flex-1 border-t border-border" />
            <Text className="px-3 text-sm text-muted-foreground">OR</Text>
            <View className="flex-1 border-t border-border" />
          </View>

          {/* Guest Link */}
          <View className="items-center">
            <Link href="/(tabs)/converter" asChild>
              <Text className="text-primary font-medium">Continue as guest</Text>
            </Link>
          </View>

          {/* Terms / Privacy box */}
          <View className="items-center pt-8">
            <Text className="text-center text-xs text-muted-foreground px-4">
              By continuing, you agree to our{' '}
              <Link href={'/legal/terms-of-service' as any} asChild>
                <Text className="underline text-xs">Terms of Service,</Text>
              </Link>{' '}
              <Link href={'/legal/eula' as any} asChild>
                <Text className="underline text-xs">EULA</Text>
              </Link>{' '}
              and{' '}
              <Link href={'/legal/privacy-policy' as any} asChild>
                <Text className="underline text-xs">Privacy Policy</Text>
              </Link>
              .
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <AlertAnchor ref={alertRef} />
    </>
  );
}

function lightHaptic() {
  return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}