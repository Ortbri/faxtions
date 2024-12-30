import { ThemedText } from '@/components/ui/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import type React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

interface Item {
  id: string;
  title: string;
  description: string;
  created: Date;
}

const WorkoutPostItem = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        minHeight: 400,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          contentFit="cover"
          style={{
            // flex: 1,
            width: '100%',
            height: '100%',
            // backgroundColor: '#0553',
          }}
        />
      </View>
      <View
        style={{
          padding: 24,
        }}
      >
        {/* title */}
        <ThemedText>Testing</ThemedText>
        {/* description */}
        <ThemedText>this is the description of the post here</ThemedText>
      </View>
    </View>
  );
};

export default function Home() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        gap: 14,
        marginHorizontal: 8,
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <WorkoutPostItem key={index.toString()} />
      ))}
    </ScrollView>
  );
}
