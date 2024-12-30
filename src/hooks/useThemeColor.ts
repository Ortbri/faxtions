/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = (useColorScheme() ?? 'light') as keyof typeof props;
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return Colors[theme][colorName];
  }
}
