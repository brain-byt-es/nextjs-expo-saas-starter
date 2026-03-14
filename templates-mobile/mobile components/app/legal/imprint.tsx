import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/nativewindui/Text';
import { Drawer } from '../../components/nativeui/Drawer';

export default function Imprint() {
  const router = useRouter();

  return (
    <Drawer
      open={true}
      onClose={() => router.back()}
      title="Imprint"
      size="full"
      initialSnapIndex={1}
    >
      <ScrollView contentContainerClassName="p-5">
        <View className="mb-5">
          <Text variant="title1" className="mb-2.5">
            IMPRINT
          </Text>
          <Text variant="title2" className="mb-2.5">
            Information according to § 5 TMG
          </Text>
          <Text variant="body" className="mb-1.5">
            HR Online Consulting LLC
          </Text>
          <Text variant="body" className="mb-1.5">
            550 Kings Mountain
          </Text>
          <Text variant="body" className="mb-2.5">
            Kings Mountain, NC 28086
          </Text>
          <Text variant="body">
            United States
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            Represented by:
          </Text>
          <Text variant="body">
            Henrik Ruess
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            Contact:
          </Text>
          <Text variant="body" className="mb-1.5">
            Phone: +49 151 594 56 993
          </Text>
          <Text variant="body">
            Email: legal@injexpro.com
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            Register Entry:
          </Text>
          <Text variant="body" className="mb-1.5">
            Entry in the Commercial Register.
          </Text>
          <Text variant="body" className="mb-1.5">
            Registering Court: Catawba Digital Economic Zone
          </Text>
          <Text variant="body">
            Registration Number: [Pending]
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            VAT ID:
          </Text>
          <Text variant="body" className="mb-1.5">
            Sales tax identification number according to § 27 a Sales Tax Law:
          </Text>
          <Text variant="body">
            [Pending]
          </Text>
        </View>

        <View>
          <Text variant="title2" className="mb-2.5">
            Responsible for the content according to § 55 Abs. 2 RStV:
          </Text>
          <Text variant="body" className="mb-1.5">
            Henrik Ruess
          </Text>
          <Text variant="body" className="mb-1.5">
            550 Kings Mountain
          </Text>
          <Text variant="body" className="mb-1.5">
            Kings Mountain, NC 28086
          </Text>
          <Text variant="body">
            United States
          </Text>
        </View>
      </ScrollView>
    </Drawer>
  );
}
