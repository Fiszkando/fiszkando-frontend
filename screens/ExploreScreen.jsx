import { ScrollView, ImageBackground, Image, TextInput, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, where, getDoc, doc} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native'; 
import TitleBanner from "../components/TitleBanner";
import QuizItem from "../components/QuizItem";

const { height, width } = Dimensions.get('window');
const backgroundImg = require('../assets/tlo.png');
const searchImg = require('../assets/search.png');

const ExploreScreen = () => {

  const [quizzes, setQuizzes] = useState([]);
  const [myFavoriteQuizzes, setmyFavoriteMyQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const userID = auth.currentUser.uid;
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch(error => {
      alert(error.message);
    })
  }

  const handleStartQuiz = () => {
    //todo go to quiz start
  }

  const handleSearch = () => {
    if(searchText.length == 0) {
      setLoading(true);
      var questionSets = collection(db, 'question-sets');
      onSnapshot(questionSets, (snapshot) => {
        let quizzesList = [];
        snapshot.docs.map((doc) => quizzesList.push({...doc.data(), id: doc.id}));
        setQuizzes(quizzesList);
        setLoading(false);
      })
    }
    else {
      setLoading(true);
      var questionSets = collection(db, 'question-sets');
      onSnapshot(questionSets, (snapshot) => {
        let quizzesList = [];
        snapshot.docs.map((doc) => {
          const quizData = { ...doc.data(), id: doc.id };

          const quizName = quizData.name.toLowerCase();
          const quizAuthor = quizData.authorId.toLowerCase();

          if (quizName.includes(searchText.toLowerCase()) || quizAuthor.includes(searchText.toLowerCase())) {
            quizzesList.push(quizData);
          }
        });
        setQuizzes(quizzesList);
        setLoading(false);
      })
    }
  }

  useEffect(() => {
    setLoading(true);
    
    const questionSetsQuery = query(collection(db, 'question-sets'));
    const favSetsQuery = query(collection(db, 'favorite-sets'), where('userId', '==', userID));
  
    
    const getQuizzes = onSnapshot(questionSetsQuery, (snapshot) => {
      let quizzesList = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setQuizzes(quizzesList);
    });
  
    
    const getFavorites = onSnapshot(favSetsQuery, (snapshot) => {
      const favSetsIds = snapshot.docs.map((doc) => doc.data().setId);
      setmyFavoriteMyQuizzes(favSetsIds);
    });
  
    Promise.all([getQuizzes, getFavorites]).then(() => {
      setLoading(false);
    });
  
    return () => {
      getQuizzes(); 
      getFavorites(); 
    };
  }, [userID]); 
  
  
  const renderItem = ({item}) => {
    const isFavorite = myFavoriteQuizzes.includes(item.id);
    //console.log(myFavoriteQuizzes)
    //console.log(isFavorite)
    return (
      <QuizItem 
      quiz={item} 
      onPress={() => handleStartQuiz(item.id)} 
      isFavorite={isFavorite}
    />
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>
        
        <TitleBanner title="Explore" />

        <View style={styles.searchBackground}>
          <TextInput style={styles.searchText} value={searchText} onChangeText={text => setSearchText(text)} placeholder='Search'></TextInput>
          <TouchableOpacity onPress={handleSearch} style={styles.searchImage}>
            <Image source={searchImg}></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.quizContainer}>
            <FlatList data={quizzes} renderItem={renderItem} keyExtractor={item => item.id}/>
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
      height: height,
    },
    searchBackground: {
      width: '80%',
      height: 0.06 * height,
      top: 0.18 * height,
      marginHorizontal: '10%',
      backgroundColor: 'white',
      borderRadius: 20,
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
      height: 0.64 * height,
      marginTop: 0.2 * height,
    }
})