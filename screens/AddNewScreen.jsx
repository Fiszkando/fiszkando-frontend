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

const { height } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");
const plusIcon = require("../assets/plus.png");
const folderIcon = require("../assets/folder.png");

const ProfileScreen = () => {
  const [questionSetTitle, setQuestionSetTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ opacity: modalVisible ? 0.5 : 1 }}>
        {/* TODO: think about changing to SafeAreaView as the general container (adds padding for devices with notch) */}
        <ImageBackground
          source={backgroundImg}
          resizeMode="cover"
          style={styles.image}
        >
          <TouchableOpacity
            onPress={() => {}}
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
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Hello World!</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => {}}
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
            onPress={() => {}}
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
    </KeyboardAvoidingView>
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
    marginTop: 22,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
