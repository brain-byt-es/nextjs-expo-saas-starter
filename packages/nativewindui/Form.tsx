// The form component must be a child of a Scrollable component !!!

import * as React from 'react';
import { Platform, View, ViewProps, ViewStyle } from 'react-native';

import { Icon } from '@/components/nativewindui/Icon';
import type { IconProps } from '@/components/nativewindui/Icon/types';
import { Text } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';
import { useColorScheme } from '@/lib/useColorScheme';

function Form({ className, ...props }: ViewProps) {
  return <View className={cn('gap-9', className)} {...props} />;
}

// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522
const BORDER_CURVE: ViewStyle = {
  borderCurve: 'continuous',
};

type FormSectionProps = ViewProps & {
  rootClassName?: string;
  footnote?: string;
  footnoteClassName?: string;
  ios?: {
    title: string;
    titleClassName?: string;
  };
  materialIconProps?: IconProps['materialCommunityIcon'];
};

function FormSection({
  rootClassName,
  className,
  footnote,
  footnoteClassName,
  ios,
  materialIconProps,
  style = BORDER_CURVE,
  children: childrenProps,
  ...props
}: FormSectionProps) {
  const { colors } = useColorScheme();
  const children = React.useMemo(() => {
    if (Platform.OS !== 'ios') return childrenProps;
    const childrenArray = React.Children.toArray(childrenProps);
    // Add isLast prop to last child
    return React.Children.map(childrenArray, (child, index) => {
      if (!React.isValidElement(child)) return child;
      const isLast = index === childrenArray.length - 1;
      if (typeof child === 'string') {
        console.log('FormSection - Invalid asChild element', child);
      }
      return React.cloneElement<ViewProps & { isLast?: boolean }, View>(
        typeof child === 'string' ? <></> : child,
        { isLast }
      );
    });
  }, [childrenProps]);

  return (
    <View
      className={cn(
        'relative',
        Platform.OS !== 'ios' && !!materialIconProps && 'flex-row gap-4',
        rootClassName
      )}>
      {Platform.OS === 'ios' && !!ios?.title && (
        <Text
          variant="footnote"
          className={cn('text-muted-foreground pb-1 pl-3 uppercase', ios?.titleClassName)}>
          {ios.title}
        </Text>
      )}
      {!!materialIconProps && (
        <View className="ios:hidden pt-0.5">
          <Icon
            sfSymbol={{ name: 'questionmark' }}
            color={colors.grey}
            materialCommunityIcon={materialIconProps}
          />
        </View>
      )}
      <View className={cn(!!materialIconProps && Platform.OS === 'android' && 'flex-1')}>
        <View
          className={cn(
            'ios:overflow-hidden ios:rounded-lg ios:bg-card ios:gap-0 ios:pl-1 gap-4',
            className
          )}
          style={style} 
          {...props}>
          {children}
        </View>
        {!!footnote && (
          <Text
            className={cn('ios:pl-3 ios:pt-1 text-muted-foreground pl-3 pt-0.5', footnoteClassName)}
            variant="footnote">
            {footnote}
          </Text>
        )}
      </View>
    </View>
  );
}

function FormItem({
  className,
  isLast,
  iosSeparatorClassName,
  ...props
}: ViewProps & {
  isLast?: boolean;
  iosSeparatorClassName?: string;
}) {
  return (
    <>
      <View className={cn('ios:pr-1', className)} {...props} />
      {Platform.OS === 'ios' && !isLast && (
        <View className={cn('bg-border ml-2 h-px w-full', iosSeparatorClassName)} />
      )}
    </>
  );
}

export { Form, FormItem, FormSection };
