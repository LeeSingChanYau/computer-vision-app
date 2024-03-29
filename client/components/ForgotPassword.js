import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onChangeEmail(t) {
    setEmail(t);
  }

  function onChangePassword(t) {
    setPassword(t);
  }

  function handleResetPassword() {
    axios
      .post('http://10.0.0.67:8080/forgotpassword', {
        email: email,
      })
      .then(function (response) {
        console.log(response);
        navigation.navigate('ChangePassword', {
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
      <View style={styles.logo}>
        <Image
          source={require('../assets/AJ1.png')}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.text}>What are those?</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Reset Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Button
          title="Reset"
          onPress={handleResetPassword}
          color={'rgb(255, 45, 85)'}
        />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('Signup')}
          color={'rgb(255, 45, 85)'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 3,
    alignItems: 'center',
  },
  logo: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgb(255, 45, 85)',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    padding: 10,
  },
});
