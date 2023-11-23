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
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import CreatorStep from "../components/creatorStep";

const { height } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");
const plusIcon = require("../assets/plus.png");
const folderIcon = require("../assets/folder.png");

const ProfileScreen = () => {
  //TODO: maybe use spinner in the future
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const questionsTemp = [
    { id: "testoweId", data: "testoweData" },
    { id: "testoweId2", data: "testoweData2" },
    { id: "testoweId3", data: "testoweData3" },
    { id: "testoweId4", data: "testoweData4" },
  ];
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

  function handleSave() {
    console.log("save clicked");
  }

  const renderItem = ({ item }) => (
    <CreatorStep id={item.id} data={item.data} />
  );

  return (
    <SafeAreaView
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
        style={styles.image}
      >
        <View style={styles.titleBackground}>
          <View style={styles.innerTitleBackground}>
            <TextInput
              style={styles.titleText}
              placeholder=" Enter name"
              value={title}
              onChangeText={(text) => setTitle(text)}
            ></TextInput>
          </View>
        </View>
        <FlatList
          data={questionsTemp}
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
            { position: "absolute", top: 20, left: 10, borderWidth: 0 },
          ]}
        >
          <Text style={styles.buttonText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSave()}
          style={[
            styles.button,
            styles.buttonOutline,
            { position: "absolute", top: 20, right: 10, borderWidth: 0 },
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
                  <Text>Modal Content Add Question...</Text>
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
    </SafeAreaView>
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
    backgroundColor: "white",
    borderRadius: 20,
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
