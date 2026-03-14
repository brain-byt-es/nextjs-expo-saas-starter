import * as WebBrowser from 'expo-web-browser';
import * as StoreReview from 'expo-store-review';
import '@/global.css';
import 'react-native-reanimated';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack, router, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PortalHost } from '@rn-primitives/portal';
import { NAV_THEME } from '@/theme';
import { useColorScheme } from '@/lib/useColorScheme';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ThemeToggle } from '@/components/nativewindui/ThemeToggle';
import { useEffect } from 'react';
import { ActivityIndicator } from '@/components/nativewindui/ActivityIndicator';
import { SupabaseProvider } from '@/lib/SupabaseProvider';
//import { AdBanner } from '@/components/AdBanner';
import * as Sentry from '@sentry/react-native';

WebBrowser.maybeCompleteAuthSession();

Sentry.init({
  dsn: 'https://5dd57a6a92acbde2acd2c28cee4f8db6@o4510461893476352.ingest.de.sentry.io/4510461899046992',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key || !isLoaded) return;

    if (!isSignedIn) {
      router.replace('/welcome');
    } else {
      router.replace('/(tabs)/converter');
    }
  }, [isSignedIn, isLoaded, rootNavigationState?.key]);

  useEffect(() => {
    async function showRequestReview() {
      try {
        if (await StoreReview.hasAction()) {
          await StoreReview.requestReview();
        }
      } catch (error) {
        console.log(
          'FOR ANDROID: Make sure you meet all conditions to be able to test and use it: https://developer.android.com/guide/playcore/in-app-review/test#troubleshooting',
          error
        );
      }
    }

    const timeout = setTimeout(() => {
      showRequestReview();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="legal" options={{ presentation: 'transparentModal', headerShown: false, animation: 'none', contentStyle: { backgroundColor: 'transparent' } }} />
      <Stack.Screen name="modal" options={MODAL_OPTIONS} />
    </Stack>
  );
}

export default Sentry.wrap(function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Missing Clerk Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file');
  }

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <SupabaseProvider>
          <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ActionSheetProvider>
                <NavThemeProvider value={NAV_THEME[colorScheme]}>
                  <RootLayoutNav />
                  <PortalHost />
                </NavThemeProvider>
              </ActionSheetProvider>
            </GestureHandlerRootView>
          </KeyboardProvider>
        </SupabaseProvider>
      </ClerkProvider>
    </>
  );
});

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;