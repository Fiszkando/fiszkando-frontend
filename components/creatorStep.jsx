import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import Checkbox from "expo-checkbox";

//for now questions are:
//answers: map (with keys 1-4)
//correctAnswerIndexes: array
//question: string

const CreatorStep = ({ id = -1, data }) => {
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [answer1correct, setAnswer1Correct] = useState(false);
  const [answer2correct, setAnswer2Correct] = useState(false);
  const [answer3correct, setAnswer3Correct] = useState(false);
  const [answer4correct, setAnswer4Correct] = useState(false);

  const questionMarkIcon = require("../assets/question-mark.png");

  return (
    <View style={styles.questionContainer}>
      <Text
        style={{ color: "red", fontSize: 20, position: "absolute", top: 30 }}
      >
        id: {id}
      </Text>
      <View style={styles.questionIconBackground}>
        <Image source={questionMarkIcon}></Image>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.titleText}>Question</Text>
        <TextInput
          placeholderTextColor="white"
          placeholder="Question"
          value={question}
          onChangeText={(text) => {
            setQuestion(text);
          }}
          style={styles.input}
        ></TextInput>
        <Text style={styles.titleText}>Answers</Text>
        <View style={styles.inputRow}>
          <TextInput
            placeholderTextColor="white"
            placeholder="Answer 1"
            value={answer1}
            onChangeText={(text) => {
              setAnswer1(text);
            }}
            style={styles.input}
          />
          <Checkbox
            style={{ margin: 8 }}
            value={answer1correct}
            onValueChange={setAnswer1Correct}
            color={answer1correct ? "#2F93BE" : undefined}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            placeholderTextColor="white"
            placeholder="Answer 2"
            value={answer2}
            onChangeText={(text) => {
              setAnswer2(text);
            }}
            style={styles.input}
          />
          <Checkbox
            style={{ margin: 8 }}
            value={answer2correct}
            onValueChange={setAnswer2Correct}
            color={answer2correct ? "#2F93BE" : undefined}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            placeholderTextColor="white"
            placeholder="Answer 3"
            value={answer3}
            onChangeText={(text) => {
              setAnswer3(text);
            }}
            style={styles.input}
          />
          <Checkbox
            style={{ margin: 8 }}
            value={answer3correct}
            onValueChange={setAnswer3Correct}
            color={answer3correct ? "#2F93BE" : undefined}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            placeholderTextColor="white"
            placeholder="Answer 4"
            value={answer4}
            onChangeText={(text) => {
              setAnswer4(text);
            }}
            style={styles.input}
          />
          <Checkbox
            style={{ margin: 8 }}
            value={answer4correct}
            onValueChange={setAnswer4Correct}
            color={answer4correct ? "#2F93BE" : undefined}
          />
        </View>
      </View>
    </View>
  );
};

export default CreatorStep;

const styles = StyleSheet.create({
  questionContainer: {
    backgroundColor: "white",
    marginTop: 32,
    paddingVertical: 20,
    borderRadius: 20,
    width: "100%",
  },
  inputGroup: {
    width: "100%",
    gap: 10,
    alignItems: "center",
  },
  input: {
    width: "80%",
    color: "white",
    textShadowColor: "white",
    backgroundColor: "#2F93BE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  questionIconBackground: {
    width: 50,
    height: 50,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 50,
    top: -24,
    left: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 20,
  },
  inputRow: {
    width: "80%",
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
});
