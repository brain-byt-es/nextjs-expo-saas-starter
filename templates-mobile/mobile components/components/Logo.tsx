import { Svg, Path, Rect } from 'react-native-svg';
import { Text, View } from 'react-native';
import { cn } from '@/lib/cn';
import { useColorScheme } from 'nativewind';

interface LogoProps {
  className?: string;
  size?: number; // Base height for the SVG icon
}

export function Logo({ className, size = 24 }: LogoProps) {
  const { colorScheme } = useColorScheme();
  const aspectRatio = 64 / 80; // width / height from viewBox

  return (
    <View className={cn("flex-row items-center gap-2", className)}>
      
      {/* 
        SVG logomark. 
        Size is controlled via the `size` prop for reliability in React Native.
      */}
      <Svg
        height={size}
        width={size * aspectRatio}
        viewBox="0 0 64 80"
      >
        {/* The "I" element. Fill color is set dynamically based on the theme. */}
        <Path 
          d="M0 8C0 3.58172 3.58172 0 8 0H24V80H8C3.58172 80 0 76.4183 0 72V8Z" 
          fill={colorScheme === 'dark' ? '#F9FAFB' : '#111827'} // gray-50 for dark, gray-900 for light
        />
        {/* The "P" element */}
        <Rect x="32" width="32" height="32" fill="#3b82f6"/>
      </Svg>
      
      {/* The logotype. Font styles are applied directly to Text components. */}
      {/* Font size is scaled relative to the icon size */}
      <Text style={{ fontSize: size * 1.25 }} className="font-bold text-gray-900 dark:text-gray-50">
        <Text className="font-normal">Injex</Text>
        <Text className="font-bold">Pro</Text>
      </Text>
    </View>
  )
}
