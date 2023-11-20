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
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Dimensions } from "react-native";
import { updatePassword, updateProfile, deleteUser } from "firebase/auth";

const { height } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");
const saveIcon = require("../assets/diskette.png");
const deleteIcon = require("../assets/bin.png");

const ProfileScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* TODO: think about changing to SafeAreaView as the general container (adds padding for devices with notch) */}
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.titleBackground}>
          <View style={styles.innerTitleBackground}>
            <TextInput style={styles.titleText} placeholder="Name"></TextInput>
          </View>
        </View>
      </ImageBackground>
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
  cardsScrollviewContainer: {
    marginTop: 0.15 * height,
    height: "100%",
    flex: 1,
  },
  cardsContainer: {
    // backgroundColor: 'yellow',
  },
  cardsContainerContent: {
    gap: 20,
    // backgroundColor: 'red',
    alignItems: "center",
    paddingBottom: 20,
  },
  cardContainer: {
    width: "100%",
    height: 0.32 * height,
    alignItems: "center",
  },
  cardBackground: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    top: 0.04 * height,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  cardIconBackground: {
    width: "18%",
    height: "28%",
    backgroundColor: "white",
    borderRadius: 100,
    top: "-12%",
    left: "5%",
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
  cardTitle: {
    fontSize: 20,
    color: "#2F93BE",
    fontWeight: "bold",
    top: -10,
    left: 35,
  },
  cardText: {
    color: "black",
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
    width: "70%",
  },
  button: {
    backgroundColor: "#2F93BE",
    width: "100%",
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
});
