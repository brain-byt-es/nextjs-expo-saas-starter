// components/layout/PersonalizationScreen.tsx
import { ChevronLeft } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { Button } from '../nativewindui/Button';
import { Text } from '../nativewindui/Text';

type PersonalizationScreenProps = {
  title: string;
  description: string;
  imageSource?: any;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
  primaryButtonVariant?: 'primary' | 'secondary'; // Add this line
  secondaryButtonText?: string;
  onSecondaryButtonPress?: () => void;
  progressDots?: number;
  currentStep?: number;
  isPrimaryButtonDisabled?: boolean;
  hideBackButton?: boolean;
  children?: ReactNode;
};

export function PersonalizationScreen({
  title,
  description,
  imageSource,
  primaryButtonText,
  onPrimaryButtonPress,
  primaryButtonVariant, // Add this line
  secondaryButtonText,
  onSecondaryButtonPress,
  progressDots,
  currentStep,
  isPrimaryButtonDisabled = false,
  hideBackButton = false,
  children,
}: PersonalizationScreenProps) {
  return (
    <View className="p-safe flex-1 bg-background">
      <View className="mx-auto max-w-sm flex-1 justify-between p-6">
        {!hideBackButton && (
          <TouchableOpacity 
            onPress={() => {
              // Use navigation.goBack() if available, otherwise fallback to window.history.back()
              if (typeof window !== 'undefined' && window.history) {
                window.history.back();
              }
            }}
            className="absolute left-6 top-6 z-10 h-10 w-10 items-center justify-center rounded-full bg-background/80"
            style={{
              
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <ChevronLeft size={24} className="text-foreground" />
          </TouchableOpacity>
        )}
        {/* Progress Dots - Top Section (Only shown if progressDots and currentStep are provided) */}
        {progressDots !== undefined && currentStep !== undefined && (
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
        )}

        {/* Content Section */}
        <View className="flex-1 justify-center">
          <View className="items-center">
            {imageSource && (
              <View className="mb-8">
                <Image
                  source={imageSource}
                  className="w-48 h-48"
                  resizeMode="contain"
                />
              </View>
            )}
            <View className="gap-4 w-full">
              <Text 
                variant="title1" 
                className="text-3xl font-bold text-center"
              >
                {title}
              </Text>
              <Text className="text-base text-foreground/80 text-center">
                {description}
              </Text>
            </View>
            <View className="w-full mt-6">
              {children}
            </View>
          </View>
        </View>

        {/* Button Section */}
        <View className="pb-2 space-y-3">
          <Button
            size={Platform.select({ ios: 'lg', default: 'md' })}
            variant={primaryButtonVariant || 'primary'} // Add this line
            onPress={onPrimaryButtonPress}
            disabled={isPrimaryButtonDisabled}
          >
            <Text>{primaryButtonText}</Text>
          </Button>
          
          {secondaryButtonText && onSecondaryButtonPress && (
            <Button
              variant="secondary"
              size={Platform.select({ ios: 'lg', default: 'md' })}
              onPress={onSecondaryButtonPress}
            >
              <Text>{secondaryButtonText}</Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}
