import { ScrollView, ImageBackground, Image, TextInput, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import TitleBanner from "../components/TitleBanner";

const { height, width } = Dimensions.get('window');
const backgroundImg = require('../assets/tlo.png');

const QuizScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { quizId, quizName, flashcards, ctr } = route.params;

    const [question, setQuestion] = useState('lorem ipsum');
    const [correctCtr, setCorrectCtr] = useState('0');

    const handleFinishQuiz = () => {
        navigation.navigate('Root', { screen: 'FinishQuiz', params: { quizId: quizId, quizName: quizName, correctAnswers: correctCtr, flashcards: flashcards } });
    }

    const handleExit = () => {
        navigation.navigate('Home');
    }

    const handleNext = () => {
        if (ctr == flashcards) {
            handleFinishQuiz();
        } else {
            navigation.navigate('Root', { screen: 'Quiz', params: { quizId: quizId, quizName: quizName, flashcards: flashcards, ctr: ctr + 1 } })
        }
    }

    const handleFlip = () => {
        setQuestion("tewst");
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>

                <TitleBanner title={quizName} />

                <TouchableOpacity onPress={handleFlip}>
                <View style={styles.rectangle}>
                    <Text style={styles.text}>{question}</Text>
                </View>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={handleExit}
                    style={[
                        styles.button,
                        styles.buttonOutline,
                        { position: "absolute", top: 30, left: 20, borderWidth: 0 },
                    ]}
                >
                    <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity>

                <Text style={styles.textStyle}>{ ctr }/{ flashcards }</Text>


                <TouchableOpacity
                    onPress={handleNext}
                    style={[
                        styles.button,
                        styles.buttonOutline,
                        { position: "absolute", top: 800, right: 20, borderWidth: 0 },
                    ]}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

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
    button: {
        backgroundColor: "#2F93BE",
        width: "30%",
        padding: 15,
        borderRadius: 33,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#2F93BE",
        borderWidth: 1,
    },
    buttonText: {
        color: "black",
        fontWeight: "700",
        fontSize: 16,
    },
    labelText: {
        fontWeight: '500',
        fontSize: 20,
        color: 'white',
        padding: 100,
        top: 150,
        textAlign: 'center'
    },
    rectangle: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        marginHorizontal: 70,
        marginVertical: 250,
        padding: 10,
        borderWidth: 10,
        borderColor: 'white',
        borderRadius: 33,
    },
    text: {
        fontWeight: '500',
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 5,
    },
    textStyle: {
        fontWeight: '500',
        fontSize: 20,
        color: 'black',
        top: 800,
        left: 10,
    }
})