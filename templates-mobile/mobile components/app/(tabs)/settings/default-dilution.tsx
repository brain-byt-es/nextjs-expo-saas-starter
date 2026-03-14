import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import { Picker, PickerItem } from '@/components/nativewindui/Picker';
import { useSupabase } from '@/lib/SupabaseProvider';
import { Tables } from '@/lib/database.types';

type Brand = Tables<'brands'>;
type Product = Tables<'products'>;
type UserBrandSetting = Tables<'user_brand_settings'>;

export default function DefaultDilution() {
  const supabase = useSupabase();
  const { userId } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<UserBrandSetting | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedDilution, setSelectedDilution] = useState<number | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const fetchInitialData = async () => {
      const { data: brandsData, error: brandsError } = await supabase.from('brands').select('*');
      if (brandsError) console.error('Error fetching brands:', brandsError);
      else setBrands(brandsData);
    };

    fetchInitialData();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !userId) return;

    const fetchUserSettings = async () => {
      const { data, error } = await supabase
        .from('user_brand_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        setSettings(data);
        setSelectedBrand(data.default_brand_id);
        setSelectedProduct(data.default_product_id);
        setSelectedDilution(data.default_dilution_ml);
      } else if (error && error.code !== 'PGRST116') {
        // PGRST116: no rows found
        console.error('Error fetching user settings:', error);
      }
    };

    fetchUserSettings();
  }, [supabase, userId]);

  useEffect(() => {
    if (!supabase || !selectedBrand) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('brand_id', selectedBrand);

      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
    };

    fetchProducts();
  }, [supabase, selectedBrand]);

  const handleSave = async () => {
    if (!supabase || !userId) return;

    const updates = {
      user_id: userId,
      default_brand_id: selectedBrand,
      default_product_id: selectedProduct,
      default_dilution_ml: selectedDilution,
      updated_at: new Date().toISOString(),
    };

    if (settings) {
      const { error } = await supabase
        .from('user_brand_settings')
        .update(updates)
        .eq('user_id', userId);
      if (error) {
        console.error('Error updating settings:', error);
      }
    } else {
      const { data, error } = await supabase
        .from('user_brand_settings')
        .insert(updates)
        .select()
        .single();
      if (error) {
        console.error('Error inserting settings:', error);
      } else if (data) {
        setSettings(data);
      }
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Default Dilution' }} />
      <View style={{ padding: 20 }}>
        <Text>Default Brand</Text>
        <Picker
          selectedValue={selectedBrand}
          onValueChange={(itemValue) => setSelectedBrand(itemValue as string)}>
          {brands.map((brand) => (
            <PickerItem key={brand.id} label={brand.name} value={brand.id} />
          ))}
        </Picker>

        <Text>Default Product</Text>
        <Picker
          selectedValue={selectedProduct}
          onValueChange={(itemValue) => setSelectedProduct(itemValue as string)}
          enabled={!!selectedBrand}>
          {products.map((product) => (
            <PickerItem key={product.id} label={`${product.units} units`} value={product.id} />
          ))}
        </Picker>

        {/* TODO: Add dilution picker, maybe from user_dilutions or standard_dilutions */}

        <Button title="Save" onPress={handleSave} />
      </View>
    </>
  );
}
