
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const UNIT_PREFERENCE_KEY = 'unit_preference';

export default function UnitOfMeasurement() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const loadPreference = async () => {
      try {
        const storedUnit = await AsyncStorage.getItem(UNIT_PREFERENCE_KEY);
        if (storedUnit !== null) {
          setIsEnabled(storedUnit === 'units');
        }
      } catch (error) {
        console.error('Failed to load unit preference', error);
      }
    };
    loadPreference();
  }, []);

  const toggleSwitch = async () => {
    const newUnit = !isEnabled ? 'units' : 'ml';
    setIsEnabled((previousState) => !previousState);
    try {
      await AsyncStorage.setItem(UNIT_PREFERENCE_KEY, newUnit);
    } catch (error) {
      console.error('Failed to save unit preference', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Unit Of Measurement' }} />
      <View style={styles.container}>
        <Text style={styles.label}>Use &quot;units&quot; instead of &quot;ml&quot;</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});

