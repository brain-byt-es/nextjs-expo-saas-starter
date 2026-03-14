// components/layout/OnboardingScreen.tsx
import React, { ReactNode } from 'react';
import { Image, Platform, View } from 'react-native';
import { Button } from '../nativewindui/Button';
import { Text } from '../nativewindui/Text';

type OnboardingScreenProps = {
  title: string;
  description: string;
  imageSource?: any;
  buttonText: string;
  onButtonPress: () => void;
  progressDots: number;
  currentStep: number;
  children?: ReactNode;
};

export function OnboardingScreen({
  title,
  description,
  imageSource,
  buttonText,
  onButtonPress,
  progressDots,
  currentStep,
  children,
}: OnboardingScreenProps) {
  return (
    <View className="p-safe flex-1 bg-background">
      <View className="mx-auto max-w-sm flex-1 justify-between p-6">
        {/* Progress Dots - Top Section */}
        <View className="pt-4">
          <View className="flex-row justify-center gap-1.5">
            {Array.from({ length: progressDots }).map((_, index) => (
              <View
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  index === currentStep ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Content Section */}
        <View className="flex-1 justify-center">
          <View className="items-center">
            {imageSource && (
              <View className="mb-8">
                <Image
                  source={imageSource}
                  className="w-64 h-64 rounded-lg"
                  resizeMode="contain"
                />
              </View>
            )}
            <View className="gap-4">
              <Text 
                variant="title1" 
                className="text-3xl font-bold text-center"
              >
                {title}
              </Text>
              <Text className="text-base text-foreground/80 dark:text-foreground/70 text-center">
                {description}
              </Text>
            </View>
            {children}
          </View>
        </View>

        {/* Button Section */}
        <View className="pb-2">
          <Button
            size={Platform.select({ ios: 'lg', default: 'md' })}
            onPress={onButtonPress}
          >
            <Text>{buttonText}</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}