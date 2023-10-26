import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, FlatList ,TouchableOpacity  } from 'react-native';


const backgroundImage = require('../assets/tlo.png');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showFavoriteList, setShowFavoriteList] = useState(true);
  const [showMyList, setShowMyList] = useState(true);
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
  const toggleFavoriteList = () => {
    setShowFavoriteList(!showFavoriteList);
  };

  const toggleMyList = () => {
    setShowMyList(!showMyList);
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'black',
    },
    header: {
      marginTop: 50,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },

    titleContainer: {
      backgroundColor: 'white',
      borderRadius: 40,
      margin: 20,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
    },
    whiteContainer: {
      backgroundColor: 'white',
      borderRadius: 30,
      margin: 5,
      padding: 25,
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
      textAlign: 'center',
      fontSize: 30,
    },
    lists: {
      flexDirection: 'column',
      
    },
    scrollableList: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      padding: 0,
      margin: 10,
      maxHeight: 250,
    },
    listTitle: {
      margin: 20,
      fontWeight: 'bold',
      fontSize: 26,
      color: 'white'
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      
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
        <TouchableOpacity onPress={toggleFavoriteList}>
          <Text style={styles.listTitle}>
            {showFavoriteList ? 'Favourite ▼' : 'Favourite ▲'}
          </Text>
        </TouchableOpacity>
        {showFavoriteList && (
          <FlatList
            data={favoriteItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.whiteContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2F93BE' }}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
        )}
        <TouchableOpacity onPress={toggleMyList}>
          <Text style={styles.listTitle}>
            {showMyList ? 'Mine ▼' : 'Mine ▲'}
          </Text>
        </TouchableOpacity>
        {showMyList && (
          <FlatList
            data={myItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.whiteContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2F93BE' }}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

export default HomeScreen;
