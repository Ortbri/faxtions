import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function TabOne() {
  return (
    <View>
      <Text>index</Text>
      <Link href="/chat">Chat</Link>
      <Link href="/settings">Settings</Link>
    </View>
  );
}
