import * as React from 'react';
import { Keyboard, type TextInputKeyPressEvent, View } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';

import { TextField } from '@/components/nativewindui/TextField';
import { cn } from '@/lib/cn';
import { useColorScheme } from '@/lib/useColorScheme';

const NUM_OF_CODE_CHARACTERS = 6;
const OTP_FIELD_SELECTION = { start: 0, end: 1 };

type OTPInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    isLoading?: boolean;
    hasError?: boolean;
    onSubmit?: () => void;
};

export function OTPInput({
    value,
    onChangeText,
    isLoading = false,
    hasError = false,
    onSubmit,
}: OTPInputProps) {
    // Split the string value into an array for the fields
    const codeValues = React.useMemo(() => {
        const arr = Array(NUM_OF_CODE_CHARACTERS).fill('');
        for (let i = 0; i < value.length && i < NUM_OF_CODE_CHARACTERS; i++) {
            arr[i] = value[i];
        }
        return arr;
    }, [value]);

    const setCodeValues = (newValues: string[]) => {
        onChangeText(newValues.join(''));
    };

    return (
        <View className="flex-row justify-between gap-2 py-3">
            {codeValues.map((char, index) => (
                <OTPField
                    key={index}
                    index={index}
                    value={char}
                    codeValues={codeValues}
                    setCodeValues={setCodeValues}
                    isLoading={isLoading}
                    onSubmit={onSubmit}
                    hasError={hasError}
                />
            ))}
        </View>
    );
}

type OTPFieldProps = {
    index: number;
    value: string;
    codeValues: string[];
    setCodeValues: (values: string[]) => void;
    isLoading: boolean;
    onSubmit?: () => void;
    hasError: boolean;
};

function OTPField({
    index,
    value,
    codeValues,
    setCodeValues,
    isLoading,
    onSubmit,
    hasError,
}: OTPFieldProps) {
    const { colors } = useColorScheme();
    const [isFocused, setIsFocused] = React.useState(false);

    function onKeyPress({ nativeEvent }: TextInputKeyPressEvent) {
        if (nativeEvent.key === 'Backspace' && value === '') {
            KeyboardController.setFocusTo('prev');
        }
        if (value === nativeEvent.key) {
            KeyboardController.setFocusTo('next');
        }
    }

    function onFocus(e: any) {
        e.currentTarget.setNativeProps({
            selection: { start: 0, end: value?.toString().length },
        });
        setIsFocused(true);
    }

    function onBlur() {
        setIsFocused(false);
    }

    function onChangeText(text: string) {
        const values = [...codeValues];

        if (text.length === 0) {
            values[index] = '';
            if (codeValues[index + 1] === '') {
                KeyboardController.setFocusTo('prev');
            }
            setCodeValues(values);
            return;
        }

        for (let i = 0; i < text.length; i++) {
            if (index + i >= NUM_OF_CODE_CHARACTERS) {
                break;
            }
            values[index + i] = text.charAt(i);
        }
        setCodeValues(values);

        if (text.length < NUM_OF_CODE_CHARACTERS - 1) {
            KeyboardController.setFocusTo('next');
        } else {
            Keyboard.dismiss();
        }
    }

    return (
        <TextField
            value={value}
            editable={!isLoading}
            keyboardType="numeric"
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
            containerClassName={cn(
                'flex-1 ios:bg-background ios:shadow-sm ios:shadow-muted/40 ios:border ios:border-border ios:rounded-lg',
                isFocused && 'ios:border-primary border-primary'
            )}
            className="bg-card/80 ios:rounded-lg pr-2.5 text-center"
            clearButtonMode="never"
            materialHideActionIcons
            materialRingColor={hasError ? colors.destructive : undefined}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
            onChangeText={onChangeText}
            onSubmitEditing={
                index === NUM_OF_CODE_CHARACTERS - 1
                    ? onSubmit
                    : () => KeyboardController.setFocusTo('next')
            }
            submitBehavior="submit"
            selection={OTP_FIELD_SELECTION}
            accessibilityHint={hasError ? 'Missing OTP Character' : undefined}
        />
    );
}
