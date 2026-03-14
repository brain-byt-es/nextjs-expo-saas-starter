import { BlurView } from 'expo-blur';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { Platform, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, ButtonProps } from '@/components/nativewindui/Button';
import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';

cssInterop(BlurView, { className: 'style' });

type ToolbarProps = Omit<ViewProps, 'children' | 'style'> & {
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  iosHint?: string;
  iosBlurIntensity?: number;
};

function Toolbar({
  leftView,
  rightView,
  iosHint,
  className,
  iosBlurIntensity = 60,
  ...props
}: ToolbarProps) {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={Platform.select({ ios: iosBlurIntensity, default: 0 })}
      style={{
        paddingBottom: insets.bottom + 8,
      }}
      className={cn(
        'ios:bg-transparent ios:border-t-0 border-border/25 bg-card flex-row items-center justify-between border-t px-4 pt-2.5 dark:border-t-0',
        className
      )}
      {...props}>
      {Platform.OS === 'ios' && !iosHint ? (
        <>
          {leftView}
          {rightView}
        </>
      ) : (
        <>
          <View className="flex-1 flex-row gap-2">{leftView}</View>
          {Platform.OS === 'ios' && !!iosHint && (
            <Text variant="caption2" className="font-medium">
              {iosHint}
            </Text>
          )}
          <View className="flex-1 flex-row justify-end">{rightView}</View>
        </>
      )}
    </BlurView>
  );
}

type IconProps = React.ComponentProps<typeof Icon>;

function ToolbarIcon({
  icon,
  className,
  androidRootClassName,
  ...props
}: ButtonProps & { icon: IconProps }) {
  return (
    <Button
      size="icon"
      variant="plain"
      className={cn('h-11 w-11 rounded-lg', className)}
      androidRootClassName={cn('rounded-lg', androidRootClassName)}
      {...props}>
      <Icon className="ios:text-primary android:size-6 text-foreground" {...icon} />
    </Button>
  );
}

function ToolbarCTA({
  icon,
  className,
  androidRootClassName,
  ...props
}: ButtonProps & { icon: IconProps }) {
  return (
    <Button
      size="icon"
      variant={Platform.select({ ios: 'plain', default: 'tonal' })}
      className={cn('h-11 w-11 rounded-lg', className)}
      androidRootClassName={cn('rounded-lg', androidRootClassName)}
      {...props}>
      <Icon className="ios:text-primary android:size-6 text-foreground" {...icon} />
    </Button>
  );
}

export { Toolbar, ToolbarCTA, ToolbarIcon };
