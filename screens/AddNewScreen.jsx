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
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");
const plusIcon = require("../assets/plus.png");
const folderIcon = require("../assets/folder.png");

const ProfileScreen = () => {
  const [questionSetTitle, setQuestionSetTitle] = useState("");
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [discardModalVisible, setDiscardModalVisible] = useState(false);
  const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);

  function handleDiscard() {}

  function handleSave() {}

  return (
    <SafeAreaView
      style={[styles.container, { opacity: folderModalVisible ? 0.5 : 1 }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.image}
      >
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
          onPress={() => {}}
          style={[
            styles.button,
            styles.buttonOutline,
            { position: "absolute", top: 20, right: 10, borderWidth: 0 },
          ]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <View style={styles.titleBackground}>
          <View style={styles.innerTitleBackground}>
            <TextInput
              style={styles.titleText}
              placeholder="Name"
              value={questionSetTitle}
              onChangeText={setQuestionSetTitle}
            ></TextInput>
          </View>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={folderModalVisible}
            onRequestClose={() => {
              setFolderModalVisible(!folderModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <TouchableOpacity
                style={styles.modalContainer}
                onPress={() => setFolderModalVisible(false)}
              >
                <TouchableOpacity
                  style={{
                    height: 300,
                    width: 300,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                  activeOpacity={1}
                >
                  <Text>Modal Content Folder...</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
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
                  style={{
                    height: 300,
                    width: 300,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                  activeOpacity={1}
                >
                  <Text>Modal Content Discard...</Text>
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
                  style={{
                    height: 300,
                    width: 300,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                  activeOpacity={1}
                >
                  <Text>Modal Content Add Question...</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          onPress={() => setFolderModalVisible(true)}
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
    position: "absolute",
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
    top: 0.12 * height,
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
});
