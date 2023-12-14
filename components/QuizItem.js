import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { db,auth } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

const { height } = Dimensions.get('window');
const quizIco = require('../assets/laptop.png'); 
const starClickedIco = require('../assets/starClicked.png'); 
const starNotClickedIco = require('../assets/starNotClicked.png'); 

const QuizItem = ({ quiz, onPress, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoritePress = async () => {
    setFavorite(!favorite);
    const quizRef = doc(db, 'favorite-sets', quiz.id);
    
    if (!favorite) {
      // Dodaj do ulubionych
      await setDoc(quizRef, { setId: quiz.id, userId: auth.currentUser.uid });
    } else {
      // Usuń z ulubionych
      await deleteDoc(quizRef);
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.quizBackground}>
      <View style={styles.quizIconBackground}>
        <Image source={quizIco} style={styles.quizIcon} />
      </View>

      <TouchableOpacity onPress={handleFavoritePress} style={styles.starIconBackground}>
        <Image source={favorite ? starClickedIco : starNotClickedIco} style={styles.starIcon} />
      </TouchableOpacity>

      <Text style={styles.quizAuthor}>{quiz.authorId}</Text>
      
      <Text style={styles.quizTitle}>{quiz.name}</Text>

      
      <Text style={styles.quizDescription}>{quiz.category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quizBackground: {
    width: '80%',
      height: 0.18 * height,
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
  starIconBackground: {
    width: '16%',
      height: '34%',
      backgroundColor: 'white',
      borderRadius: 100,
      top: '-12%',
      right: '5%',
      justifyContent: 'center',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 20,
    position: 'absolute', // Pozycjonowanie absolutne
    
  },
  starIcon: {
    width: '80%', // Szerokość ikony gwiazdy
    height: '80%', // Wysokość ikony gwiazdy
    left: '10%',
  },
  
  
  quizAuthor: {
    fontStyle: 'italic',
    top: -40,
    textAlign: 'center',
    paddingRight: '5%',
    fontSize: 12,
  },
  quizTitle: {
    fontSize: 20,
    color: '#2F93BE',
    fontWeight: 'bold',
    top: -15,
    left: 30,
  },
  quizDescription: {
    top: -10,
    marginLeft: 50,
  }
});

export default QuizItem;
