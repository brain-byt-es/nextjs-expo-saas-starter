import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/nativewindui/Text';
import { Input } from '@/components/nativewindui/Input';
import { Picker, PickerItem } from '@/components/nativewindui/Picker';
import { Card } from '@/components/nativewindui/Card';
import { Icon } from '@/components/nativewindui/Icon';

// In a real app, this would come from user settings in a store
const BRAND_RATIOS: { [key: string]: { [key: string]: number } } = {
  'Botox': { 'Dysport': 2.5, 'Xeomin': 1 },
  'Dysport': { 'Botox': 1 / 2.5, 'Xeomin': 1 / 2.5 },
  'Xeomin': { 'Botox': 1, 'Dysport': 2.5 },
};

const BRANDS = Object.keys(BRAND_RATIOS);

const VIAL_UNITS_PRESETS = [50, 100, 200, 500];
const DILUTION_VOLUME_PRESETS = [2.5, 2.0, 1.25, 1.0, 0.63, 0.5];

const CUSTOM_UNITS = 'Custom';
const CUSTOM_VOLUME = 'Custom';

export default function ConverterScreen() {
  // Accordion State
  const [brandAccordionOpen, setBrandAccordionOpen] = useState(true);
  const [dilutionAccordionOpen, setDilutionAccordionOpen] = useState(false);

  // State for Brand Conversion
  const [fromBrand, setFromBrand] = useState('Botox');
  const [toBrand, setToBrand] = useState('Dysport');
  const [fromUnits, setFromUnits] = useState('10');
  const [brandResult, setBrandResult] = useState('0');

  // State for Dilution Calculator
  const [selectedUnits, setSelectedUnits] = useState<number | typeof CUSTOM_UNITS>(100);
  const [customUnits, setCustomUnits] = useState('');
  const [selectedVolume, setSelectedVolume] = useState<number | typeof CUSTOM_VOLUME>(2.5);
  const [customVolume, setCustomVolume] = useState('');

  const [dilutionResults, setDilutionResults] = useState({
    unitsPer01Ml: '4.0',
    unitsPer1Ml: '40.0',
    mlPer1Unit: '0.03',
  });

  useEffect(() => {
    const units = parseFloat(fromUnits);
    if (isNaN(units) || !fromBrand || !toBrand) {
      setBrandResult('0');
      return;
    }
    const ratio = BRAND_RATIOS[fromBrand]?.[toBrand];
    if (ratio === undefined) {
      setBrandResult('N/A');
      return;
    }
    setBrandResult((units * ratio).toFixed(2));
  }, [fromBrand, toBrand, fromUnits]);

  useEffect(() => {
    const totalUnits = selectedUnits === CUSTOM_UNITS ? parseFloat(customUnits) : selectedUnits;
    const totalVolume = selectedVolume === CUSTOM_VOLUME ? parseFloat(customVolume) : selectedVolume;

    if (isNaN(totalUnits) || isNaN(totalVolume) || totalVolume === 0) {
      setDilutionResults({
        unitsPer01Ml: '-',
        unitsPer1Ml: '-',
        mlPer1Unit: '-',
      });
      return;
    }

    const unitsPerMl = totalUnits / totalVolume;
    const unitsPer01Ml = unitsPerMl * 0.1;
    const mlPer1Unit = 1 / unitsPerMl;

    setDilutionResults({
      unitsPer1Ml: unitsPerMl.toFixed(1),
      unitsPer01Ml: unitsPer01Ml.toFixed(1),
      mlPer1Unit: mlPer1Unit.toFixed(3),
    });
  }, [selectedUnits, customUnits, selectedVolume, customVolume]);

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between bg-background p-4 pb-2 border-b border-border">
        <View className="w-12 h-12" />
        <Text className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-tighter flex-1 text-center">Converter</Text>
        <View className="w-12" />
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="flex-col gap-6">
          {/* Brand Conversion Accordion Card */}
          <Card>
            <TouchableOpacity onPress={() => setBrandAccordionOpen(!brandAccordionOpen)} className="flex-row items-center justify-between p-4 active:opacity-80" accessibilityRole="button">
              <Text className="text-card-foreground dark:text-card-foreground-dark text-base font-semibold">Brand Conversion</Text>
              <Icon name={brandAccordionOpen ? 'chevron.up' : 'chevron.down'} size={16} className="text-muted-foreground" />
            </TouchableOpacity>
            {brandAccordionOpen && (
              <View className="px-4 pb-4 gap-4">
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium pb-2">Source Brand</Text>
                    <Picker selectedValue={fromBrand} onValueChange={(itemValue) => setFromBrand(itemValue as string)}>
                      <PickerItem label="Select Brand" value="" />
                      {BRANDS.map(brand => <PickerItem key={brand} label={brand} value={brand} />)}
                    </Picker>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium pb-2">Target Brand</Text>
                    <Picker selectedValue={toBrand} onValueChange={(itemValue) => setToBrand(itemValue as string)}>
                      <PickerItem label="Select Brand" value="" />
                      {BRANDS.map(brand => <PickerItem key={brand} label={brand} value={brand} />)}
                    </Picker>
                  </View>
                </View>
                <View>
                  <Text className="text-sm font-medium pb-2">Units</Text>
                  <Input
                    inputMode="decimal"
                    placeholder="Enter number of units"
                    value={fromUnits}
                    onChangeText={setFromUnits}
                  />
                </View>
                <View className="mt-2 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <View className="flex-row justify-between items-center gap-x-6 py-1">
                    <Text className="text-muted-foreground text-sm">Converted Units</Text>
                    <Text className="text-primary text-lg font-bold">{brandResult}</Text>
                  </View>
                </View>
              </View>
            )}
          </Card>

          {/* Dilution Calculator Accordion Card */}
          <Card>
            <TouchableOpacity onPress={() => setDilutionAccordionOpen(!dilutionAccordionOpen)} className="flex-row items-center justify-between p-4 active:opacity-80" accessibilityRole="button">
              <Text className="text-card-foreground dark:text-card-foreground-dark text-base font-semibold">Dilution planner</Text>
              <Icon name={dilutionAccordionOpen ? 'chevron.up' : 'chevron.down'} size={16} className="text-muted-foreground" />
            </TouchableOpacity>
            {dilutionAccordionOpen && (
              <View className="px-4 pb-4 gap-4">
                <Text className="text-muted-foreground text-sm">Choose your vial and total diluent to see the resulting concentration. You’re always in control of the inputs.</Text>
                
                {/* Section 1: Vial Selection */}
                <View className="gap-3">
                  <Text className="font-medium">Which vial are you working with?</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {VIAL_UNITS_PRESETS.map(units => (
                      <PillButton key={units} label={`${units}U`} isSelected={selectedUnits === units} onPress={() => setSelectedUnits(units)} />
                    ))}
                    <PillButton label="Custom" isSelected={selectedUnits === CUSTOM_UNITS} onPress={() => setSelectedUnits(CUSTOM_UNITS)} />
                  </View>
                  {selectedUnits === CUSTOM_UNITS && (
                    <Input placeholder="Enter custom units" inputMode="decimal" value={customUnits} onChangeText={setCustomUnits} />
                  )}
                </View>

                {/* Section 2: Dilution Selection */}
                <View className="gap-3">
                  <Text className="font-medium">Diluted with how much solution?</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {DILUTION_VOLUME_PRESETS.map(volume => (
                      <PillButton key={volume} label={`${volume} mL`} isSelected={selectedVolume === volume} onPress={() => setSelectedVolume(volume)} />
                    ))}
                    <PillButton label="Custom" isSelected={selectedVolume === CUSTOM_VOLUME} onPress={() => setSelectedVolume(CUSTOM_VOLUME)} />
                  </View>
                  {selectedVolume === CUSTOM_VOLUME && (
                    <Input placeholder="Enter custom volume (mL)" inputMode="decimal" value={customVolume} onChangeText={setCustomVolume} />
                  )}
                </View>

                {/* Section 3: Result */}
                <View className="gap-3">
                  <Text className="font-medium">At this dilution</Text>
                  <View className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg flex-col gap-2">
                    <View className="flex-row justify-between items-baseline">
                      <Text className="text-lg text-foreground">0.1 mL</Text>
                      <Text className="text-lg text-primary font-bold">{dilutionResults.unitsPer01Ml} Units</Text>
                    </View>
                    <View className="flex-row justify-between items-baseline">
                      <Text className="text-base text-muted-foreground">1.0 mL</Text>
                      <Text className="text-base text-primary font-semibold">{dilutionResults.unitsPer1Ml} Units</Text>
                    </View>
                    <View className="flex-row justify-between items-baseline">
                      <Text className="text-base text-muted-foreground">1 Unit</Text>
                      <Text className="text-base text-primary font-semibold">{dilutionResults.mlPer1Unit} mL</Text>
                    </View>
                  </View>
                </View>
                <Text className="text-xs text-muted-foreground text-center px-4">All values are based on your selected vial units and diluent volume. InjexPro does not provide dosing recommendations.</Text>
              </View>
            )}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

interface PillButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

function PillButton({ label, isSelected, onPress }: PillButtonProps) {
  return (
    <Pressable onPress={onPress} className={`py-2 px-4 rounded-full active:opacity-70 ${isSelected ? 'bg-primary' : 'bg-secondary'}`}>
      <Text className={isSelected ? 'text-secondary-foreground' : 'text-secondary-foreground'}>{label}</Text>
    </Pressable>
  )
}
