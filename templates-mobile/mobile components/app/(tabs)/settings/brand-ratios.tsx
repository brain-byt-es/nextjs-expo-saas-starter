
import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';

import { useSupabase } from '@/lib/SupabaseProvider';
import { Tables } from '@/lib/database.types';

export default function BrandRatios() {
  const supabase = useSupabase();
  const { userId } = useAuth();
  const router = useRouter();
  const [dilutions, setDilutions] = useState<Tables<'user_dilutions'>[]>([]);

  useEffect(() => {
    if (!supabase || !userId) return;

    const fetchDilutions = async () => {
      const { data, error } = await supabase
        .from('user_dilutions')
        .select('*, brands (name)')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching dilutions:', error);
      } else {
        setDilutions(data as any);
      }
    };

    fetchDilutions();
  }, [supabase, userId]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.brands.name}</Text>
      <Text>
        {item.dilution_ml} ml - {item.label}
      </Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Brand Ratios',
          headerRight: () => <Button onPress={() => router.push('/settings/add-dilution')} title="Add" />,
        }}
      />
      <FlatList
        data={dilutions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No dilutions found.</Text>}
      />
    </>
  );
}

