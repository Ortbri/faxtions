import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Home() {
  return (
    <>
      <View className="flex-1">
        <View className="bg-backgroud p-4">
          <Text>this is text</Text>
          <Button variant={'default'} size={'lg'} className="rounded-3xl">
            <Text>Development</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
