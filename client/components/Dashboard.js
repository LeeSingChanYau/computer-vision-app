import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Dashboard({ route, navigation }) {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Email: {email}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detect')}>
          <Text style={styles.text}>Detect Shoe</Text>
        </TouchableOpacity>
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
    gap: 20,
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
    color: 'white',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#ff0000', // Example button background color
    padding: 10,
    borderRadius: 20,
  },
});
