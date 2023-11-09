import { db, auth } from '../firebase';
import { collection, onSnapshot, query, where, getDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const backgroundImg = require('../assets/tlo.png');
const quizIco = require('../assets/laptop.png');
const starIco = require('../assets/star.png');
const keyIco = require('../assets/key.png');

const HomeScreen = () => {
  const userEmail = auth.currentUser?.email;
  const userName = userEmail ? userEmail.substring(0, userEmail.indexOf('@')) : '';
  const userID = auth.currentUser.uid;
  const navigation = useNavigation();
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [myFavoriteQuizzes, setmyFavoriteMyQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFavoriteList, setShowFavoriteList] = useState(true);
  const [showMyList, setShowMyList] = useState(true);

  const toggleFavoriteList = () => {
    setShowFavoriteList(!showFavoriteList);
  };

  const toggleMyList = () => {
    setShowMyList(!showMyList);
  };

  const handleStartQuiz = () => {
  }
  useEffect(() => {
    setLoading(true);
    var myQuestionSets = query(collection(db, 'question-sets'), where('authorId', '==', userID));

    onSnapshot(myQuestionSets, (snapshot) => {
      let myQuizzesList = [];
      snapshot.docs.map((doc) => myQuizzesList.push({ ...doc.data(), id: doc.id }));
      setMyQuizzes(myQuizzesList);

    })

    const favSetsQuery = query(collection(db, 'favorite-sets'), where('userId', '==', userID));

    const favSetsSnapshot = onSnapshot(favSetsQuery, async (snapshot) => {
      const favSetsDocs = snapshot.docs;

      const favSetsIds = favSetsDocs.map((doc) => doc.data().setId);


      const favQuizzesList = [];
      for (const setId of favSetsIds) {
        const docRef = doc(db, 'question-sets', setId);
        
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if (docSnap.exists()) {
          
          favQuizzesList.push({ ...docSnap.data(), id: docSnap.id });
        }
      }

      setmyFavoriteMyQuizzes(favQuizzesList);
    });

    setLoading(false);
  }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={handleStartQuiz} style={styles.quizBackground}>
        <View style={styles.quizIconBackground}>
          <Image source={quizIco} style={styles.quizIcon}></Image>
        </View>
        <Text style={styles.quizAuthor}>{item.authorId}</Text>
        <Text style={styles.quizTitle}>{item.name}</Text>
        <Text style={styles.quizDescription}>{item.category}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>

        <View style={styles.mainTitleBackground}>
          <Text style={styles.helloText}>Hello! </Text>
          <View style={styles.titleBackground}>
            <View style={styles.innerTitleBackground}>
              <Text style={styles.titleText}> {userName} </Text>
            </View>
          </View>
        </View>

        <View style={styles.mainQuizContainer}>
          <TouchableOpacity onPress={toggleFavoriteList}>
            <View style={styles.listNameContainer}>
              <Image source={starIco} style={styles.starIcon}></Image>
              <Text style={styles.listNameText}>
                {showFavoriteList ? 'Favorite ▼' : 'Favorite ▲'}
              </Text>
            </View>
          </TouchableOpacity>

          {showFavoriteList && (
            <View style={styles.quizContainer}>
              <FlatList data={myFavoriteQuizzes} renderItem={renderItem} keyExtractor={item => item.id} />
            </View>)}

          <TouchableOpacity onPress={toggleMyList}>
            <View style={styles.listNameContainer}>
              <Image source={keyIco} style={styles.starIcon}></Image>
              <Text style={styles.listNameText}>
                {showMyList ? 'Mine ▼' : 'Mine ▲'}
              </Text>
            </View>
          </TouchableOpacity>

          {showMyList && (
            <View style={styles.quizContainer}>
              <FlatList data={myQuizzes} renderItem={renderItem} keyExtractor={item => item.id} />
            </View>)}

        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: height,
  },
  mainTitleBackground: {
    height: 0.1 * height,
    top: 0.12 * height,
    justifyContent: 'center',
  },
  titleBackground: {
    width: '80%',

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
  helloText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 0.1 * width,
    color: 'white',
    left: '10%',
  },
  titleText: {
    fontFamily: 'Harlow-Solid-Italic',
    fontSize: 40,
  },
  listNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0.05 * width,
    marginTop: 0.05 * height,
  },
  listNameText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 0.02 * width,
    color: 'white',
    left: '10%',
  },
  mainQuizContainer: {
    width: '100%',
    height: 0.32 * height,
    marginTop: 0.1 * height,
  },
  quizContainer: {
    width: '100%',
    height: 0.42 * height,
    marginTop: 0.005 * height,
  },
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
    left: 50,
  }
})