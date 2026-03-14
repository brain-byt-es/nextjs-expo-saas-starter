import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { useControllableState } from '@rn-primitives/hooks';

import { Icon } from '@/components/nativewindui/Icon';
import { cn } from '@/lib/cn';

type CheckboxProps = Omit<CheckboxPrimitive.RootProps, 'checked' | 'onCheckedChange'> & {
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

const HIT_SLOP = 16;

const SF_SYMBOL_CHECK_ICON_PROPS = {
  weight: 'medium',
} as const;

function Checkbox({
  className,
  checked: checkedProps,
  onCheckedChange: onCheckedChangeProps,
  defaultChecked = false,
  ...props
}: CheckboxProps) {
  const [checked = false, onCheckedChange] = useControllableState({
    prop: checkedProps,
    defaultProp: defaultChecked,
    onChange: onCheckedChangeProps,
  });
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'ios:rounded-full ios:h-[22px] ios:w-[22px] ios:border-muted-foreground border-muted h-[18px] w-[18px] rounded-sm border',
        checked && 'bg-primary border-0',
        props.disabled && 'opacity-50',
        className
      )}
      checked={checked}
      onCheckedChange={onCheckedChange}
      hitSlop={HIT_SLOP}
      {...props}>
      <CheckboxPrimitive.Indicator className={cn('h-full w-full items-center justify-center')}>
        <Icon
          name="checkmark"
          sfSymbol={SF_SYMBOL_CHECK_ICON_PROPS}
          className="ios:size-3 size-3.5  text-white"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
