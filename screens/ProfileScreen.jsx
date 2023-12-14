import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  View,
  Image,
  Modal,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Dimensions } from "react-native";
import { updatePassword, updateProfile, deleteUser } from "firebase/auth";
import TitleBanner from "../components/TitleBanner";

const { height } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");
const saveIcon = require("../assets/diskette.png");
const deleteIcon = require("../assets/bin.png");

const ProfileScreen = () => {
  const [discardModalVisible, setDiscardModalVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameError, setNewUsernameError] = useState("");
  const [newUsernameSuccess, setNewUsernameSuccess] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");

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
        Alert.alert(error.message);
      });
  };

  const handleUpdateDisplayName = () => {
    //clear all messages
    setNewUsernameError("");
    setNewUsernameSuccess("");
    if (newUsername.length < 1) {
      setNewUsernameError("Enter valid username");
      return;
    }

    updateProfile(auth.currentUser, {
      displayName: newUsername,
    })
      .then(() => {
        setUsername(newUsername);
        setNewUsernameSuccess("Username updated.");
      })
      .catch((error) => {
        setNewUsernameError("An error occured while changing username");
      });
  };

  const handleUpdatePassword = () => {
    //clear all messages
    setNewPasswordError("");
    setConfirmNewPasswordError("");
    setPasswordChangeSuccess("");

    if (newPassword.length === 0) {
      setNewPasswordError("Password can't be blank");
      if (confirmNewPassword.length === 0) {
        setConfirmNewPasswordError("Password can't be blank");
      }
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setNewPasswordError("Passwords don't match");
      setConfirmNewPasswordError("Passwords don't match");
      return;
    }

    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordChangeSuccess("Password updated successfully");
      })
      .catch((error) => {
        //if error === specific (time logged in too long, user get alerted to re-login - log him/her out, in the future use reauthenticateWithCredential)
        //read https://firebase.google.com/docs/auth/web/manage-users?hl=pl#re-authenticate_a_user
        setConfirmNewPasswordError(
          "An error occured while changing password. Try logging in again."
        );
      });
  };

  const handleDeleteUser = () => {
    //add some kind of prompt saying "do you really want to do it???"
    deleteUser(auth.currentUser)
      .then(() => {
        Alert.alert("User deleted.");
        // User deleted. TODO: check if authguard works (user get signed out automatically)...
      })
      .catch((error) => {
        //if error === specific (time logged in too long, user get alerted to re-login - log him/her out, in the future use reauthenticateWithCredential)
        //read https://firebase.google.com/docs/auth/web/manage-users?hl=pl#delete_a_user
        Alert.alert("An error occured while deleting user");
      });
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          opacity: discardModalVisible
            ? 0.4 //if modal visible apply reduced opacity
            : 1,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* TODO: think about changing to SafeAreaView as the general container (adds padding for devices with notch) */}
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.image}
      >
        <TitleBanner title="Profile" />
        <View style={styles.cardsScrollviewContainer}>
          <ScrollView
            style={styles.cardsContainer}
            contentContainerStyle={styles.cardsContainerContent}
          >
            <View style={styles.cardSectionContainer}>
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
                      secureTextEntry
                    ></TextInput>
                    {newPasswordError && (
                      <Text style={styles.errorMessage}>
                        {newPasswordError}
                      </Text>
                    )}
                    <TextInput
                      placeholderTextColor="white"
                      placeholder="Re-enter new password"
                      value={confirmNewPassword}
                      onChangeText={(text) => setConfirmNewPassword(text)}
                      style={styles.input}
                      secureTextEntry
                    ></TextInput>
                    {confirmNewPasswordError && (
                      <Text style={styles.errorMessage}>
                        {confirmNewPasswordError}
                      </Text>
                    )}
                    {passwordChangeSuccess && (
                      <Text style={styles.successMessage}>
                        {passwordChangeSuccess}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleUpdatePassword}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardSectionContainer}>
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
                        {
                          backgroundColor: "transparent",
                          color: "#2F93BE",
                          fontWeight: "bold",
                          fontSize: 20,
                        },
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
                    {newUsernameError && (
                      <Text style={styles.errorMessage}>
                        {newUsernameError}
                      </Text>
                    )}
                    {newUsernameSuccess && (
                      <Text style={styles.successMessage}>
                        {newUsernameSuccess}
                      </Text>
                    )}
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
            <View style={styles.cardSectionContainer}>
              <View style={styles.cardContainer}>
                <View style={styles.cardBackground}>
                  <View style={styles.cardIconBackground}>
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
                  onPress={() => setDiscardModalVisible(true)}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonText}>Delete account</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardSectionContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
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
                  Do you really want to delete your user? This operation{"\n"}
                  <Text style={{ fontWeight: "bold" }}>cannot</Text> be undone.
                </Text>
                <View style={[{ flexDirection: "row", gap: 15 }]}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: "red", width: "30%" },
                    ]}
                    onPress={() => handleDeleteUser()}
                  >
                    <Text style={{ color: "white" }}>Discard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { width: "30%" }]}
                    onPress={() => setDiscardModalVisible(false)}
                  >
                    <Text style={{ color: "white" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </Modal>
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
  cardsScrollviewContainer: {
    marginTop: 0.15 * height,
    flex: 1,
  },
  cardsContainer: {},
  cardsContainerContent: {
    gap: 20,
    alignItems: "center",
    paddingBottom: 20,
  },
  cardSectionContainer: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    gap: 4,
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
  },
  cardBackground: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
    paddingBottom: 20,
  },
  cardIconBackground: {
    width: 50,
    height: 50,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 50,
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
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 80,
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
  errorMessage: {
    color: "red",
  },
  successMessage: {
    color: "green",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
