import useHaptics from '@/src/hooks/useHaptics';
import '../global.css';
import { setAndroidNavigationBar } from '@/src/lib/android-navigation-bar';
import { NAV_THEME } from '@/src/lib/contants';
import { useColorScheme } from '@/src/lib/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, type Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
export { ErrorBoundary } from 'expo-router';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { lightHaptic } = useHaptics();

  /* ------------------------------- header text ------------------------------ */
  const headerButtonClose = () => {
    return (
      <Pressable onPressIn={lightHaptic} onPressOut={() => router.back()}>
        <Ionicons name="close" size={24} color={isDarkColorScheme ? 'white' : 'black'} />
      </Pressable>
    );
  };

  /* --------------------------------- splash --------------------------------- */
  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  /* ---------------------------------- theme --------------------------------- */

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
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  /* --------------------------------- return --------------------------------- */
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <BottomSheetModalProvider> */}
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen
            name="chat"
            options={{ presentation: 'fullScreenModal', headerLeft: headerButtonClose }}
          />
        </Stack>
      </ThemeProvider>
      {/* </BottomSheetModalProvider> */}
      {/* portal host goes here */}
    </GestureHandlerRootView>
  );
}
