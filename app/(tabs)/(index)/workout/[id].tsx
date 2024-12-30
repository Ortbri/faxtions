import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function WorkoutId() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>WorkoutId = {id}</Text>
    </View>
  );
}
