import { useAugmentedRef } from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { AlertButton, Pressable, Alert as RNAlert } from 'react-native';

import type { AlertMethods, AlertProps } from './types';

function Alert({ ref, children, title, buttons, message, prompt }: AlertProps) {
  const augmentedRef = useAugmentedRef({
    ref: ref as React.Ref<AlertMethods>,
    methods: {
      show: () => {
        onPress();
      },
      alert,
      prompt: promptAlert,
    },
    deps: [prompt],
  });

  function promptAlert(args: AlertProps & { prompt: Required<AlertProps['prompt']> }) {
    RNAlert.prompt(
      args.title,
      args.message,
      args.buttons as AlertButton[],
      args.prompt?.type,
      args.prompt?.defaultValue,
      args.prompt?.keyboardType
    );
  }

  function alert(args: AlertProps) {
    RNAlert.alert(args.title, args.message, args.buttons as AlertButton[]);
  }

  function onPress() {
    if (prompt) {
      promptAlert({
        title,
        message,
        buttons,
        prompt: prompt as Required<AlertProps['prompt']>,
      });
      return;
    }
    alert({ title, message, buttons });
  }

  const Component = !children ? Pressable : Slot.Pressable;
  return (
    <Component ref={augmentedRef} onPress={onPress}>
      {children}
    </Component>
  );
}

Alert.displayName = 'Alert';

function AlertAnchor({ ref }: { ref: React.Ref<AlertMethods> }) {
  return <Alert ref={ref} title="" buttons={[]} />;
}

export { Alert, AlertAnchor };
