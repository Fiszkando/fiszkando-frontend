import { ScrollView, ImageBackground, Image, TextInput, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import TitleBanner from "../components/TitleBanner";
import AnswerItem from "../components/AnswerItem";

const { height, width } = Dimensions.get('window');
const backgroundImg = require('../assets/tlo.png');

const QuizScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>
                <TitleBanner title="quiz" />

                <View style={styles.container}>
                    <ScrollView style={styles.content}>
                        <TouchableOpacity style={styles.questionContainer} disabled>
                            <Text>
                                Some Question
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.answersContainer}>
                            <AnswerItem style={styles.answerItem} content="Answer A"></AnswerItem>
                            <AnswerItem style={styles.answerItem} content="Answer B"></AnswerItem>
                            <AnswerItem style={styles.answerItem} content="Answer C"></AnswerItem>
                            <AnswerItem style={styles.answerItem} content="Answer D"></AnswerItem>
                        </View>
                    </ScrollView>

                    <View style={styles.controlsContainer}>
                        <Text style={styles.progressText}>
                            1 of 40
                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{fontWeight: 'bold'}}>
                                next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default QuizScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    image: {
        flex: 1,
        height: height,
    },
    container: {
        marginTop: '40%',
        marginLeft: '10%',
        width: '80%',
        flexGrow: 1
    },
    content: {
        // flexGrow: 1
    },
    questionContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 15,
        marginBottom: 30,
    },
    answersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    answerItem: {
        width: '40%',
        marginLeft: '5%',
        marginRight: '5%',
    },

    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: 15,
    },
    progressText: {
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 33,
        padding: 10,
        minWidth: 80,
        alignItems: 'center',
    }
})