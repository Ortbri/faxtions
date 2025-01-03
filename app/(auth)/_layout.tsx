import useHaptics from '@/hooks/useHaptics';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import { Stack, router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export default function AuthLayout() {
  const { colors } = useTheme();
  const { lightHaptic } = useHaptics();
  /* ---------------------------------- back ---------------------------------- */

  /* --------------------------------- return --------------------------------- */
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: '',
          headerTransparent: true,
          headerTitle: () => (
            <Pressable
              onPressIn={lightHaptic}
              onPress={() => router.back()}
              style={{
                width: 36,
                height: 5,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 2.5,
                // marginTop: 8,
              }}
            />
          ),

          contentStyle: {
            backgroundColor: colors.card,
          },
        }}
      />
    </Stack>
  );
}
