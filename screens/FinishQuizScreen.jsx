import { ScrollView, ImageBackground, Image, TextInput, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import TitleBanner from "../components/TitleBanner";

const { height, width } = Dimensions.get('window');
const backgroundImg = require('../assets/tlo.png');

const FinishQuizScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { quizId, quizName, correctAnswers, flashcards } = route.params;

    const handleExit = () => {
        navigation.navigate('Home');
    }

    const handleRate = () => {

    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>

                <TitleBanner title={quizName} />

                <Text style={styles.labelText}>Number of correct answers</Text>

                <View style={styles.rectangle}>
                    <Text style={styles.text}>{correctAnswers} / {flashcards}</Text>
                </View>


                <TouchableOpacity
                    onPress={handleExit}
                    style={[
                        styles.button,
                        styles.buttonOutline,
                        { position: "absolute", top: 800, left: 20, borderWidth: 0 },
                    ]}
                >
                    <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleRate}
                    style={[
                        styles.button,
                        styles.buttonOutline,
                        { position: "absolute", top: 800, right: 20, borderWidth: 0, backgroundColor: '#EDD787' },
                    ]}
                >
                    <Text style={styles.buttonText}>Rate us</Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    )
}
export default FinishQuizScreen

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
        height: 150,
        backgroundColor: 'white',
        marginHorizontal: 70,
        marginVertical: 80,
        padding: 10,
        borderWidth: 10,
        borderColor: 'white',
        borderRadius: 33,
    },
    text: {
        fontWeight: '500',
        fontSize: 60,
        color: 'black',
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 5,
    },
})