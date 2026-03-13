import { Platform, View } from "react-native";
import { Text } from "@/components/nativewindui/Text";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "ios" ? 8 : 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
      }}
    >
      <Text
        variant="largeTitle"
        style={{ fontWeight: "700" }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          variant="subhead"
          color="tertiary"
          style={{ marginTop: 4 }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
