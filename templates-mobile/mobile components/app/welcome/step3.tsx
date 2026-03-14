import { OnboardingScreen } from '@/components/layout/OnboardingScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function WelcomeStep3Screen() {
  const router = useRouter();

  return (
    <OnboardingScreen
      imageSource={require('@/assets/welcome-step3.png')}
      title="A clean, structured way to calculate your dosing."
      description={
        'InjexPro helps you quickly organize units, dilutions, and brand-specific conversions — \nall in one simple tool. Designed to support your workflow, not replace your clinical judgment.'
      }
      buttonText="Continue"
      // Use 'replace' to prevent the user from navigating back to the onboarding flow
      onButtonPress={() => router.replace('/auth')}
      progressDots={3}
      currentStep={2}
    />
  );
}
