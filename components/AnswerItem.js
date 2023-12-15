import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

const AnswerItem = ({ style, content, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: 100,
    //height: 0.18 * height,
    backgroundColor: "white",
    borderRadius: 20,
    top: 0.04 * height,
    marginBottom: 0.1 * height,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 2,
    borderColor: "white",
  },

  content: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    verticalAlign: "middle",
  },
});

export default AnswerItem;
