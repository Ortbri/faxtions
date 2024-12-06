import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = ({
  onPress,
  children,
  loading = false,
  size = 'md',
  variant = 'primary',
}: ButtonProps) => {
  /* ---------------------------------- hook ---------------------------------- */
  styles.useVariants({
    size,
    variant,
  });
  /* --------------------------------- return --------------------------------- */
  return (
    <TouchableOpacity onPress={onPress} disabled={loading} style={styles.button}>
      {loading ? (
        <ActivityIndicator color={styles.activityIndicator.color} />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    variants: {
      size: {
        sm: {
          paddingVertical: 8,
          paddingHorizontal: 12,
          minHeight: 32,
        },
        md: {
          paddingVertical: 10,
          paddingHorizontal: 16,
          minHeight: 40,
        },
        lg: {
          paddingVertical: 12,
          paddingHorizontal: 20,
          minHeight: 48,
        },
      },
      variant: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.primary,
        },
        ghost: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  text: {
    variants: {
      size: {
        sm: {
          fontSize: rt.fontScale * 14,
        },
        md: {
          fontSize: rt.fontScale * 16,
        },
        lg: {
          fontSize: rt.fontScale * 18,
        },
      },
      variant: {
        primary: {
          color: theme.colors.text,
          fontWeight: '600',
        },
        secondary: {
          color: theme.colors.text,
          fontWeight: '600',
        },
        outline: {
          color: theme.colors.primary,
          fontWeight: '600',
        },
        ghost: {
          color: theme.colors.primary,
          fontWeight: '500',
        },
      },
    },
  },
  activityIndicator: {
    color: theme.colors.text,
  },
}));

// We can also get the type for our props from the stylesheet:
export type ButtonVariants = UnistylesVariants<typeof styles>;
