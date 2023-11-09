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
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Dimensions } from "react-native";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  updateProfile,
  deleteUser,
} from "firebase/auth";

const { height, width } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");
const saveIcon = require("../assets/diskette.png");
const deleteIcon = require("../assets/bin.png");

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName ?? " ");
      console.log(auth.currentUser);
    }
  }, [auth.currentUser]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleUpdatePassword = () => {
    // todo:
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        // Update successful.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  const handleUpdateDisplayName = () => {
    if (newUsername.length < 1) {
      alert("Enter valid username");
    }

    updateProfile(auth.currentUser, {
      displayName: newUsername,
    })
      .then(() => {
        alert("Username updated.");
        setUsername(newUsername);
      })
      .catch((error) => {
        alert("An error occured while changing username");
      });
  };

  const handleDeleteProfile = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

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
            <Text style={styles.titleText}> Profile </Text>
          </View>
        </View>
        <View style={styles.cardsScrollviewContainer}>
          <ScrollView
            style={styles.cardsContainer}
            contentContainerStyle={styles.cardsContainerContent}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center" /* make it a separate style */,
              }}
            >
              <View style={styles.cardContainer}>
                <View style={styles.cardBackground}>
                  <View style={styles.cardIconBackground}>
                    <Image source={saveIcon}></Image>
                  </View>
                  <Text style={styles.cardTitle}>Change password</Text>
                  <View style={styles.inputGroup}>
                    <TextInput
                      placeholderTextColor="white"
                      placeholder="New password"
                      value={newPassword}
                      onChangeText={(text) => setNewPassword(text)}
                      style={styles.input}
                    ></TextInput>
                    <TextInput
                      placeholderTextColor="white"
                      placeholder="Re-enter new password"
                      value={confirmNewPassword}
                      onChangeText={(text) => setConfirmNewPassword(text)}
                      style={styles.input}
                    ></TextInput>
                  </View>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={styles.cardContainer}>
                <View style={styles.cardBackground}>
                  <View style={styles.cardIconBackground}>
                    <Image source={saveIcon}></Image>
                  </View>
                  <Text style={styles.cardTitle}>Change username</Text>
                  <View style={styles.inputGroup}>
                    <TextInput
                      placeholderTextColor="white"
                      placeholder="Username"
                      style={[
                        styles.input,
                        { backgroundColor: "white", color: "#2F93BE" },
                      ]}
                      value={"Your username: " + username}
                      editable={false}
                    ></TextInput>
                    <TextInput
                      placeholderTextColor="white"
                      placeholder="New username"
                      style={styles.input}
                      value={newUsername}
                      onChangeText={(text) => setNewUsername(text)}
                    ></TextInput>
                  </View>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleUpdateDisplayName}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonText}>Change username</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={styles.cardContainer}>
                <View style={styles.cardBackground}>
                  <View style={[styles.cardIconBackground, { height: "32%" }]}>
                    <Image source={deleteIcon}></Image>
                  </View>
                  <Text style={styles.cardTitle}>Delete account</Text>
                  <View style={styles.inputGroup}>
                    <Text style={styles.cardText}>
                      Warning! Make sure you really want to delete your account.
                      This operation cannot be undone!
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonText}>Delete account</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={[
                    styles.button,
                    styles.buttonOutline,
                    { marginTop: 30 },
                  ]}
                >
                  <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
