import { ImageBackground, Image, TextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const backgroundImg = require('../assets/tlo.png');
const searchImg = require('../assets/search.png');
const quizIco = require('../assets/laptop.png');

const ExploreScreen = () => {

  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch(error => {
      alert(error.message);
    })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>
        <View style={styles.titleBackground}>
          <View style={styles.innerTitleBackground}>
            <Text style={styles.titleText}>Explore</Text>
          </View>
        </View>

        <View style={styles.searchBackground}>
          <TextInput style={styles.searchText} placeholder='Search'></TextInput>
          <Image source={searchImg} style={styles.searchImage}></Image>
        </View>

        <View style={styles.quizContainer}>
            <View style={styles.quizBackground}>
              <View style={styles.quizIconBackground}>
                <Image source={quizIco} style={styles.quizIcon}></Image>
              </View>
              <Text style={styles.quizAuthor}>test@test.com</Text>
              <Text style={styles.quizTitle}>Python quiz</Text>
              <Text style={styles.quizDescription}>- 40 abcd questions{"\n"}- 30 minutes</Text>
            </View>
            
            <Text>{"\n"}{"\n"}</Text>

            <View style={styles.quizBackground}>
              <View style={styles.quizIconBackground}>
                <Image source={quizIco} style={styles.quizIcon}></Image>
              </View>
              <Text style={styles.quizAuthor}>test@test.com</Text>
              <Text style={styles.quizTitle}>Python quiz</Text>
              <Text style={styles.quizDescription}>- 40 abcd questions{"\n"}- 30 minutes</Text>
            </View>
            
            <Text>{"\n"}{"\n"}</Text>

            <View style={styles.quizBackground}>
              <View style={styles.quizIconBackground}>
                <Image source={quizIco} style={styles.quizIcon}></Image>
              </View>
              <Text style={styles.quizAuthor}>test@test.com</Text>
              <Text style={styles.quizTitle}>Python quiz</Text>
              <Text style={styles.quizDescription}>- 40 abcd questions{"\n"}- 30 minutes</Text>
            </View>
        </View>

      </ImageBackground>
    </View>
  )
}
export default ExploreScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    titleBackground: {
      width: '80%',
      height: '10%',
      backgroundColor: 'white',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      top: '15%',
      left: '10%',
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
      // odkomentowac potem
      fontFamily: 'Harlow-Solid-Italic',
      fontSize: 40,
    },
    searchBackground: {
      width: '80%',
      height: '6%',
      backgroundColor: 'white',
      borderRadius: 20,
      top: '40%',
      left: '5%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 20,
    },
    searchText: {
      fontSize: 20,
      left: '30%',
    },
    searchImage: {
      top: '3%',
      right: '30%',
    },
    quizContainer: {
      width: '100%',
      height: '100%',
      top: '20%',
    },
    quizBackground: {
      width: '80%',
      height: '18%',
      backgroundColor: 'white',
      borderRadius: 20,
      top: '8%',
      left: '10%',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 20,
    },
    quizIconBackground: {
      width: '16%',
      height: '34%',
      backgroundColor: 'white',
      borderRadius: 100,
      top: '-12%',
      left: '5%',
      justifyContent: 'center',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 20,
    },
    quizIcon: {
      left: '20%',
    },
    quizAuthor: {
      fontStyle: 'italic',
      top: -40,
      left: 220,
    },
    quizTitle: {
      fontSize: 20,
      color: '#2F93BE',
      fontWeight: 'bold',
      top: -30,
      left: 30,
    },
    quizDescription: {
      top: -20,
      left: 50,
    }
})