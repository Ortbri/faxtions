// import { Text } from '@/src/components/ui/text';
import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Link href="/">{/* <Text>Go to home screen!</Text> */}</Link>
      </View>
    </View>
  );
}
