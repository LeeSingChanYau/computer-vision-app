import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import axios from 'axios';
import { Dimensions } from 'react-native';

// Get full screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Detect({ route, navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 1,
          base64: true,
          fixOrientation: true,
          exif: true,
        };
        const photo = await cameraRef.current.takePictureAsync(options);
        const formData = new FormData();
        formData.append('shoeImage', {
          name: 'photo.jpg', // Optionally, generate a unique name
          type: 'image/jpeg',
          uri: photo.uri,
        });

        const response = await axios.post(
          'http://10.0.0.67:3000/detect',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('prediction:', response.data.prediction);
        navigation.navigate('ViewImage', {
          base64: photo.base64,
          prediction: response.data.prediction,
        });
      } catch (err) {
        console.log('Failed to take picture:', err);
      }
    }
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

