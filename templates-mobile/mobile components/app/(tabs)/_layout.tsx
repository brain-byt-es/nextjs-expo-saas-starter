import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Stack, Tabs } from 'expo-router';
import * as React from 'react';
import { Platform, Pressable, PressableProps, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Badge } from '@/components/nativewindui/Badge';
import { Icon } from '@/components/nativewindui/Icon';
import type { IconProps } from '@/components/nativewindui/Icon/types';
import { Text } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';
import { useColorScheme } from '@/lib/useColorScheme';


export default function TabLayout() {
  const { colors } = useColorScheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Tabs' }} />
      <Tabs
        tabBar={TAB_BAR}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
        }}>
        <Tabs.Screen
          name="converter"
          options={{
            title: 'Converter',
            tabBarIcon(props) {
              return <Icon name={props.focused ? 'arrow.2.circlepath' as any : 'arrow.2.circlepath' as any} {...props} size={27} />;
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon(props) {
              return <Icon name={props.focused ? 'gearshape.fill' : 'gearshape'} {...props} size={27} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}

const TAB_BAR = Platform.select({
  ios: undefined,
  android: (props: BottomTabBarProps) => <MaterialTabBar {...props} />,
});

const TAB_ICON = {
  converter: 'sync',
  settings: 'cog',
} as const;

function MaterialTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useColorScheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className="border-t-border/25 bg-card flex-row border-t pb-4 pt-3 dark:border-t-0">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <MaterialTabItem
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            name={TAB_ICON[route.name as keyof typeof TAB_ICON]}
            isFocused={isFocused}
            badge={options.tabBarBadge}
            label={
              typeof label === 'function'
                ? label({
                  focused: isFocused,
                  color: isFocused ? colors.foreground : colors.grey2,
                  children: options.title ?? route.name ?? '',
                  position: options.tabBarLabelPosition ?? 'below-icon',
                })
                : label
            }
          />
        );
      })}
    </View>
  );
}

function MaterialTabItem({
  isFocused,
  name = 'star',
  badge,
  className,
  label,
  ...pressableProps
}: {
  isFocused: boolean;
  name: NonNullable<IconProps['materialCommunityIcon']>['name'];
  label: string | React.ReactNode;
  badge?: number | string;
} & Omit<PressableProps, 'children'>) {
  const { colors } = useColorScheme();
  const isFocusedDerived = useDerivedValue(() => isFocused);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      transform: [{ scaleX: withTiming(isFocusedDerived.value ? 1 : 0, { duration: 200 }) }],
      opacity: withTiming(isFocusedDerived.value ? 1 : 0, { duration: 200 }),
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      borderRadius: 100,
    };
  });
  return (
    <Pressable className={cn('flex-1 items-center', className)} {...pressableProps}>
      <View className="h-8 w-16 items-center justify-center overflow-hidden rounded-full ">
        <Animated.View style={animatedStyle} className="bg-secondary dark:bg-secondary" />
        <View>
          <Icon
            materialCommunityIcon={{ name }}
            name="questionmark"
            color={isFocused ? colors.foreground : colors.grey2}
          />
          {!!badge && <Badge>{badge}</Badge>}
        </View>
      </View>
      <Text variant="caption2" className={cn('pt-1', !isFocused && 'text-muted-foreground')}>
        {label}
      </Text>
    </Pressable>
  );
}
