import { TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const KeyboardAvoidingView = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal: theme.gap(2),
    paddingTop: rt.insets.top,
    borderRadius: theme.br.lg,
    transform: [
      {
        translateY: rt.insets.ime * -1,
      },
    ],
  },
  input: {
    width: '100%',
  },
}));

export default KeyboardAvoidingView;
