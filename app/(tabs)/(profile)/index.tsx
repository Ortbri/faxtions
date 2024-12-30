import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text>Profile</Text>
      <Pressable
        onPress={() => router.navigate('/(tabs)/(profile)/settings')}
        style={{
          padding: 14,
          marginHorizontal: 24,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
      >
        <Text>Settings</Text>
      </Pressable>
    </ScrollView>
  );
}
