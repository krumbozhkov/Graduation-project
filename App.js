import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//* Components 
import Home from './src/components/Home';
import Help from './src/components/Help';
import MenuElement from './src/components/Menu';
import Login from './src/components/Authentication/Login';
import ListItems from './src/components/MyItems/ItemList';
import Register from './src/components/Authentication/Register';
import EditUserScene from './src/components/Authentication/EditUser';
import ScannerView from './src/components/ScannerComponents/ScannerView';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function MenuStackScreen() {
    return (
      <Stack.Navigator initialRouteName='MenuScene'>
        <Stack.Screen options={{ headerShown: false }} name="MenuScene">{props => <MenuElement {...props} />}</Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="MyItems" component={ListItems} />
        <Stack.Screen options={{ headerShown: false }} name="Scanner" component={ScannerView} />
        <Stack.Screen options={{ headerShown: false }} name="EditUser" component={EditUserScene} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false, tabBarIcon: (props) => <Ionicons name="ios-home-outline" size={24} color='black' /> }}
          name='Home'>{props => <Home {...props} />}</Tab.Screen>

        <Tab.Screen
          options={{ headerShown: false, tabBarIcon: (props) => <FontAwesome name="question-circle" size={24} color="black" /> }}
          name='Help'>{props => <Help {...props} />}</Tab.Screen>

        <Tab.Screen
          options={{ lazy: false, headerShown: false, tabBarIcon: (props) => <Ionicons name="menu-outline" size={24} color='black' /> }}
          name='Menu'>{props => <MenuStackScreen {...props} />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>);
}











// import { StatusBar } from 'expo-status-bar';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Scanner from './src/components/barcodeScanner.jsx';
// import LoginScreen from './screens/LoginScreen.js';
// import HomeScreen from './screens/HomeScreen.js';
// import BarcodeScreen from './screens/BarcodeScreen.js';
// import RegisterScreen from './screens/RegisterScreen.js'

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen options = {{headerShown: false}}  name="Register" component={RegisterScreen} />
//         <Stack.Screen options = {{headerShown: false}}  name="Login" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Barcode" component={BarcodeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });