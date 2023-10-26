import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      updateProfile(user, {
        displayName: name,
      }).catch(err => console.log(err))
    })
    .catch(error => {
      alert(error.message);
    })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View onLayout={onLayoutRootView}
      style= {styles.logoOutside}>
        <View
          style= {styles.logoInside}>
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
          placeholderTextColor='white'
          placeholder="Username"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        >
        </TextInput>
        <TextInput
          placeholderTextColor='white'
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        >
        </TextInput>
        <TextInput
          placeholderTextColor='white'
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        >
        </TextInput>
        <TextInput
          placeholderTextColor='white'
          placeholder="Repeat Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
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
      <View style={styles.loginButtonContainer}>
          <Text
            style= {
              {fontSize: 14,
               color: '#FFF'}
            }>
            Already have an account?
          </Text>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.logInButton}
        >
          <Text style={styles.buttonOutlineText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2F93BE',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoOutside: {
    backgroundColor: 'white',
    width: 240,
    height: 90,
    marginBottom: 30,
    padding: 10,
    borderRadius: 30,
  },
  logoInside: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#908D8D',
    borderRadius: 20,
  },
  inputContainer : {
    width: '70%'
  }, 
  input : {
    color: 'white',
    textShadowColor: 'white',
    backgroundColor: '#2F93BE',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop:5,
    borderBottomWidth: 1,
    borderColor: 'white',
  }, 
  buttonContainer : {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  }, 
  button : {
    backgroundColor: '#2F93BE',
    width: '100%',
    padding: 15,
    borderRadius: 33,
    alignItems: 'center',
  }, 
  buttonOutline : {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#2F93BE',
    borderWidth: 1,
  }, 
  buttonText : {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText : {
    color: '#2F93BE',
    fontWeight: '700',
    fontSize: 16,
  }, 
  loginButtonContainer: {
    alignItems: 'center',
    width: '70%',
    marginTop: 120,
  },
  logInButton : {
    backgroundColor: '#FFF',
    width: '65%',
    padding: 15,
    borderRadius: 33,
    alignItems: 'center',
    marginTop: 5,
  }, 
})