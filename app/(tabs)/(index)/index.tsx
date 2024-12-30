import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';
import type React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

interface Item {
  id: string;
  title: string;
  description: string;
  created: Date;
}

const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
  const router = useRouter();
  return (
    <Pressable
      style={{
        padding: 24,
        borderBottomWidth: 1,
      }}
      onPress={() =>
        router.navigate({
          pathname: '/(tabs)/(index)/workout/[id]',
          params: { id: item.id },
        })
      }
    >
      <ThemedText style={{}} weight={800}>
        {item.title}
      </ThemedText>
      <ThemedText style={{ fontSize: 14 }} weight={300}>
        There was this cool ting that was happening
      </ThemedText>

      {/* <Text style={{ color: 'white' }}>{item.description}</Text> */}
      {/* <Text style={{ fontSize: 12, color: '#999' }}>{item.created.toLocaleDateString()}</Text> */}
    </Pressable>
  );
};

export default function Home() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {Array.from({ length: 10 }).map((_, index) => (
        <ItemComponent
          key={index.toString()}
          item={{
            id: index.toString(),
            title: 'Title 1',
            description: 'Description 1',
            created: new Date(),
          }}
        />
      ))}
    </ScrollView>
  );
}
