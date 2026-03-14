import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import * as React from 'react';

import { COLORS } from '@/theme/colors';

function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  const [isDarkColorScheme, setIsDarkColorScheme] = React.useState(colorScheme === 'dark');
  const [themePreference, setThemePreference] = React.useState<'light' | 'dark' | 'system'>(
    'system'
  );

  React.useEffect(() => {
    setIsDarkColorScheme(colorScheme === 'dark');
  }, [colorScheme]);

  React.useEffect(() => {
    // Load saved preference on mount
    AsyncStorage.getItem('theme').then((savedTheme) => {
      if (savedTheme) {
        setThemePreference(savedTheme as 'light' | 'dark' | 'system');
        setColorScheme(savedTheme as 'light' | 'dark' | 'system');
      }
    });
  }, []);

  function handleSetColorScheme(scheme: 'light' | 'dark' | 'system') {
    setThemePreference(scheme);
    setColorScheme(scheme);
    AsyncStorage.setItem('theme', scheme);
  }

  function handleToggleColorScheme() {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    handleSetColorScheme(newScheme);
  }

  return {
    colorScheme: colorScheme ?? 'light',
    isDarkColorScheme,
    setColorScheme: handleSetColorScheme,
    toggleColorScheme: handleToggleColorScheme,
    colors: COLORS[colorScheme ?? 'light'] ?? COLORS.light,
    themePreference,
  };
}

export { useColorScheme };
