import {
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import TitleBanner from "../components/TitleBanner";
import AnswerItem from "../components/AnswerItem";

const { height, width } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");

const QuizScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { quizId, quizName, flashcards, ctr, questions, correctAnswers } =
    route.params;

  const [question, setQuestion] = useState("lorem ipsum");
  const [correctCtr, setCorrectCtr] = useState(correctAnswers);

  const [questionAnsweredFlag, setQuestionAnsweredFlag] = useState(false);
  const [answer1Selected, setAnswer1Selected] = useState(false);
  const [answer2Selected, setAnswer2Selected] = useState(false);
  const [answer3Selected, setAnswer3Selected] = useState(false);
  const [answer4Selected, setAnswer4Selected] = useState(false);

  const [answer1correct, setAnswer1correct] = useState();
  const [answer2correct, setAnswer2correct] = useState();
  const [answer3correct, setAnswer3correct] = useState();
  const [answer4correct, setAnswer4correct] = useState();

  const [answerCorrect, setAnswerCorrect] = useState();

  const handleFinishQuiz = () => {
    navigation.navigate("Root", {
      screen: "FinishQuiz",
      params: {
        quizId: quizId,
        quizName: quizName,
        correctAnswers: correctCtr,
        flashcards: flashcards,
      },
    });
  };

  const handleExit = () => {
    navigation.navigate("Home");
  };

  const handleNext = () => {
    if (!questionAnsweredFlag) {
      handleAnswer();
      setQuestionAnsweredFlag(true);
    } else {
      setAnswerCorrect(undefined);
      setQuestionAnsweredFlag(false);
      setAnswer1Selected(false);
      setAnswer2Selected(false);
      setAnswer3Selected(false);
      setAnswer4Selected(false);
      setAnswer1correct(undefined);
      setAnswer2correct(undefined);
      setAnswer3correct(undefined);
      setAnswer4correct(undefined);
      if (ctr + 1 == flashcards) {
        handleFinishQuiz();
      } else {
        navigation.navigate("Root", {
          screen: "Quiz",
          params: {
            quizId: quizId,
            quizName: quizName,
            flashcards: flashcards,
            questions: questions,
            ctr: ctr + 1,
            correctAnswers: correctCtr,
          },
        });
      }
    }
  };

  const handleAnswer = () => {
    if (questions[ctr].correctAnswerIndexes.includes(1)) {
      setAnswer1correct(true);
    } else {
      setAnswer1correct(false);
    }
    if (questions[ctr].correctAnswerIndexes.includes(2)) {
      setAnswer2correct(true);
    } else {
      setAnswer2correct(false);
    }
    if (questions[ctr].correctAnswerIndexes.includes(3)) {
      setAnswer3correct(true);
    } else {
      setAnswer3correct(false);
    }
    if (questions[ctr].correctAnswerIndexes.includes(4)) {
      setAnswer4correct(true);
    } else {
      setAnswer4correct(false);
    }

    const userAnswers = [];
    if (answer1Selected) {
      userAnswers.push(1);
    }
    if (answer2Selected) {
      userAnswers.push(2);
    }
    if (answer3Selected) {
      userAnswers.push(3);
    }
    if (answer4Selected) {
      userAnswers.push(4);
    }

    if (userAnswers.length === questions[ctr].correctAnswerIndexes.length) {
      for (let i = 0; i < userAnswers.length; ++i) {
        if (!questions[ctr].correctAnswerIndexes.includes(userAnswers[i])) {
          setAnswerCorrect(false);
          return;
        }
      }
    } else {
      setAnswerCorrect(false);
      return;
    }

    setCorrectCtr(correctCtr + 1);
    setAnswerCorrect(true);
  };

  const handleFlip = () => {
    setQuestion("tewst");
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.image}
      >
        {answerCorrect !== undefined && answerCorrect === true && (
          <View
            style={{
              top: "70%",
              alignItems: "center",
              width: "100%",
              position: "absolute",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "green",
              }}
            >
              CORRECT!
            </Text>
          </View>
        )}
        {answerCorrect !== undefined && answerCorrect === false && (
          <View
            style={{
              top: "70%",
              alignItems: "center",
              width: "100%",
              position: "absolute",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "red",
              }}
            >
              INCORRECT!
            </Text>
          </View>
        )}
        <TitleBanner title={ quizName } />
        <View style={styles.container}>
          <ScrollView style={styles.content}>
            <TouchableOpacity style={styles.questionContainer} disabled>
              <Text>{questions[ctr].question}</Text>
            </TouchableOpacity>

            <View style={styles.answersContainer}>
              <AnswerItem
                style={[
                  styles.answerItem,
                  answer1correct === undefined
                    ? !answer1Selected
                      ? {}
                      : { backgroundColor: "#2F93BE" }
                    : answer1correct
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" },
                ]}
                onPress={() => setAnswer1Selected(true)}
                content={questions[ctr].answers[1]}
              ></AnswerItem>
              <AnswerItem
                style={[
                  styles.answerItem,
                  answer2correct === undefined
                    ? !answer2Selected
                      ? {}
                      : { backgroundColor: "#2F93BE" }
                    : answer2correct
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" },
                ]}
                onPress={() => setAnswer2Selected(true)}
                content={questions[ctr].answers[2]}
              ></AnswerItem>
              <AnswerItem
                style={[
                  styles.answerItem,
                  answer3correct === undefined
                    ? !answer3Selected
                      ? {}
                      : { backgroundColor: "#2F93BE" }
                    : answer3correct
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" },
                ]}
                onPress={() => setAnswer3Selected(true)}
                content={questions[ctr].answers[3]}
              ></AnswerItem>
              <AnswerItem
                style={[
                  styles.answerItem,
                  answer4correct === undefined
                    ? !answer4Selected
                      ? {}
                      : { backgroundColor: "#2F93BE" }
                    : answer4correct
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" },
                ]}
                onPress={() => setAnswer4Selected(true)}
                content={questions[ctr].answers[4]}
              ></AnswerItem>
            </View>
          </ScrollView>

          <View style={styles.controlsContainer}>
            <Text style={styles.progressText}>
              {ctr + 1} of {flashcards}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNext()}
            >
              <Text style={{ fontWeight: "bold" }}>next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default QuizScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: height,
  },
  container: {
    marginTop: "40%",
    marginLeft: "10%",
    width: "80%",
    flexGrow: 1,
  },
  content: {
    // flexGrow: 1
  },
  questionContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
    marginBottom: 30,
  },
  answersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  answerItem: {
    width: "40%",
    marginLeft: "5%",
    marginRight: "5%",
  },

  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: 15,
  },
  progressText: {
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#2F93BE",
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
    fontWeight: "500",
    fontSize: 20,
    color: "white",
    padding: 100,
    top: 150,
    textAlign: "center",
  },
  rectangle: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    marginHorizontal: 70,
    marginVertical: 250,
    padding: 10,
    borderWidth: 10,
    borderColor: "white",
    borderRadius: 33,
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  textStyle: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
    top: 800,
    left: 10,
  },
});
