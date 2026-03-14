import { useAuth, useUser } from '@clerk/clerk-expo';
import { router, Stack } from 'expo-router';
import { ActivityIndicator, Linking, Platform, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/nativewindui/Avatar';
import { Button } from '@/components/nativewindui/Button';
import { Icon } from '@/components/nativewindui/Icon';
import {
  List,
  ListItem,
  ListRenderItemInfo,
  ListSectionHeader,
} from '@/components/nativewindui/List';
import { Text } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';

const SCREEN_OPTIONS = {
  title: 'Profile',
  headerTransparent: Platform.OS === 'ios',
  headerBlurEffect: 'systemMaterial',
} as const;

export default function Profile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  const DATA: DataItem[] = [
    ...(Platform.OS !== 'ios' ? ['Basic info'] : []),
    {
      id: 'name',
      title: 'Name',
      ...(Platform.OS === 'ios'
        ? { value: user?.fullName ?? undefined }
        : { subTitle: user?.fullName ?? undefined }),
      onPress: () => router.push('/settings/profile/name'),
    },
    {
      id: 'username',
      title: 'Username',
      ...(Platform.OS === 'ios'
        ? { value: user?.username ?? undefined }
        : { subTitle: user?.username ?? undefined }),
      onPress: () => router.push('/settings/profile/username'),
    },
    ...(Platform.OS !== 'ios' ? ['Stay up to date'] : ['']),
    {
      id: '4',
      title: 'Notifications',
      ...(Platform.OS === 'ios' ? { value: 'Push' } : { subTitle: 'Push' }),
      onPress: () => router.push('/settings/profile/notification'),
    },

  ];

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <List
        variant="insets"
        data={DATA}
        sectionHeaderAsGap={Platform.OS === 'ios'}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeaderComponent />}
        ListFooterComponent={<ListFooterComponent />}
      />
    </>
  );
}

function renderItem(info: ListRenderItemInfo<DataItem>) {
  return <Item info={info} />;
}

function Item({ info }: { info: ListRenderItemInfo<DataItem> }) {
  if (typeof info.item === 'string') {
    return <ListSectionHeader {...info} />;
  }
  return (
    <ListItem
      titleClassName="text-lg"
      rightView={
        <View className="flex-1 flex-row items-center gap-0.5 px-2">
          {!!info.item.value && <Text className="text-muted-foreground">{info.item.value}</Text>}
          <Icon name="chevron.right" className="text-muted-foreground/80 ios:size-4" />
        </View>
      }
      onPress={info.item.onPress}
      {...info}
    />
  );
}

function ListHeaderComponent() {
  const { user } = useUser();
  const displayName =
    user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || '';
  const initials = (displayName || '')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      try {
        await user?.setProfileImage({
          file: `data:image/jpeg;base64,${result.assets[0].base64}`,
        });
      } catch (e) {
        console.error('Error updating profile image:', e);
        alert('Error updating profile image');
      }
    }
  };

  return (
    <View className="ios:pb-8 items-center pb-4 pt-8">
      <TouchableOpacity onPress={pickImage}>
        <Avatar alt={displayName} className="h-24 w-24">
          <AvatarImage source={{ uri: user?.imageUrl }} />
          <AvatarFallback>
            <Text
              variant="largeTitle"
              className={cn(
                'dark:text-background font-medium text-white',
                Platform.OS === 'ios' && 'dark:text-foreground'
              )}>
              {initials}
            </Text>
          </AvatarFallback>
        </Avatar>
      </TouchableOpacity>
      <View className="p-1" />
      <Text variant="title1">{displayName}</Text>
      <Text className="text-muted-foreground">
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}

function ListFooterComponent() {
  const { signOut } = useAuth();
  return (
    <View className="ios:px-0 px-4 pt-8">
      <Button
        size="lg"
        variant={Platform.select({ ios: 'primary', default: 'secondary' })}
        className="border-border bg-card"
        onPress={() => signOut()}>
        <Text className="text-destructive">Log Out</Text>
      </Button>
    </View>
  );
}

type DataItem =
  | string
  | {
    id: string;
    title: string;
    value?: string;
    subTitle?: string;
    onPress: () => void;
  };
