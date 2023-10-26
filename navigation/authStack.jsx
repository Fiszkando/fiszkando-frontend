import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Sign In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}