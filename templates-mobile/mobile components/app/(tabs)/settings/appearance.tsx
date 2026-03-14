import { Stack } from 'expo-router';
import * as React from 'react';
import { Platform, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Form, FormItem, FormSection } from '@/components/nativewindui/Form';
import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';
import { useColorScheme } from '@/lib/useColorScheme';

export default function AppearanceScreen() {
  const insets = useSafeAreaInsets();
  const { themePreference, setColorScheme } = useColorScheme();

  const themes = [
    { name: 'System', value: 'system' as const },
    { name: 'Light', value: 'light' as const },
    { name: 'Dark', value: 'dark' as const },
  ];



  return (
    <>
      <Stack.Screen
        options={{
          title: 'Appearance',
          headerTransparent: Platform.OS === 'ios',
          headerBlurEffect: 'systemMaterial',
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <Form className="gap-5 px-4 pt-8">
          <FormSection
            materialIconProps={{ name: 'theme-light-dark' }}
            footnote="Choose how you want the app to look. 'System' will match your device's settings.">
            {themes.map((theme, index) => (
              <FormItem key={theme.value} className={cn(index !== themes.length - 1 && 'border-b border-border/20')}>
                <Pressable
                  onPress={() => setColorScheme(theme.value)}
                  className="flex-row items-center justify-between p-3 active:opacity-70">
                  <Text className="text-lg">{theme.name}</Text>
                  {themePreference === theme.value && (
                    <Icon name="checkmark" className="text-primary" />
                  )}
                </Pressable>
              </FormItem>
            ))}
          </FormSection>
        </Form>
      </ScrollView>
    </>
  );
}
