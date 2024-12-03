import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function logWorkout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>logWorkout</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: rt.colorScheme === 'dark' ? 100 : 0,
    backgroundColor: theme.colors.backgroundColor,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}));
