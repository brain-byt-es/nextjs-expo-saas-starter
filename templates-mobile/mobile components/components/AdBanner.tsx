// components/AdBanner.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const unitId =
  __DEV__ ? TestIds.BANNER : "ca-app-pub-xxxxxxxx/yyyyyyyyyy"; // <-- your real banner ad unit ID in prod

export function AdBanner() {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true, // optional
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
