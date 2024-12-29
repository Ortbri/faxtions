import type React from 'react';
import { ScrollView, Text, View } from 'react-native';

interface Item {
  id: string;
  title: string;
  description: string;
  created: Date;
}

const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <View
      style={{
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text style={{ color: '#666' }}>{item.description}</Text>
      <Text style={{ fontSize: 12, color: '#999' }}>{item.created.toLocaleDateString()}</Text>
    </View>
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
