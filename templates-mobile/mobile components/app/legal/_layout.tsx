import { Stack } from 'expo-router';

export default function LegalLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
                animation: 'none',
                contentStyle: { backgroundColor: 'transparent' },
            }}
        />
    );
}
