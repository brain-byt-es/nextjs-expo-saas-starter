import { forwardRef } from 'react';
import { TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { Text } from './Text';
import { cn } from '@/lib/cn';

const Input = forwardRef<TextInput, TextInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'web:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2',
          'px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground',
          'border border-input rounded-md',
          'bg-background',
          className
        )}
        placeholderClassName="text-muted-foreground"
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

const InputLabel = forwardRef<
  View,
  ViewProps & {
    nativeID: string;
    error?: string;
    required?: boolean;
  }
>(({ children, className, error, ...props }, ref) => {
  return (
    <View ref={ref} className={cn('flex-row gap-1 pb-1.5', className)} {...props}>
      <Text nativeID={props.nativeID}>{children}</Text>
      {error && <Text className="text-destructive">*</Text>}
    </View>
  );
});

InputLabel.displayName = 'InputLabel';

export { Input, InputLabel };
