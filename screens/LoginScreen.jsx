import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with email: ', user.email);
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
      <View style={styles.logo}>
        <View style={styles.logoInset}>
          <Text>Fiszkando</Text>
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
          onPress={navigation.replace('SignUp')}
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
    borderRadius: 33,
    width: '70%',
  },
  logoInset: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    margin: 12,
    padding: 20,
    alignItems: 'center'
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