import { useTheme } from '@react-navigation/native';
import { Platform, type StyleProp, type TextStyle, useColorScheme } from 'react-native';
import type { BlurEffectTypes } from 'react-native-screens';

const useNavigationAppearance = () => {
  const { colors } = useTheme();
  const theme = useColorScheme();

  const defaultStyling = {
    headerLargeTitleShadowVisible: false,
    headerLargeTitleStyle: {
      fontWeight: '800',
    },
    headerShadowVisible: Platform.OS === 'ios',
    headerTintColor: colors.text,
    headerTitleAlign: 'center' as 'center' | 'left' | undefined,
    headerTitleStyle: {
      fontWeight: '700',
    } as StyleProp<
      Pick<TextStyle, 'fontWeight' | 'fontFamily' | 'fontSize'> & {
        color?: string | undefined;
      }
    >,
  };

  return {
    // blur settings
    headerBlurSettings: {
      headerLargeStyle: {
        backgroundColor: colors.background,
      },
      headerBlurEffect: 'prominent' as BlurEffectTypes,
      headerTransparent: Platform.OS === 'ios',
      headerStyle: {
        backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)',
      },
      ...defaultStyling,
    },
    // custom blur settings
    headerCustomBlurSettings: {
      headerTransparent: Platform.OS === 'ios',
      headerStyle: {
        backgroundColor: 'transparent',
      },
      ...defaultStyling,
    },
    // default settings
    headerDefaultSettings: {
      headerLargeStyle: {
        backgroundColor: colors.background,
      },
      headerStyle: {
        backgroundColor: colors.background,
      },
      ...defaultStyling,
    },
    headerModalSettings: {
      // TODO: could add body color changes
      contentStyle: {
        backgroundColor: colors.card,
      },
      ...defaultStyling,
    },
    // default settings for transparent
    headerTransparentSettings: {
      headerTransparent: true,
      headerLargeStyle: {
        backgroundColor: 'transparent',
      },
      headerStyle: {
        backgroundColor: 'transparent',
      },
      ...defaultStyling,
    },
  };
};

export default useNavigationAppearance;

/**
 * baconator example
 *      ...(process.env.EXPO_OS !== 'ios'
           ? {}
           : {
               headerLargeTitle: true,
               headerTransparent: true,
               headerBlurEffect: 'prominent',
               headerLargeTitleShadowVisible: false,
               headerShadowVisible: true,
               headerLargeStyle: {
                 // NEW: Make the large title transparent to match the background.
                 backgroundColor: 'transparent',
               },
             }),
 */
