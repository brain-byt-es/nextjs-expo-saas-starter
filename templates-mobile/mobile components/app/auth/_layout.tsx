import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(tabs)/converter" />;
  }

  return (
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(login)" options={LOGIN_MODAL_OPTIONS} />
      <Stack.Screen name="(create-account)" options={CREATE_ACCOUNT_MODAL_OPTIONS} />
    </Stack>
  );
}

const SCREEN_OPTIONS = {
  headerShown: false,
} as const;

const LOGIN_MODAL_OPTIONS = {
  presentation: 'modal',
  headerShown: false,
} as const;

const CREATE_ACCOUNT_MODAL_OPTIONS = {
  presentation: 'modal',
  headerShown: false,
} as const;
