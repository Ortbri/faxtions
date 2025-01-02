import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  /* ---------------------------------- back ---------------------------------- */
  const backButton = () => {
    return (
      <Pressable onPress={() => router.back()}>
        <Ionicons name="close" size={24} color="black" />
      </Pressable>
    );
  };
  /* --------------------------------- return --------------------------------- */
  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{
          title: 'AI Chat',
          headerLeft: backButton,
        }}
      />
    </Stack>
  );
}
