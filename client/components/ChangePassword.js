import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function ChangePassword({ route, navigation }) {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { email } = route.params;

  function onChangeCode(t) {
    setCode(t);
  }

  function onChangePassword(t) {
    setNewPassword(t);
  }

  function handleChangePassword() {
    axios
      .post('http://10.0.0.67:8080/changepassword', {
        email: email,
        password: newPassword,
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
        <Text style={styles.text}>Change Password</Text>
        <Text style={styles.text}>{email}</Text>
        <TextInput
          style={styles.input}
          placeholder="Verification Code"
          onChangeText={onChangeCode}
          value={code}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          onChangeText={onChangePassword}
          value={newPassword}
        />
        <Button
          title="Verify"
          onPress={handleChangePassword}
          color="rgb(255, 45, 85)"
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  text: {
    color: 'rgb(255, 45, 85)',
  },
});
