import { Text as RNText } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

interface TextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'body' | 'caption' | 'label';
  size?: 'sm' | 'md' | 'lg';
}

export const Text = ({ children, variant = 'body', size = 'md' }: TextProps) => {
  /* ---------------------------------- hook ---------------------------------- */
  styles.useVariants({
    size,
    variant,
  });
  /* --------------------------------- return --------------------------------- */
  return <RNText style={styles.text}>{children}</RNText>;
};

const styles = StyleSheet.create((theme, rt) => ({
  text: {
    variants: {
      size: {
        sm: {
          fontSize: rt.fontScale * 12,
        },
        md: {
          fontSize: rt.fontScale * 14,
        },
        lg: {
          fontSize: rt.fontScale * 16,
        },
      },
      variant: {
        heading: {
          color: theme.colors.text,
          fontWeight: '700',
        },
        body: {
          color: theme.colors.text,
          fontWeight: '400',
        },
        caption: {
          color: theme.colors.secondary,
          fontWeight: '400',
        },
        label: {
          color: theme.colors.text,
          fontWeight: '600',
        },
      },
    },
  },
}));

export type TextVariants = UnistylesVariants<typeof styles>;
