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
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  query,
  collection,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import TitleBanner from "../components/TitleBanner";

const { height, width } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");

const StartQuizScreen = () => {
  const [flashcards, setFlashcards] = useState("4");
  const [repeats, setRepeats] = useState("1");
  const [mins, setMins] = useState("");
  const [maxFlashcards, setMaxFlashcards] = useState("4");
  const [questions, setQuestions] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { quizId, quizName } = route.params;

  useEffect(() => {
    const questionsQuery = query(
      collection(db, "question-sets", quizId, "questions")
    );
    const getQuestions = async () => {
      try {
        // setQuestions(await getDocs(questionsQuery));
        // const questionsLength = questions.size;

        const questionsFirebase = await getDocs(questionsQuery);
        const tempQuestionArray = [];
        // przykład wywołania do iteracji każdego elementu
        questionsFirebase.forEach((doc) => {
          tempQuestionArray.push(doc.data());
          console.log("Dane pytania:", doc.data());
          console.log(doc.data().type);
        });

        setQuestions(tempQuestionArray);
        setMaxFlashcards(tempQuestionArray.length);
        setFlashcards(tempQuestionArray.length.toString());
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };
    getQuestions();
  }, [quizId]);

  const handleExit = () => {
    navigation.navigate("Home");
  };

  const handleStart = () => {
    navigation.navigate("Root", {
      screen: "Quiz",
      params: {
        quizId: quizId,
        quizName: quizName,
        flashcards: Number.parseInt(flashcards),
        ctr: 0,
        questions: questions,
        correctAnswers: 0,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity
          onPress={handleExit}
          style={[
            styles.button,
            styles.buttonOutline,
            { position: "absolute", top: 40, left: 10, borderWidth: 0 },
          ]}
        >
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>

        <TitleBanner title={quizName} />

        <View style={styles.container}>
          <View style={styles.rectangle}>
            <Text style={styles.text}>
              Flashcards to use (max. {maxFlashcards})
            </Text>
            <TextInput
              style={styles.input}
              value={flashcards}
              onChangeText={(text) => setFlashcards(text)}
              keyboardType="numeric"
            />
            <Text style={styles.text}>Repeat quiz</Text>
            <TextInput
              style={styles.input}
              value={repeats}
              onChangeText={(text) => setRepeats(text)}
              keyboardType="numeric"
            />
            <Text style={styles.text}>Time in mins</Text>
            <TextInput
              style={styles.input}
              value={mins}
              onChangeText={(text) => setMins(text)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleStart}
          style={[
            styles.button,
            styles.buttonOutline,
            {
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 30,
              borderWidth: 0,
            },
          ]}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
export default StartQuizScreen;

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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  rectangle: {
    //width: '70%',
    height: 300,
    backgroundColor: "white",
    marginHorizontal: "10%",
    marginVertical: 20,
    padding: 10,
    borderWidth: 10,
    borderColor: "white",
    borderRadius: 33,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
});
