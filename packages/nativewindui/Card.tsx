import * as Slot from '@rn-primitives/slot';
import { BlurView, BlurViewProps } from 'expo-blur';
import { Image, ImageProps } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewProps, type ViewStyle } from 'react-native';

import { Text, TextClassContext } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';

cssInterop(BlurView, {
  className: 'style',
});
cssInterop(LinearGradient, {
  className: 'style',
});

function Card({
  className,
  rootClassName,
  rootStyle,
  ...props
}: ViewProps & { rootClassName?: string; rootStyle?: StyleProp<ViewStyle> }) {
  return (
    <View
      className={cn(
        'bg-card rounded-xl shadow-2xl',
        Platform.OS === 'ios' && 'rounded-2xl shadow-xl  shadow-black/15',
        rootClassName
      )}
      style={rootStyle}>
      <View
        className={cn('ios:rounded-2xl justify-end overflow-hidden rounded-xl', className)}
        {...props}
      />
    </View>
  );
}

function CardBadge({ className, ...props }: ViewProps) {
  return (
    <TextClassContext.Provider value="text-xs font-medium tracking-widest ios:uppercase">
      <View
        className={cn(
          'android:right-2 android:top-2.5 android:rounded-full android:border android:border-border ios:left-0 ios:rounded-br-2xl bg-card absolute top-0 z-50 px-3 py-1 pl-2',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardContent({
  className,
  linearGradientColors,
  iosBlurIntensity = 3,
  iosBlurClassName,
  ...props
}: ViewProps & {
  linearGradientColors?: readonly [string, string, ...string[]];
  iosBlurIntensity?: number;
  iosBlurClassName?: string;
}) {
  if (linearGradientColors) {
    return (
      <LinearGradient colors={linearGradientColors ?? []} className="pt-4">
        {Platform.OS === 'ios' && (
          <BlurView
            intensity={iosBlurIntensity}
            className={cn('absolute bottom-0 left-0 right-0 top-1/2', iosBlurClassName)}
          />
        )}
        <View className={cn('ios:px-5 space-y-1.5 px-4 pb-4', className)} {...props} />
      </LinearGradient>
    );
  }
  return (
    <>
      {Platform.OS === 'ios' && (
        <BlurView intensity={iosBlurIntensity} className={iosBlurClassName} />
      )}
      <View className={cn('ios:px-5 space-y-1.5 px-4 py-4', className)} {...props} />
    </>
  );
}

function CardImage({
  transition = 200,
  style = StyleSheet.absoluteFill,
  contentPosition = Platform.select({ ios: 'center', default: 'top' }),
  contentFit = 'cover',
  materialRootClassName,
  ...props
}: Omit<ImageProps, 'className'> & { materialRootClassName?: string }) {
  const Root = Platform.OS === 'ios' ? Slot.Image : View;
  return (
    <Root
      className={Platform.select({
        ios: undefined,
        default: cn('relative flex-1 overflow-hidden rounded-2xl', materialRootClassName),
      })}>
      <Image
        transition={transition}
        style={style}
        contentPosition={contentPosition}
        contentFit={contentFit}
        {...props}
      />
    </Root>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn(
        'ios:font-bold text-card-foreground text-3xl font-medium leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
}

function CardSubtitle({
  className,
  variant = Platform.select({ ios: 'footnote' }),
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      variant={variant}
      className={cn('ios:font-semibold ios:uppercase font-medium opacity-70', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground leading-5', className)} {...props} />;
}

function CardFooter({ className, ...props }: BlurViewProps) {
  return (
    <BlurView
      intensity={Platform.select({ ios: 15, default: 0 })}
      className={cn('ios:px-5 ios:pt-3 flex-row items-center gap-4 px-4 pb-4 pt-0', className)}
      {...props}
    />
  );
}

function addOpacityToRgb(rgb: string, opacity: number): string {
  // Validate the RGB input
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const match = rgb.match(rgbRegex);

  if (!match) {
    throw new Error('Invalid RGB color format. Expected format: rgb(255, 255, 255)');
  }

  // Extract the RGB values
  const [r, g, b] = match.slice(1, 4).map(Number);

  // Validate the RGB values
  if ([r, g, b].some((value) => value < 0 || value > 255)) {
    throw new Error('RGB values must be between 0 and 255.');
  }

  // Validate the opacity value
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be a value between 0 and 1.');
  }

  // Convert the RGB values to an RGBA string with the specified opacity
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export {
  addOpacityToRgb,
  Card,
  CardBadge,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardSubtitle,
  CardTitle,
};
