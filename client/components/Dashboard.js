import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

export default function Dashboard({ route, navigation }) {
  // const { email } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Email: {email}</Text>
        <Button
          title="Detect Shoe"
          onPress={() => navigation.navigate('Detect')}
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
    flex: 1,
    alignItems: 'center',
    margin: 50,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: 'rgb(255, 45, 85)',
  },
});
