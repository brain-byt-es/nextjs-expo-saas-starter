
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/nativewindui/Text';

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'About' }} />
      <ScrollView contentContainerClassName="p-5">
        <View className="mb-5">
          <Text variant="title2" className="mb-2.5">
            About DoseCalculator
          </Text>
          <Text variant="body" className="mb-2.5">
            DoseCalculator is a minimalist, clinically focused tool for brand-to-brand unit
            conversion and dilution calculations in botulinum toxin workflows. It is designed for
            neurologists, aesthetic physicians, and qualified nurse injectors who need fast,
            structured support for routine calculations.
          </Text>
          <Text variant="body">
            You can use DoseCalculator in guest mode for one-off calculations, or create an account
            to save your own brand ratios and default dilution settings across devices.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title3" className="mb-2.5">
            What DoseCalculator Does
          </Text>
          <Text variant="body" className="mb-1.5">
            - Converts units between toxin brands based on user-defined multipliers.
          </Text>
          <Text variant="body">
            - Calculates dilution parameters from your inputs (total units, total volume,
            withdrawal volume), including: units/ml, units per withdrawal, ml per unit, and ml per
            10 units.
          </Text>
          <Text variant="body" className="mt-2.5 italic">
            DoseCalculator provides mathematical support only. It does not suggest doses, treatment
            plans, or clinical decisions.
          </Text>
        </View>

        <View className="mb-5">
          <Text variant="title3" className="mb-2.5">
            Important Limitations
          </Text>
          <Text variant="body" className="mb-1.5">
            - DoseCalculator is intended exclusively for medical professionals with appropriate
            training and authorization.
          </Text>
          <Text variant="body" className="mb-1.5">
            - The app does not store or process patient-identifiable data (PHI).
          </Text>
          <Text variant="body" className="mb-1.5">
            - All conversion factors, dilution parameters, and clinical decisions are defined and
            validated by you as the treating clinician.
          </Text>
          <Text variant="body" className="mb-1.5">
            - The app must not be used as a substitute for clinical judgment, local guidelines, or
            product information.
          </Text>
          <Text variant="body" className="mb-1.5">
            - InjexPro and DoseCalculator do not provide medical advice or dosage recommendations.
          </Text>
          <Text variant="heading" className="mt-2.5">
            By using this app, you confirm that you are a qualified medical professional and that you
            remain fully responsible for all clinical decisions and outcomes.
          </Text>
        </View>

        <View>
          <Text variant="title2" className="mb-2.5">
            About InjexPro
          </Text>
          <Text variant="body" className="mb-2.5">
            DoseCalculator is part of the InjexPro ecosystem — a clinical-grade software suite
            built to strengthen precision and patient safety in injection practice through
            structured, evidence-oriented tools.
          </Text>
          <Text variant="heading" className="italic">
            Our guiding principles are simple: Evidence. Clarity. Confidence.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
