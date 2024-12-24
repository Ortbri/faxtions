import { ThemeToggle } from '@/components/ThemeToggle';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <View className="flex-1">
        <View className="p-4">
          <Text className="font-semibold dark:color-white">Welcome Back, Name!</Text>
          <Link href="/chat" className="dark:color-white">
            Test Button
          </Link>
          <ThemeToggle />
        </View>
      </View>
    </>
  );
}
