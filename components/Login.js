import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onChangeEmail(t) {
    setEmail(t);
  }

  function onChangePassword(t) {
    setPassword(t);
  }

  function handleLogin() {
    axios
      .post('http://localhost:8080/login', {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        navigation.navigate('Dashboard', {
          email: email,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={onChangePassword}
          value={password}
        />
        <Button title="Log In" onPress={handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('Signup')}
        />
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
