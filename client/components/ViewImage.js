import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { Dimensions } from 'react-native';
import { Image } from 'react-native';

// Get full screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ViewImage({route}) {

  const { base64, prediction } = route.params;
  const normalizedDescription = prediction.description.replace(/\s+/g, ' ');

  const handlePress = () => {
    const url = `https://stockx.com/search?s=${prediction.shoeName}`;
    Linking.openURL(url);
  }


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
        <Text style={styles.titleText}> {prediction.shoeName}</Text>
        <Text style={styles.subtitleText}>
          Confidence:{' '}
          {parseFloat((prediction.confidence * 100).toFixed(2))}%
        </Text>
        <Text style={styles.descriptionText}>{normalizedDescription}</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>View on StockX</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    flex: 0.5,
    width: screenWidth,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 30,
    borderRadius: 20,
  },
  textView: {
    flex: 0.5,
    padding: 20, // Added padding
    alignContent: 'center',
    backgroundColor: '#ff0000',
    borderRadius: 20,
    gap: 20, // Added gap between elements
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
  descriptionText: {
    fontSize: 14, // Slightly larger font
    fontWeight: 'normal', // Changed to normal for better readability of longer text
    color: 'white',
    textAlign: 'left', // Changed to left alignment
    marginBottom: 10, // Add some space at the bottom
  },
  button: {
    backgroundColor: 'green', // Example button background color
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white', // Example button text color
    fontSize: 16,
  },
});
