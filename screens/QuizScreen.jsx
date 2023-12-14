import { ScrollView, ImageBackground, Image, TextInput, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import TitleBanner from "../components/TitleBanner";

const { height, width } = Dimensions.get('window');
const backgroundImg = require('../assets/tlo.png');

const QuizScreen = () => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => { })
            .catch(error => {
                alert(error.message);
            })
    }

    const handleFinishQuiz = (quizId) => {
        navigation.navigate('Root', { screen: 'FinishQuiz', params: { quizId: quizId, quizName: quizName } });
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>

                <TitleBanner title="quiz" />

                

            </ImageBackground>
        </View>
    )
}
export default QuizScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        height: height,
    },
})