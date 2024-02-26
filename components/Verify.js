import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function Verify({ route, navigation }) {
  const [code, setCode] = useState('');
  const { email } = route.params;

  function onChangeCode(t) {
    setCode(t);
  }

  function handleVerify() {
    axios
      .post('http://localhost:8080/verify', {
        email: email,
        code: code,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>Verify</Text>
        <Text>{email}</Text>
        <TextInput
          style={styles.input}
          placeholder="Verification Code"
          onChangeText={onChangeCode}
          value={code}
        />
        <Button title="Verify" onPress={handleVerify} />
      </View>
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
  subContainer: {
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
