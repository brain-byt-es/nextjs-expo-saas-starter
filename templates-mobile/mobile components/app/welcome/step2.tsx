import { OnboardingScreen } from '@/components/layout/OnboardingScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function WelcomeStep2Screen() {
  const router = useRouter();

  return (
    <OnboardingScreen
      imageSource={require('@/assets/welcome-step2.png')}
      title="No more scattered references."
      description={
        'Most tools are not built for injectors. Information lives in PDFs, screenshots, or spreadsheets — \nand none stay organized in one place.'
      }
      buttonText="Continue"
      onButtonPress={() => router.push('/welcome/step3')}
      progressDots={3}
      currentStep={1}
    />
  );
}
