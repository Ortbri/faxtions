import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabOne() {
  return (
    <View className="flex-1 items-center justify-center bg-red-200">
      <Link href="/chat">Chat</Link>
      <Link href="/settings">Settings</Link>
    </View>
  );
}
