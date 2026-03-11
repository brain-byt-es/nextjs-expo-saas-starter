import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Index() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-background">
      <StyledText className="text-foreground text-2xl font-bold">
        Mobile App
      </StyledText>
    </StyledView>
  );
}
