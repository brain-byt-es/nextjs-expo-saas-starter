import { Link } from 'expo-router';
import { Platform, View } from 'react-native';

import { Button, buttonTextVariants } from '@/components/nativewindui/Button';
import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';
import { Logo } from '@/components/Logo';
import { useColorScheme } from '@/lib/useColorScheme';

const SF_SYMBOL_PROPS = { type: 'hierarchical' } as const;

export default function WelcomeConsentScreen() {
  const { colors } = useColorScheme();

  return (
    <View className="p-safe flex-1 bg-background">
      <View className="mx-auto max-w-sm flex-1 justify-around gap-4 p-6">
        <View className="items-center pt-12">
          <Logo className="mt-2" size={28} />
          <Text variant="title1" className="text-primary text-center font-semibold">
            DoseCalculator
          </Text>
        </View>
        <View className="gap-6">
          {FEATURES.map((feature) => (
            <View key={feature.title} className="flex-row items-center gap-4">
              <View className="pt-px">
                <Icon name={feature.icon as any} size={38} color={colors.primary} sfSymbol={SF_SYMBOL_PROPS} />
              </View>
              <View className="flex-1">
                <Text variant="callout" className="font-semibold">
                  {feature.title}
                </Text>
                <Text variant="subhead" className="text-foreground dark:text-foreground/70 leading-5">
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View className="gap-3">
          <Text variant="caption2" className="text-center text-muted-foreground dark:text-foreground/60">
            This tool performs mathematical unit and dilution conversions using user-defined factors. It does not replace clinical judgment, product labels, or official guidelines. For licensed medical professionals only.
          </Text>
          <Link href="/welcome/step1" asChild>
            <Button size={Platform.select({ ios: 'lg', default: 'md' })}>
              <Text>Continue</Text>
            </Button>
          </Link>
          <Link href="/auth" asChild>
            <Button
              variant="secondary"
              size={Platform.select({ ios: 'lg', default: 'md' })}>
              <Text className={buttonTextVariants({ variant: 'secondary' })}>Login / Sign Up</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}

const FEATURES: {
  title: string;
  description: string;
  icon: typeof Icon['name'];
}[] = [
    {
      title: 'Accurate Dilution Calculations',
      description: 'Easily calculate dilutions for various injectables with precision.',
      icon: 'plus.slash.minus',
    },
    {
      title: 'Unit Conversion',
      description: 'Seamlessly convert between different units of measurement.',
      icon: 'arrow.left.arrow.right.circle.fill',
    },
    {
      title: 'Clinical Precision',
      description: 'Designed for medical professionals to ensure accuracy in practice.',
      icon: 'cross.case.fill',
    },
  ];
