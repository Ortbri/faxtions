import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const backgroundView = () => {
    return (
      <BlurView
        intensity={24}
        tint="prominent"
        style={[
          {
            backgroundColor:
              colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
          },
          StyleSheet.absoluteFill,
        ]}
      />
    );
  };
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== 'ios'
          ? {}
          : {
              // headerLargeTitle: true,
              headerTransparent: true,

              // headerBlurEffect: 'prominent',
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                // NEW: Make the large title transparent to match the background.
                backgroundColor: colors.background,
              },
            }),
        headerBackground: backgroundView,
        // title: 'Home',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="workout/[id]"
        options={{
          title: 'Workout ID',
        }}
      />
    </Stack>
  );
}
