import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'red',
          headerTransparent: true,
          headerLargeStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerLargeTitle: true,
        }}
      />
    </Stack>
  );
}
