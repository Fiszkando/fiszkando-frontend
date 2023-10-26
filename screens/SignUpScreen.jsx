import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    'Harlow-Solid-Italic': require('../assets/fonts/HARLOWSI.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered in with email: ', user.email);
    })
    .catch(error => {
      alert(error.message);
    })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
    >
      <View onLayout={onLayoutRootView}
      style= {{
          backgroundColor: 'white',
          width: 240,
          height: 90,
          marginBottom: 30,
          padding: 10,
          borderRadius: 30,
        }
      }>
        <View
          style= {{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#908D8D',
            borderRadius: 20,
          }}>
          <Text
            style= {
              {fontFamily: 'Harlow-Solid-Italic',
               fontSize: 40}
            }>
            Fiszkando
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        >
        </TextInput>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        >
        </TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        >
        </TextInput>
        <TextInput
          placeholder="Repeat Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        >
        </TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer : {
    width: '80%'
  }, 
  input : {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop:5,
  }, 
  buttonContainer : {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  }, 
  button : {
    backgroundColor: '#9DC183',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  }, 
  buttonOutline : {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#9DC183',
    borderWidth: 1,
  }, 
  buttonText : {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText : {
    color: '#9DC183',
    fontWeight: '700',
    fontSize: 16,
  }, 
})