import {
  useAuth as useClerkAuth,
  useSignIn,
  useSignInWithApple,
  useSignUp,
  useSSO,
} from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { useCallback } from 'react';
import type { SignInResource, SignUpResource } from '@clerk/types';

export function useAuth() {
  const { isLoaded, userId, signOut } = useClerkAuth();
  const { signIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();

  // For Google SSO
  const { startSSOFlow: startGoogleSSOFlow } = useSSO();

  // For Apple SSO
  const { startAppleAuthenticationFlow } = useSignInWithApple();

  // Create a redirect URL for native SSO
  const redirectUrl = AuthSession.makeRedirectUri({ scheme: 'injexpro-dosage-app' });

  const signInWithGoogle = useCallback(async () => {
    try {
      const {
        createdSessionId,
        signIn: signInData,
        signUp: signUpData,
      } = await startGoogleSSOFlow({
        strategy: 'oauth_google',
        redirectUrl,
      });

      if (createdSessionId) {
        setActiveSignIn?.({ session: createdSessionId });
        return { success: true };
      }

      // Handle cases like MFA or email verification
      if (
        signInData?.status === 'needs_first_factor' ||
        signUpData?.status === 'missing_requirements'
      ) {
        return {
          success: true,
          needsMfa: true,
          signIn: signInData as SignInResource | undefined,
          signUp: signUpData as SignUpResource | undefined,
        };
      }

      return { success: false, error: 'No session created and no next step required.' };
    } catch (err: any) {
      if (err.code === 'ERR_REQUEST_CANCELED') {
        return { success: false, cancelled: true };
      }
      console.error('Google SSO error:', JSON.stringify(err, null, 2));
      return {
        success: false,
        error: err.errors?.[0]?.message || 'An error occurred during Google sign-in.',
      };
    }
  }, [redirectUrl, setActiveSignIn, startGoogleSSOFlow]);

  const signInWithApple = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startAppleAuthenticationFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        return { success: true };
      }

      return { success: false, error: 'No session created' };
    } catch (err: any) {
      if (err.code === 'ERR_REQUEST_CANCELED') {
        return { success: false, cancelled: true };
      }
      console.error('Apple Sign-In error:', JSON.stringify(err, null, 2));
      return {
        success: false,
        error: err.errors?.[0]?.message || 'An error occurred during Apple Sign-In',
      };
    }
  }, [startAppleAuthenticationFlow]);

  const signInWithEmailPassword = useCallback(
    async (email: string, password: string) => {
      if (!isLoaded || !signIn) return { success: false, error: 'Clerk not loaded' };

      try {
        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === 'complete') {
          await setActiveSignIn?.({ session: result.createdSessionId });
          return { success: true };
        }

        if (result.status === 'needs_first_factor') {
          return { success: true, needsMfa: true, signIn: result };
        }

        return { success: false, error: 'Sign in incomplete' };
      } catch (err: any) {
        console.error('Email/Password sign in error:', err);
        return { success: false, error: err.errors?.[0]?.message || err.message };
      }
    },
    [isLoaded, signIn, setActiveSignIn]
  );

  const signUpWithEmailPassword = useCallback(
    async (email: string, password: string, firstName?: string, lastName?: string) => {
      if (!isLoaded || !signUp) return { success: false, error: 'Clerk not loaded' };

      try {
        const result = await signUp.create({
          emailAddress: email,
          password,
          firstName,
          lastName,
        });

        await result.prepareEmailAddressVerification({ strategy: 'email_code' });

        return {
          success: true,
          needsVerification: true,
          signUp: result,
        };
      } catch (err: any) {
        console.error('Sign up error:', err);
        return { success: false, error: err.errors?.[0]?.message || err.message };
      }
    },
    [isLoaded, signUp]
  );

  const verifyEmail = useCallback(
    async (code: string) => {
      if (!isLoaded || !signUp) return { success: false, error: 'Clerk not loaded' };

      try {
        const result = await signUp.attemptEmailAddressVerification({ code });

        if (result.status === 'complete') {
          await setActiveSignUp?.({ session: result.createdSessionId });
          return { success: true };
        }

        return { success: false, error: 'Verification incomplete' };
      } catch (err: any) {
        console.error('Email verification error:', err);
        return { success: false, error: err.errors?.[0]?.message || err.message };
      }
    },
    [isLoaded, signUp, setActiveSignUp]
  );

  const resetPassword = useCallback(
    async (email: string) => {
      if (!isLoaded || !signIn) return { success: false, error: 'Clerk not loaded' };

      try {
        const result = await signIn.create({
          strategy: 'reset_password_email_code',
          identifier: email,
        });

        return { success: true, signIn: result };
      } catch (err: any) {
        console.error('Password reset error:', err);
        return { success: false, error: err.errors?.[0]?.message || err.message };
      }
    },
    [isLoaded, signIn]
  );

  const attemptPasswordReset = useCallback(
    async (code: string, password: string) => {
      if (!isLoaded || !signIn) return { success: false, error: 'Clerk not loaded' };

      try {
        const result = await signIn.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code,
          password,
        });

        if (result.status === 'complete') {
          await setActiveSignIn?.({ session: result.createdSessionId });
          return { success: true };
        } else {
          console.error('Password reset failed:', result);
          return { success: false, error: 'Password reset failed.' };
        }
      } catch (err: any) {
        console.error('Password reset error:', err);
        return { success: false, error: err.errors?.[0]?.message || 'An unknown error occurred.' };
      }
    },
    [isLoaded, signIn, setActiveSignIn]
  );

  return {
    isLoaded,
    userId,
    signOut,
    signInWithGoogle,
    signInWithApple,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    verifyEmail,
    resetPassword,
    attemptPasswordReset,
  };
}