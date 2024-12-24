import { Text } from '@/src/components/ui/text';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabOne() {
  return (
    <View className="flex-1">
      <View className="p-4">
        <Text className="font-semibold">Welcome Back, Name!</Text>
        <Link href="/chat">Test Button</Link>
      </View>
    </View>
  );
}
