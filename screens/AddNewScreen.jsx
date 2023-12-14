import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  View,
  Image,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import CreatorStep from "../components/creatorStep";
import { auth } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

const { height } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");
const plusIcon = require("../assets/plus.png");
const folderIcon = require("../assets/folder.png");

const ProfileScreen = () => {
  //TODO: maybe use spinner in the future
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [title, setTitle] = useState("");
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [discardModalVisible, setDiscardModalVisible] = useState(false);
  const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);

  useEffect(() => {
    //TODO: maybe use spinner in the future
    setLoading(true);
    const categories = collection(db, "categories");
    onSnapshot(categories, (snapshot) => {
      const tempDoc = [];
      snapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setCategoriesList(
        tempDoc.map((el, idx) => {
          return { key: idx, value: el.name };
        })
      );
    });
    //TODO: maybe use spinner in the future
    setLoading(false);
  }, []);

  function handleDiscard() {
    setQuestions([]);
    setCategory("");
    setTitle("");
    setDiscardModalVisible(false);
  }

  function updateQuestion({
    id,
    question,
    answer,
    answers,
    correctAnswerIndexes,
    fileURL,
  }) {
    const updatedQuestions = questions.map((item) => {
      if (item.id === id) {
        if (item.type === "multichoice") {
          return {
            ...item,
            question: question,
            answers: answers,
            correctAnswerIndexes: correctAnswerIndexes,
          };
        } else if (item.type === "flashcard") {
          return {
            ...item,
            question: question,
            answer: answer,
          };
        } else if (item.type === "image" || item.type === "audio") {
          return {
            ...item,
            question: question,
            answers: answers,
            correctAnswerIndexes: correctAnswerIndexes,
            fileURL: fileURL,
          };
        } else {
          //TODO: maybe handle error
          return item;
        }
      } else {
        return item;
      }
    });
    setQuestions(updatedQuestions);
  }

  function deleteQuestion(id) {
    const updatedQuestions = questions.filter((item) => item.id !== id);
    setQuestions(updatedQuestions);
  }

  function addQuestion(type) {
    if (type === "multichoice") {
      questions.push({
        type: type,
        id: uuid.v4(),
        question: "",
        answers: {},
        correctAnswerIndexes: [],
      });
      setAddQuestionModalVisible(false);
    } else if (type === "flashcard") {
      questions.push({
        type: type,
        id: uuid.v4(),
        question: "",
        answer: "",
      });
      setAddQuestionModalVisible(false);
    } else if (type === "image" || type === "audio") {
      questions.push({
        type: type,
        id: uuid.v4(),
        question: "",
        answers: {},
        correctAnswerIndexes: [],
        fileURL: "",
      });
      setAddQuestionModalVisible(false);
    } else {
      //TODO: handle error
    }
  }

  async function handleSave() {
    try {
      const questionSetRef = await addDoc(collection(db, "question-sets"), {
        authorId: auth.currentUser.uid,
        category: category,
        name: title,
      });
      questions.map(async (quest) => {
        if (quest.type === "multichoice") {
          await addDoc(collection(questionSetRef, "questions"), {
            answers: Object.fromEntries(quest.answers),
            correctAnswerIndexes: quest.correctAnswerIndexes,
            question: quest.question,
            type: quest.type,
          });
        } else if (quest.type === "flashcard") {
          await addDoc(collection(questionSetRef, "questions"), {
            answer: quest.answer,
            question: quest.question,
            type: quest.type,
          });
        } else if (quest.type === "image" || quest.type === "audio") {
          const filename = quest.fileURL.split("/").pop();
          const pathOnFirebase = `question-sets/${questionSetRef.id}/${filename}`;

          const response = await fetch(quest.fileURL);
          const blob = await response.blob();
          const storageRef = ref(storage, pathOnFirebase);
          uploadBytes(storageRef, blob).then((snapshot) => {
            console.log("Uploaded a blob!");
          });
          await addDoc(collection(questionSetRef, "questions"), {
            answers: Object.fromEntries(quest.answers),
            correctAnswerIndexes: quest.correctAnswerIndexes,
            question: quest.question,
            type: quest.type,
            fileURL: pathOnFirebase,
          });
        } else {
          //handle unknown type
        }
      });
      Alert.alert("Successfully uploaded question set!");
      handleDiscard();
    } catch (e) {
      Alert.alert("Error adding document: ", e);
      console.error("Error adding document: ", e);
    }
  }

  const renderItem = ({ item }) => (
    <CreatorStep
      id={item.id}
      type={item.type}
      updateFunction={updateQuestion}
      deleteFunction={deleteQuestion}
    />
  );

  return (
    <View
      style={[
        styles.container,
        {
          opacity:
            discardModalVisible ||
            categoryModalVisible ||
            addQuestionModalVisible
              ? 0.4 //if modal visible apply reduced opacity
              : 1,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={[styles.image, { paddingTop: 50 }]}
      >
        <View style={styles.titleBackground}>
          <View style={styles.innerTitleBackground}>
            <TextInput
              style={styles.titleText}
              placeholder="Set title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            ></TextInput>
          </View>
        </View>
        <KeyboardAwareFlatList
          style={{
            width: "90%",
            height: 0.58 * height,
          }}
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          onPress={() => {
            setDiscardModalVisible(true);
          }}
          style={[
            styles.button,
            styles.buttonOutline,
            { position: "absolute", top: 60, left: 10, borderWidth: 0 },
          ]}
        >
          <Text style={styles.buttonText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSave()}
          style={[
            styles.button,
            styles.buttonOutline,
            { position: "absolute", top: 60, right: 10, borderWidth: 0 },
          ]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={categoryModalVisible}
            onRequestClose={() => {
              setCategoryModalVisible(!categoryModalVisible);
            }}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={() => setCategoryModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalBackground}
                activeOpacity={1}
              >
                <View style={styles.modalIconBackground}>
                  <Image source={folderIcon}></Image>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseWrapper}
                  onPress={() => {
                    setCategoryModalVisible(false);
                  }}
                >
                  <Image
                    source={plusIcon}
                    style={{
                      transform: "rotate(45deg)",
                      width: 20,
                      height: 20,
                    }}
                  ></Image>
                </TouchableOpacity>
                {category ? (
                  <View style={{ marginTop: 24, gap: 4 }}>
                    <Text
                      style={{
                        color: "#2F93BE",
                        fontSize: 24,
                        textAlign: "center",
                      }}
                    >
                      Selected category:
                    </Text>
                    <Text
                      style={{
                        color: "#2F93BE",
                        fontSize: 28,
                        fontWeight: "bold",
                        marginBottom: 16,
                        textAlign: "center",
                      }}
                    >
                      {category}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      marginTop: 24,
                      color: "#2F93BE",
                      fontSize: 28,
                      fontWeight: "bold",
                      marginBottom: 16,
                      textAlign: "center",
                    }}
                  >
                    {"Select category"}
                  </Text>
                )}
                <View style={{ width: "90%" }}>
                  <SelectList
                    setSelected={setCategory}
                    data={categoriesList}
                    save="value"
                    searchPlaceholder={"Search"}
                    maxHeight={0.18 * height}
                  />
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={discardModalVisible}
            onRequestClose={() => {
              setDiscardModalVisible(!discardModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <TouchableOpacity
                style={styles.modalContainer}
                onPress={() => setDiscardModalVisible(false)}
              >
                <TouchableOpacity
                  style={styles.modalBackground}
                  activeOpacity={1}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#2F93BE",
                      width: "90%",
                      marginBottom: 16,
                      textAlign: "center",
                    }}
                  >
                    Do you really want to discard this set? This operation{"\n"}
                    <Text style={{ fontWeight: "bold" }}>cannot</Text> be
                    undone.
                  </Text>
                  <View style={[{ flexDirection: "row", gap: 15 }]}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "red" }]}
                      onPress={() => handleDiscard()}
                    >
                      <Text style={{ color: "white" }}>Discard</Text>
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
          <Modal
            animationType="fade"
            transparent={true}
            visible={addQuestionModalVisible}
            onRequestClose={() => {
              setAddQuestionModalVisible(!addQuestionModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <TouchableOpacity
                style={styles.modalContainer}
                onPress={() => setAddQuestionModalVisible(false)}
              >
                <TouchableOpacity
                  style={styles.modalBackground}
                  activeOpacity={1}
                >
                  <TouchableOpacity
                    style={styles.modalCloseWrapper}
                    onPress={() => {
                      setAddQuestionModalVisible(false);
                    }}
                  >
                    <Image
                      source={plusIcon}
                      style={{
                        transform: "rotate(45deg)",
                        width: 20,
                        height: 20,
                      }}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { width: "80%" }]}
                    onPress={() => addQuestion("multichoice")}
                  >
                    <Text style={{ color: "white" }}>
                      Add multi-choice question
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { width: "80%" }]}
                    onPress={() => addQuestion("flashcard")}
                  >
                    <Text style={{ color: "white" }}>Add flashcard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { width: "80%" }]}
                    onPress={() => addQuestion("image")}
                  >
                    <Text style={{ color: "white" }}>
                      Add question with image
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { width: "80%" }]}
                    onPress={() => addQuestion("audio")}
                  >
                    <Text style={{ color: "white" }}>
                      Add question with audio
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          onPress={() => setCategoryModalVisible(true)}
          style={[
            styles.button,
            styles.buttonOutline,
            {
              position: "absolute",
              bottom: 20,
              left: 20,
              borderWidth: 0,
              width: "auto",
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              elevation: 20,
            },
          ]}
        >
          <Image source={folderIcon}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAddQuestionModalVisible(true)}
          style={[
            styles.button,
            styles.buttonOutline,
            {
              position: "absolute",
              bottom: 20,
              right: 20,
              borderWidth: 0,
              width: "auto",
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              elevation: 20,
            },
          ]}
        >
          <Image source={plusIcon}></Image>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: height,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
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
  inputGroup: {
    gap: 5,
    alignItems: "center",
  },
  titleBackground: {
    width: "80%",
    height: 0.1 * height,
    marginTop: 0.12 * height,
    marginHorizontal: "10%",
    backgroundColor: "white",
    borderRadius: 30,
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
  innerTitleBackground: {
    width: "95%",
    height: "85%",
    borderColor: "#908D8D",
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Harlow-Solid-Italic",
    fontSize: 40,
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
  /* MODAL */
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
    gap: 10,
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
});
