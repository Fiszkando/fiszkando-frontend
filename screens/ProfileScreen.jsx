import { StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, ImageBackground, View, Image, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import {Dimensions} from 'react-native'; 

const { height, width } = Dimensions.get('window');
const backgroundImg = require('../assets/tlo.png');
const saveIcon = require('../assets/diskette.png');
const deleteIcon = require('../assets/bin.png');

const ProfileScreen = () => {
    const handleSignOut = () => {
      signOut(auth)
      .then(() => {})
      .catch(error => {
        alert(error.message);
      })
    }
  
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* TODO: think about changing to SafeAreaView as the general container (adds padding for devices with notch) */}
        <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>
          <View style={styles.titleBackground}>
            <View style={styles.innerTitleBackground}>
              <Text style={styles.titleText}> Profile </Text>
            </View>
          </View>
          <ScrollView style={styles.cardsContainer} contentContainerStyle={styles.cardsContainerContent}>
            <View style={styles.cardContainer}>
              <View style={styles.cardBackground}>
                <View style={styles.cardIconBackground}>
                  <Image source={saveIcon}></Image>
                </View>
                <View style={styles.inputGroup}>
                  <TextInput
                    placeholderTextColor='white'
                    placeholder="Email"
                    style={styles.input}
                  ></TextInput>
                  <TextInput
                    placeholderTextColor='white'
                    placeholder="Email"
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.cardBackground}>
                <View style={styles.cardIconBackground}>
                  <Image source={deleteIcon}></Image>
                </View>
                <View style={styles.inputGroup}>
                  <TextInput
                    placeholderTextColor='white'
                    placeholder="Email"
                    style={styles.input}
                  ></TextInput>
                  <TextInput
                    placeholderTextColor='white'
                    placeholder="Email"
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.cardBackground}>
                <View style={styles.cardIconBackground}>
                  <Image source={deleteIcon}></Image>
                </View>
                <View style={styles.inputGroup}>
                  <TextInput
                    placeholderTextColor='white'
                    placeholder="Email"
                    style={styles.input}
                  ></TextInput>
                  <TextInput
                    placeholderTextColor='white'
                    placeholder="Email"
                    style={styles.input}
                  ></TextInput>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
  export default ProfileScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      height: height,
    },
    input: {
      color: 'white',
      textShadowColor: 'white',
      backgroundColor: 'green',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop:5,
      borderBottomWidth: 1,
      borderColor: 'white',
    }, 
    inputGroup: {

    },
    titleBackground: {
      width: '80%',
      height: 0.1 * height,
      top: 0.12 * height,
      marginHorizontal: '10%',
      backgroundColor: 'white',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 20,
    },
    innerTitleBackground: {
      width: '95%',
      height: '85%',
      borderColor: '#908D8D',
      borderRadius: 24,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontFamily: 'Harlow-Solid-Italic',
      fontSize: 40,
    },
    cardsContainer: {
      marginTop: 0.15 * height,
      // backgroundColor: 'yellow',
    },
    cardsContainerContent: {
      // backgroundColor: 'red',
      height: 'auto',
    },
    cardContainer: {
      width: '100%',
      height: 200,
    },
    cardBackground: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      top: 0.04 * height,
      left: '10%',
      marginBottom: 0.06 * height,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 12,
    },
    cardIconBackground: {
      width: '16%',
      height: '34%',
      backgroundColor: 'white',
      borderRadius: 100,
      top: '-12%',
      left: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 20,
    },
})