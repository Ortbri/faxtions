import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, type Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, router } from 'expo-router';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const theme = useColorScheme();
  const isDarkColorScheme = theme === 'dark';
  // const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  /* ------------------------------- header text ------------------------------ */
  const headerButtonClose = () => {
    return (
      <Pressable onPressOut={() => router.back()}>
        <Ionicons name="close" size={24} color={isDarkColorScheme ? 'white' : 'black'} />
      </Pressable>
    );
  };

  /* --------------------------------- splash --------------------------------- */
  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  /* --------------------------------- return --------------------------------- */
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDarkColorScheme ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="chat"
            options={{
              headerLeft: headerButtonClose,
              presentation: 'transparentModal',
              headerShown: false,
              contentStyle: {
                backgroundColor: 'transparent',
              },
            }}
          />
        </Stack>
      </ThemeProvider>
      {/* portal provider */}
    </GestureHandlerRootView>
  );
}
