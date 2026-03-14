import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text } from 'react-native';

import { Picker, PickerItem } from '@/components/nativewindui/Picker';
import { useSupabase } from '@/lib/SupabaseProvider';
import { Tables } from '@/lib/database.types';

type Brand = Tables<'brands'>;

export default function AddDilution() {
  const supabase = useSupabase();
  const { userId } = useAuth();
  const router = useRouter();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [dilutionMl, setDilutionMl] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!supabase) return;

    const fetchBrands = async () => {
      const { data, error } = await supabase.from('brands').select('*');
      if (error) {
        console.error('Error fetching brands:', error);
      } else {
        setBrands(data);
      }
    };

    fetchBrands();
  }, [supabase]);

  const handleSave = async () => {
    if (!supabase || !userId || !selectedBrand || !dilutionMl) return;

    const { error } = await supabase.from('user_dilutions').insert({
      user_id: userId,
      brand_id: selectedBrand,
      dilution_ml: parseFloat(dilutionMl),
      label,
    });

    if (error) {
      console.error('Error saving dilution:', error);
    } else {
      router.back();
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Add Dilution' }} />
      <View style={{ padding: 20 }}>
        <Text>Brand</Text>
        <Picker
          selectedValue={selectedBrand}
          onValueChange={(itemValue) => setSelectedBrand(itemValue as string)}>
          {brands.map((brand) => (
            <PickerItem key={brand.id} label={brand.name} value={brand.id} />
          ))}
        </Picker>
        <Text>Dilution (ml)</Text>
        <TextInput
          value={dilutionMl}
          onChangeText={setDilutionMl}
          keyboardType="numeric"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <Text>Label</Text>
        <TextInput
          value={label}
          onChangeText={setLabel}
          style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </>
  );
}
