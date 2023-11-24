import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";

//for now questions are:
//answers: map (with keys 1-4)
//correctAnswerIndexes: array
//question: string

const { height } = Dimensions.get("window");

const CreatorStep = ({ id = -1, updateFunction, deleteFunction, type }) => {
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [answer1correct, setAnswer1Correct] = useState(false);
  const [answer2correct, setAnswer2Correct] = useState(false);
  const [answer3correct, setAnswer3Correct] = useState(false);
  const [answer4correct, setAnswer4Correct] = useState(false);

  const [discardModalVisible, setDiscardModalVisible] = useState(false);

  const questionMarkIcon = require("../assets/question-mark.png");
  const plusIcon = require("../assets/plus.png");

  function onUpdate({
    newQuestion,
    newAnswer1,
    newAnswer2,
    newAnswer3,
    newAnswer4,
    newAnswer1correct,
    newAnswer2correct,
    newAnswer3correct,
    newAnswer4correct,
  }) {
    const questionMap = new Map();
    questionMap.set("1", newAnswer1 != undefined ? newAnswer1 : answer1);
    questionMap.set("2", newAnswer2 != undefined ? newAnswer2 : answer2);
    questionMap.set("3", newAnswer3 != undefined ? newAnswer3 : answer3);
    questionMap.set("4", newAnswer4 != undefined ? newAnswer4 : answer4);
    const correctAnswers = [];
    if (newAnswer1correct != undefined ? newAnswer1correct : answer1correct) {
      correctAnswers.push(1);
    }
    if (newAnswer2correct != undefined ? newAnswer2correct : answer2correct) {
      correctAnswers.push(2);
    }
    if (newAnswer3correct != undefined ? newAnswer3correct : answer3correct) {
      correctAnswers.push(3);
    }
    if (newAnswer4correct != undefined ? newAnswer4correct : answer4correct) {
      correctAnswers.push(4);
    }

    updateFunction({
      id: id,
      question: newQuestion != undefined ? newQuestion : question,
      correctAnswerIndexes: correctAnswers,
      answers: questionMap,
    });
  }

  return (
    <View
      style={[
        styles.questionContainer,
        {
          opacity: discardModalVisible
            ? 0.4 //if modal visible apply reduced opacity
            : 1,
        },
      ]}
    >
      <View style={styles.questionIconBackground}>
        <Image source={questionMarkIcon}></Image>
      </View>
      <TouchableOpacity
        style={styles.containerCloseWrapper}
        onPress={() => {
          setDiscardModalVisible(true);
        }}
      >
        <Image
          source={plusIcon}
          style={{
            transform: "rotate(45deg)",
            width: 30,
            height: 30,
          }}
        ></Image>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={discardModalVisible}
        onRequestClose={() => {
          setDiscardModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setDiscardModalVisible(false)}
          >
            <TouchableOpacity style={styles.modalBackground} activeOpacity={1}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#2F93BE",
                  width: "90%",
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                Do you really want to delete this question? This operation{"\n"}
                <Text style={{ fontWeight: "bold" }}>cannot</Text> be undone.
              </Text>
              <View style={[{ flexDirection: "row", gap: 15 }]}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "red" }]}
                  onPress={() => {
                    deleteFunction(id);
                    setDiscardModalVisible(false);
                  }}
                >
                  <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setDiscardModalVisible(false)}
                >
                  <Text style={{ color: "white" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.inputGroup}>
        <Text style={styles.titleText}>Question</Text>
        <TextInput
          placeholderTextColor="white"
          placeholder="Question"
          value={question}
          // Add debounce
          //create def function!!!
          onChangeText={(newQuestion) => {
            setQuestion(newQuestion);
            onUpdate({ newQuestion: newQuestion });
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
              onUpdate({ newAnswer1: text });
            }}
            style={styles.input}
          />
          <Checkbox
            style={{ margin: 8 }}
            value={answer1correct}
            onValueChange={(value) => {
              setAnswer1Correct(value);
              onUpdate({ newAnswer1correct: value });
            }}
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
              onUpdate({ newAnswer2: text });
            }}
            style={styles.input}
          />
          <Checkbox
            style={{ margin: 8 }}
            value={answer2correct}
            onValueChange={(value) => {
              setAnswer2Correct(value);
              onUpdate({ newAnswer2correct: value });
            }}
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
              onUpdate({ newAnswer3: text });
            }}
            style={styles.input}
          />
          <Checkbox
            style={{ margin: 8 }}
            value={answer3correct}
            onValueChange={(value) => {
              setAnswer3Correct(value);
              onUpdate({ newAnswer3correct: value });
            }}
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
              onUpdate({ newAnswer4: text });
            }}
            style={styles.input}
          />
          <Checkbox
            style={{ margin: 8 }}
            value={answer4correct}
            onValueChange={(value) => {
              setAnswer4Correct(value);
              onUpdate({ newAnswer4correct: value });
            }}
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
  containerCloseWrapper: {
    position: "absolute",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    top: 16,
    right: 16,
    zIndex: 999,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    height: 0.4 * height,
    width: 0.4 * height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2F93BE",
  },
  modalIconBackground: {
    position: "absolute",
    top: -24,
    left: 24,
    backgroundColor: "#F5F5F5",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 20,
  },
  modalCloseWrapper: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  button: {
    backgroundColor: "#2F93BE",
    width: "30%",
    padding: 15,
    borderRadius: 33,
    alignItems: "center",
  },
});
