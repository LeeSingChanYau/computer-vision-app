import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from 'react-native';
import { Image } from 'react-native';

// Get full screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ViewImage({route}) {

  const { base64, prediction } = route.params;


  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={{ uri: 'data:image/png;base64,' + base64 }}
          style={{ width: screenWidth, height: screenHeight }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.titleText}>Jordan {prediction[0] + 1}</Text>
        <Text style={styles.subtitleText}>Confidence: {prediction[1]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    flex: 0.75,
    width: screenWidth,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textView: {
    flex: 0.25,
    // justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#ff0000',
    borderRadius: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
