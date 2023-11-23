import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const quizIco = require('../assets/laptop.png'); 


const QuizItem = ({ quiz, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.quizBackground}>
      <View style={styles.quizIconBackground}>
        <Image source={quizIco} style={styles.quizIcon} />
      </View>
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
  quizAuthor: {
    fontStyle: 'italic',
    top: -40,
    textAlign: 'right',
    paddingRight: '5%',
    fontSize: 12,
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
    marginLeft: 50,
  }
});

export default QuizItem;
