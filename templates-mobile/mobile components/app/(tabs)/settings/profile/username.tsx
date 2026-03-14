import { useUser } from '@clerk/clerk-expo';
import { router, Stack } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '@/components/nativewindui/Form';
import { Text } from '@/components/nativewindui/Text';
import { TextField } from '@/components/nativewindui/TextField';
import { cn } from '@/lib/cn';

export default function UsernameScreen() {
  const insets = useSafeAreaInsets();
  const { user, isLoaded } = useUser();
  const [isSaving, setIsSaving] = React.useState(false);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    if (user) {
      setUsername(user.username || '');
    }
  }, [user]);

  async function handleSave() {
    if (!user || !isLoaded) return;
    setIsSaving(true);
    try {
      await user.update({ username: username });
      router.back();
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const canSave = !!username && username !== (user?.username || '') && !isSaving;

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Username',
          headerTransparent: Platform.OS === 'ios',
          headerBlurEffect: 'systemMaterial',
          headerRight: Platform.select({
            ios: () => (
              <Button
                className="ios:px-0"
                disabled={!canSave}
                variant="plain"
                onPress={handleSave}>
                <Text className={cn(canSave && 'text-primary')}>Save</Text>
              </Button>
            ),
          }),
        }}
      />

      <KeyboardAwareScrollView
        bottomOffset={8}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <Form className="gap-5 px-4 pt-8">
          <FormSection
            materialIconProps={{ name: 'account-circle-outline' }}
            footnote="Choose a unique identifier for your account.">
            <FormItem>
              <TextField
                textContentType="username"
                autoComplete="username"
                className="pl-0.5"
                label={Platform.select({ ios: undefined, default: 'Username' })}
                leftView={
                  <View className="ios:w-36 ios:justify-between flex-row items-center pl-2">
                    {Platform.OS === 'ios' && <Text className="font-medium">Username</Text>}
                    <Text className="text-muted-foreground">@</Text>
                  </View>
                }
                placeholder="required"
                value={username}
                onChangeText={setUsername}
                onSubmitEditing={handleSave}
                enterKeyHint="done"
              />
            </FormItem>
          </FormSection>
          {Platform.OS !== 'ios' && (
            <View className="items-end">
              <Button
                className={cn('px-6', !canSave && 'bg-muted')}
                disabled={!canSave}
                onPress={handleSave}>
                {isSaving ? <ActivityIndicator color="white" /> : <Text>Save</Text>}
              </Button>
            </View>
          )}
        </Form>
      </KeyboardAwareScrollView>
    </>
  );
}
