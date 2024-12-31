import { Stack } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={
        {
          // title: 'Home',
        }
      }
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'AI Chat',
        }}
      />
    </Stack>
  );
}
