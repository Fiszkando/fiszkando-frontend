import { db, auth } from '../firebase';
import { collection, onSnapshot, query, where, getDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import TitleBanner from "../components/TitleBanner";
import QuizItem from "../components/QuizItem";


const { height, width } = Dimensions.get('window');
const backgroundImg = require('../assets/tlo.png');
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

  const handleStartQuiz = (id, name) => {
    navigation.navigate('Root', { screen: 'StartQuiz', params: { quizId: id, quizName: name } });
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
        //console.log(docSnap);
        if (docSnap.exists()) {

          favQuizzesList.push({ ...docSnap.data(), id: docSnap.id });
        }
      }

      setmyFavoriteMyQuizzes(favQuizzesList);
    });

    setLoading(false);
  }, [])

  const renderItem = ({ item }) => {
    const isFavorite = myFavoriteQuizzes.some(favQuiz => favQuiz.id === item.id)
    return (
      <QuizItem
        quiz={item}
        onPress={() => handleStartQuiz(item.id, item.name)}
        isFavorite={isFavorite}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>


        <Text style={styles.helloText}>Hello! </Text>
        <TitleBanner title={userName} />


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
  helloText: {
    top: 0.12 * height,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 0.1 * width,
    color: 'white',
    left: '10%',
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
  }
})