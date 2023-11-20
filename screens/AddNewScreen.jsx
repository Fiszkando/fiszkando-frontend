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
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");

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
});
