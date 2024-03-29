import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './components/Signup';
import Login from './components/Login';
import Verify from './components/Verify';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './components/Dashboard';
import Detect from './components/Detect';
import ViewImage from './components/ViewImage';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#181818',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ff0000', // Change the background color of the header here
          },
          headerTintColor: '#fff', // Change the text color of the header buttons (e.g., back button)
          headerTitleStyle: {
            fontWeight: 'bold', // You can customize the font weight, size, etc., of the header title
          },
        }}
      >
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Detect" component={Detect} />
        <Stack.Screen name="ViewImage" component={ViewImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
