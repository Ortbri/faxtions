import '~/global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NAV_THEME } from '~/src/lib/contants';
import { useColorScheme } from '~/src/lib/useColorScheme';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: '',
      fontWeight: 'bold',
    },
    medium: {
      fontFamily: '',
      fontWeight: 'bold',
    },
    bold: {
      fontFamily: '',
      fontWeight: 'bold',
    },
    heavy: {
      fontFamily: '',
      fontWeight: 'bold',
    },
  },
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: '',
      fontWeight: 'bold',
    },
    medium: {
      fontFamily: '',
      fontWeight: 'bold',
    },
    bold: {
      fontFamily: '',
      fontWeight: 'bold',
    },
    heavy: {
      fontFamily: '',
      fontWeight: 'bold',
    },
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="settings" options={{ presentation: 'formSheet' }} />
          <Stack.Screen name="chat" options={{}} />
          <Stack.Screen name="tests" options={{}} />
          <Stack.Screen name="logWorkout" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
