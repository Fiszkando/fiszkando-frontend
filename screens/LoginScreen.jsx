import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';

SplashScreen.preventAutoHideAsync();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Harlow-Solid-Italic': require('../assets/fonts/HARLOWSI.ttf'),
  });

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(async userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with email: ', user.email);

      await SecureStore.setItemAsync('email', email);
      await SecureStore.setItemAsync('password', password);
      console.log('Email and password saved in SecureStore')
    })
    .catch(error => {
      alert(error.message);
    })
  }

  const onLayoutRootView = useCallback(async () => {
    let ssEmail = await SecureStore.getItemAsync('email');
    let ssPassword = await SecureStore.getItemAsync('password');

    if(ssEmail && ssPassword) {
        signInWithEmailAndPassword(auth, ssEmail, ssPassword)
        .then(userCredentials => {
          console.log('Logged in with email: ', userCredentials.user.email);
        })
        .catch(() => {
          console.log('Failed login with secure stored credentials', ssEmail);
        })
    }

    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
    >
      <View style={styles.logo}  onLayout={onLayoutRootView}>
        <View style={styles.logoInset}>
          <Text
            style= {{
            fontFamily: 'Harlow-Solid-Italic',
            fontSize: 40
          }}>
            Fiszkando
          </Text>
        </View>
      </View>

      <View style={styles.formContainer}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        placeholderTextColor='white'
      >
      </TextInput>
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        placeholderTextColor='white'
        secureTextEntry
      >
      </TextInput>

      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.button, styles.butonSubmit]}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.buttonLabel}>
          Forgot your password?
        </Text>
      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.button, styles.butonSubmit]}
      >
        <Image style={{width: 20, height: 20}} source={require('../assets/google-logo.png')}/>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.buttonLabel}>
          You don't have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {navigation.replace('SignUp')}}
          style={[
            styles.button, {
              minWidth: 120
            }
          ]}
        >
          <Text style={styles.buttonText}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const blue = '#2F93BE'

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: blue
  },

  logo: {
    marginTop: 100,
    marginBottom: 80,
    backgroundColor: 'white',
    borderRadius: 30,
    width: '70%',
    height: 90,
    padding: 10,
  },
  logoInset: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    //margin: 12,
    //padding: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    flexGrow: 1,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#00000000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    lineHeight: 2,
  },
  button : {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  }, 
  buttonText : {
    color: blue,
    fontWeight: '700',
    fontSize: 16,
  },
  butonSubmit: {
    maxWidth: '70%',
    minWidth: 200,
  },
  buttonLabel: {
    color: 'white',
    marginBottom: 5,
  },

  bottomContainer: {
    alignItems: 'center'
  },
  buttonSignUp: {
    minWidth: 100,
  },
})