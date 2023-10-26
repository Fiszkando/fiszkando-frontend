import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';


const backgroundImage = require('../assets/tlo.png');

const HomeScreen = () => {
  const navigation = useNavigation();

  const favoriteItems = [
    { name: "QUIZ 1", description: "40 abcd questions \n 30 minutes" },
    { name: "QUIZ 2", description: "40 abcd questions \n 30 minutes" },
    { name: "QUIZ 3", description: "40 abcd questions \n 30 minutes" },
  ];

  const myItems = [
    { name: "QUIZ 1", description: "40 abcd questions \n 30 minutes" },
    { name: "QUIZ 2", description: "40 abcd questions \n 30 minutes" },
    { name: "QUIZ 3", description: "40 abcd questions \n 30 minutes" },
    { name: "QUIZ 4", description: "40 abcd questions \n 30 minutes" },
    { name: "QUIZ 5", description: "40 abcd questions \n 30 minutes" },
  ];

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'black',
    },
    header: {
      marginTop: 50,
      backgroundColor: 'transparent',
      borderRadius: 10,
      padding: 0,
      textAlign: 'center',
    },

    titleContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 40,
      margin: 30,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
    },
    whiteContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 10,
      margin: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    blackText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 30,
    },
    lists: {
      flexDirection: 'column',
      marginTop: 5,
    },
    scrollableList: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      padding: 20,
      margin: 10,
      maxHeight: 280,
    },
    listTitle: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 26,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 1.5,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.blackText}>{auth.currentUser?.email}</Text>
        </View>
      </View>
      <View style={styles.lists}>
      
        <ScrollView contentContainerStyle={styles.scrollableList}>
        <Text style={styles.listTitle}>Favourite</Text>
          {favoriteItems.map((item, index) => (
            <View key={index} style={styles.whiteContainer}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.scrollableList}>
          <Text style={styles.listTitle}>Mine</Text>
          {myItems.map((item, index) => (
            <View key={index} style={styles.whiteContainer}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default HomeScreen;
