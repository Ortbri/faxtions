import { BaseContextProvider } from '@/providers/BaseProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import * as React from 'react';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// error boundary
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  /* ---------------------------------- fonts --------------------------------- */
  const [loaded, error] = useFonts({});

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  /* --------------------------------- return --------------------------------- */
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <BaseContextProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </BaseContextProvider>
      </ThemeProvider>
      {/* portal provider */}
    </GestureHandlerRootView>
  );
}
