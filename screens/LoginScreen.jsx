import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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