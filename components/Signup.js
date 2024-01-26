import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        // onChangeText={onChangeText}
        // value={text}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        // onChangeText={onChangeText}
        // value={text}
      />
      <Button title="Sign Up" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
