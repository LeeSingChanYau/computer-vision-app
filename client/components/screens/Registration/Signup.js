import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeEmail(t) {
    setEmail(t);
  }

  function onChangePassword(t) {
    setPassword(t);
  }

  function handleSignUp() {
    axios
      .post("http://10.0.0.67:8080/signup", {
        email: email,
        password: password,
      })
      .then(function (response) {
        navigation.navigate("Verify", {
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
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("../../../assets/AJ1.png")}
            style={{ width: 200, height: 200 }}
          />
          <Text style={styles.text}>What are those?</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.text}>Signup</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={onChangeEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
          />
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            color={"rgb(255, 45, 85)"}
          />
          <Button
            title="Already have an account? Log In"
            onPress={() => navigation.navigate("Login")}
            color={"rgb(255, 45, 85)"}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 3,
    alignItems: "center",
  },
  text: {
    color: "rgb(255, 45, 85)",
  },
  logo: {
    flex: 3,
    marginBottom: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    backgroundColor: "white",
    padding: 10,
  },
});
