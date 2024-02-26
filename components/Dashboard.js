import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

export default function Dashboard({ route, navigation }) {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>Email: {email}</Text>
        <Button
          title="Detect Shoe"
          onPress={() => navigation.navigate('Detect')}
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
});
