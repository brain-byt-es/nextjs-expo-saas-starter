import { Pressable, View, type PressableProps, type ViewProps, type ViewStyle } from 'react-native';

import { Icon } from '@/components/nativewindui/Icon';
import { cn } from '@/lib/cn';

// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522
const BORDER_CURVE: ViewStyle = {
  borderCurve: 'continuous',
};

type withoutChildren<T> = Omit<T, 'children'>;

type StepperProps = withoutChildren<ViewProps> & {
  subtractButton?: withoutChildren<PressableProps>;
  addButton?: withoutChildren<PressableProps>;
};

function Stepper({ className, subtractButton, addButton, ...props }: StepperProps) {
  return (
    <View
      style={BORDER_CURVE}
      className={cn(
        'ios:bg-card ios:rounded-md ios:border-0 border-border flex-row items-center overflow-hidden rounded-full border',
        className
      )}
      {...props}>
      <Pressable
        {...subtractButton}
        className={cn(
          'ios:active:bg-border/30 active:bg-primary/10 dark:active:bg-primary/15 dark:ios:active:bg-border/30 ios:px-3 ios:h-[30px] h-[38px] justify-center px-5',
          subtractButton?.disabled && 'bg-border/20 opacity-70 dark:opacity-50',
          subtractButton?.className
        )}>
        <Icon name="minus" className="android:opacity-60 text-foreground size-5" />
      </Pressable>
      <View className="ios:h-5 ios:bg-border bg-border h-[38px] w-px rounded-full" />
      <Pressable
        {...addButton}
        className={cn(
          'ios:active:bg-border/30 active:bg-primary/10 dark:active:bg-primary/15 dark:ios:active:bg-border/30 ios:px-3 ios:h-[30px] h-[38px] justify-center px-5',
          addButton?.disabled && 'bg-border/20 opacity-70 dark:opacity-50',
          addButton?.className
        )}>
        <Icon name="plus" className="android:opacity-60 text-foreground size-5" />
      </Pressable>
    </View>
  );
}

export { Stepper };
