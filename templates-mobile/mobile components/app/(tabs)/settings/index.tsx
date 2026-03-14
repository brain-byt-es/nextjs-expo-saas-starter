import { useAuth, useUser } from '@clerk/clerk-expo';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, Platform, View } from 'react-native';

import { LoginRequiredModal } from '@/components/LoginRequiredModal';
import { Icon } from '@/components/nativewindui/Icon';
import type { IconProps } from '@/components/nativewindui/Icon/types';
import { LargeTitleHeader } from '@/components/nativewindui/LargeTitleHeader';
import {
  List,
  ListDataItem,
  ListItem,
  ListRenderItemInfo,
  ListSectionHeader,
} from '@/components/nativewindui/List';
import { Text } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';

export default function SettingsIosStyleScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const state = navigation.getState();
  const previousRoute = state?.routes[state.index - 1]?.name;

  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const handleLogin = () => {
    setLoginModalVisible(false);
    router.push('/auth'); // Redirect to login flow
  };

  const handleItemPress = (item: SettingsItem) => {
    const restrictedIds = [
      'brand_ratios',
      'default_dilution',
      'unit_measurement',
      'appearance',
    ];

    if (restrictedIds.includes(item.id) && !isSignedIn) {
      setLoginModalVisible(true);
      return;
    }

    if (item.id === 'account') {
      if (!isSignedIn) {
        router.push('/auth');
        return;
      }
      router.push('/settings/profile');
      return;
    }

    if (item.id === 'brand_ratios') {
      router.push('/settings/brand-ratios');
      return;
    }

    if (item.id === 'default_dilution') {
      router.push('/settings/default-dilution');
      return;
    }

    if (item.id === 'unit_measurement') {
      router.push('/settings/unit-measurement');
      return;
    }

    if (item.id === 'appearance') {
      router.push('/settings/appearance');
      return;
    }

    if (item.id === 'tos') {
      router.push('/legal/terms-of-service');
      return;
    }
    if (item.id === 'privacy') {
      router.push('/legal/privacy-policy');
      return;
    }
    if (item.id === 'disclaimer') {
      router.push('/legal/disclaimer');
      return;
    }

    if (item.id === 'support') {
      Linking.openURL('https://nativewindui.com/discord');
      return;
    }

    if (item.id === 'about') {
      router.push('/settings/about');
      return;
    }

    console.log('Pressed:', item.title);
    // Navigate or perform other actions here
  };


  const DATA: (SettingsItem | string)[] = [
    'Calculation Defaults',
    {
      id: 'brand_ratios',
      title: 'Brand Ratios',
      leftView: <IconView name="eyedropper" className="bg-blue-500" />,
    },
    {
      id: 'default_dilution',
      title: 'Default Dilution',
      leftView: <IconView name="drop.fill" className="bg-blue-500" />,
    },
    {
      id: 'unit_measurement',
      title: 'Unit of Measurement',
      leftView: <IconView name="ruler.fill" className="bg-blue-500" />,
    },
    'General',
    {
      id: 'account',
      title: 'Account',
      leftView: <IconView name="person.fill" className="bg-blue-500" />,
      rightText: user?.primaryEmailAddress?.emailAddress ?? 'Not logged in',
    },
    {
      id: 'appearance',
      title: 'Appearance',
      leftView: <IconView name="moon.fill" className="bg-blue-500" />,
      rightText: 'System',
    },
    'Legal',
    {
      id: 'tos',
      title: 'Terms of Service',
      leftView: <IconView name="doc.fill" className="bg-blue-500" />,
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      leftView: <IconView name="lock.fill" className="bg-blue-500" />,
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      leftView: <IconView name="info.circle.fill" className="bg-blue-500" />,
    },
    'Help',
    {
      id: 'support',
      title: 'Support',
      leftView: <IconView name="questionmark.bubble.fill" className="bg-blue-500" />,
      rightText: 'Discord',
    },
    {
      id: 'about',
      title: 'About',
      leftView: <IconView name="info.circle.fill" className="bg-blue-500" />,
    },
  ];

  function renderItem<T extends (typeof DATA)[number]>(info: ListRenderItemInfo<T>) {
    if (typeof info.item === 'string') {
      return <ListSectionHeader {...info} />;
    }
    return (
      <ListItem
        className={cn(
          'ios:pl-0 pl-2',
          info.index === 0 && 'ios:border-t-0 border-border/25 dark:border-border/80 border-t',
          info.item.className
        )}
        titleClassName={cn('text-lg', info.item.titleClassName)}
        leftView={info.item.leftView}
        rightView={
          info.item.rightView ? (
            info.item.rightView
          ) : (
            <View className="flex-1 flex-row items-center justify-center gap-2 px-4">
              {info.item.rightText && (
                <Text variant="callout" className="ios:px-0 text-muted-foreground px-2">
                  {info.item.rightText}
                </Text>
              )}
              {info.item.badge && (
                <View className="bg-destructive h-5 w-5 items-center justify-center rounded-full">
                  <Text variant="footnote" className="text-destructive-foreground font-bold leading-4">
                    {info.item.badge}
                  </Text>
                </View>
              )}
              {!info.item.hideChevron && <ChevronRight />}
            </View>
          )
        }
        {...info}
        onPress={() => handleItemPress(info.item as SettingsItem)}
      />
    );
  }

  return (
    <>
      <LargeTitleHeader
        backgroundColor="transparent"
        title="Settings"
        iosBackButtonTitle={previousRoute === 'index' ? undefined : 'Back'}
        searchBar={{ iosHideWhenScrolling: true }}
      />
      <List
        contentContainerClassName="pt-4"
        contentInsetAdjustmentBehavior="automatic"
        variant="insets"
        data={DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        sectionHeaderAsGap
      />
      <LoginRequiredModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        onLogin={handleLogin}
      />
    </>
  );
}

function ChevronRight() {
  return <Icon name="chevron.right" className="text-muted-foreground/80 ios:size-4" />;
}

function IconView({
  className,
  name,
}: {
  className?: string;
  name: NonNullable<IconProps['name']>;
}) {
  return (
    <View className="px-3">
      <View
        style={{ borderCurve: 'continuous' }}
        className={cn('h-7 w-7 items-center justify-center rounded-md', className)}>
        <Icon name={name} className="size-5 text-white" />
      </View>
    </View>
  );
}

function keyExtractor(item: (Omit<ListDataItem, string> & { id: string }) | string) {
  return typeof item === 'string' ? item : item.id;
}

type SettingsItem = {
  id: string;
  title: string;
  subTitle?: string;
  leftView?: React.ReactNode;
  rightText?: string;
  rightView?: React.ReactNode;
  badge?: number;
  className?: string;
  titleClassName?: string;
  hideChevron?: boolean;
};