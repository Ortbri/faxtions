import React from 'react';
import { Button, Text, View } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

export default function UnistylesTest() {
  return (
    <View>
      <Text>unistylesTest</Text>
      <Button title="Click me" onPress={() => console.log(UnistylesRuntime.themeName)} />
    </View>
  );
}
