import { OnboardingScreen } from '@/components/layout/OnboardingScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function WelcomeStep1Screen() {
  const router = useRouter();

  return (
    <OnboardingScreen
      imageSource={require('@/assets/welcome-step1.png')}
      title="Managing toxin doses should not feel chaotic."
      description={
        'Every brand uses different units and dilution options. Keeping track across charts, notes, and apps can slow down your workflow.'
      }
      buttonText="Next"
      onButtonPress={() => router.push('/welcome/step2')}
      progressDots={3}
      currentStep={0}
    />
  );
}
