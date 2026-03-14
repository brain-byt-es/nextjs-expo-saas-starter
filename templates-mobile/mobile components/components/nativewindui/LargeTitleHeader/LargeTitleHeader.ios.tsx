import { Stack } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { isLiquidGlassSupported } from './is-liquid-glass-supported';
import type {
  LargeTitleHeaderProps,
  NativeStackNavigationOptions,
  NativeStackNavigationSearchBarOptions,
} from './types';

import { useColorScheme } from '@/lib/useColorScheme';

export function LargeTitleHeader(props: LargeTitleHeaderProps) {
  const { isDarkColorScheme, colors } = useColorScheme();
  const [searchValue, setSearchValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <>
      <Stack.Screen
        options={propsToScreenOptions(
          props,
          isDarkColorScheme ? colors.background : colors.card,
          setIsFocused,
          setSearchValue
        )}
      />
      {props.searchBar?.content && (isFocused || searchValue.length > 0) && (
        <Animated.View
          entering={FadeIn.duration(500)}
          style={StyleSheet.absoluteFill}
          className="z-[99999]">
          <View style={StyleSheet.absoluteFill}>{props.searchBar?.content}</View>
        </Animated.View>
      )}
    </>
  );
}

function propsToScreenOptions(
  props: LargeTitleHeaderProps,
  backgroundColor: string,
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
): NativeStackNavigationOptions {
  return {
    headerLargeTitle: true,
    headerBackButtonMenuEnabled: props.iosBackButtonMenuEnabled,
    headerBackTitle: props.iosBackButtonTitle,
    headerBackVisible: props.backVisible,
    headerLargeTitleShadowVisible: props.shadowVisible,
    headerBlurEffect: isLiquidGlassSupported
      ? undefined
      : props.iosBlurEffect === 'none'
        ? undefined
        : (props.iosBlurEffect ?? 'systemMaterial'),
    headerShadowVisible: props.shadowVisible,
    headerLeft: props.leftView,
    headerRight: props.rightView,
    headerShown: props.shown,
    headerTitle: props.title,
    headerTransparent: isLiquidGlassSupported || props.iosBlurEffect !== 'none',
    headerLargeStyle: isLiquidGlassSupported
      ? undefined
      : { backgroundColor: props.backgroundColor ?? backgroundColor },
    headerStyle:
      props.iosBlurEffect === 'none'
        ? { backgroundColor: props.backgroundColor ?? backgroundColor }
        : undefined,
    headerSearchBarOptions: props.searchBar
      ? {
          autoCapitalize: props.searchBar?.autoCapitalize,
          cancelButtonText: props.searchBar?.iosCancelButtonText,
          hideWhenScrolling: props.searchBar?.iosHideWhenScrolling ?? false,
          inputType: props.searchBar?.inputType,
          tintColor: props.searchBar?.iosTintColor,
          onBlur: () => {
            setIsFocused(false);
            props.searchBar?.onBlur?.();
          },
          onCancelButtonPress: props.searchBar?.onCancelButtonPress,
          onChangeText: (event) => {
            const text = event.nativeEvent.text;
            setSearchValue(text);
            if (props.searchBar?.onChangeText) {
              props.searchBar?.onChangeText(event.nativeEvent.text);
            }
          },
          onFocus: () => {
            setIsFocused(true);
            props.searchBar?.onFocus?.();
          },
          onSearchButtonPress: props.searchBar?.onSearchButtonPress,
          placeholder: props.searchBar?.placeholder ?? 'Search...',
          ref: props.searchBar?.ref as NativeStackNavigationSearchBarOptions['ref'],
          textColor: props.searchBar?.textColor,
        }
      : undefined,
    ...props.screen,
  };
}
