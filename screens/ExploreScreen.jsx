import {
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const backgroundImg = require("../assets/tlo.png");
const searchImg = require("../assets/search.png");
const quizIco = require("../assets/laptop.png");

const ExploreScreen = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleStartQuiz = () => {
    //todo go to quiz start
  };

  const handleSearch = () => {
    if (searchText.length == 0) {
      setLoading(true);
      var questionSets = collection(db, "question-sets");
      onSnapshot(questionSets, (snapshot) => {
        let quizzesList = [];
        snapshot.docs.map((doc) =>
          quizzesList.push({ ...doc.data(), id: doc.id })
        );
        console.log(quizzesList);
        setQuizzes(quizzesList);
        setLoading(false);
      });
    } else {
      setLoading(true);
      var questionSets = collection(db, "question-sets");
      onSnapshot(questionSets, (snapshot) => {
        let quizzesList = [];
        snapshot.docs.map((doc) => {
          const quizData = { ...doc.data(), id: doc.id };

          const quizName = quizData.name.toLowerCase();
          const quizAuthor = quizData.authorId.toLowerCase();

          if (
            quizName.includes(searchText.toLowerCase()) ||
            quizAuthor.includes(searchText.toLowerCase())
          ) {
            quizzesList.push(quizData);
          }
        });
        setQuizzes(quizzesList);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    var questionSets = collection(db, "question-sets");
    onSnapshot(questionSets, (snapshot) => {
      let quizzesList = [];
      snapshot.docs.map((doc) =>
        quizzesList.push({ ...doc.data(), id: doc.id })
      );
      setQuizzes(quizzesList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={handleStartQuiz} style={styles.quizBackground}>
        <View style={styles.quizIconBackground}>
          <Image source={quizIco} style={styles.quizIcon}></Image>
        </View>
        <Text style={styles.quizAuthor}>{item.authorId}</Text>
        <Text style={styles.quizTitle}>{item.name}</Text>
        <Text style={styles.quizDescription}>{item.category}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.titleBackground}>
          <View style={styles.innerTitleBackground}>
            <Text style={styles.titleText}> Explore </Text>
          </View>
        </View>

        <View style={styles.searchBackground}>
          <TextInput
            style={styles.searchText}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search"
          ></TextInput>
          <TouchableOpacity onPress={handleSearch} style={styles.searchImage}>
            <Image source={searchImg}></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.quizContainer}>
          <FlatList
            data={quizzes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: height,
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
  searchBackground: {
    width: "80%",
    height: 0.06 * height,
    top: 0.18 * height,
    marginHorizontal: "10%",
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 20,
  },
  searchText: {
    fontSize: 20,
    left: "30%",
  },
  searchImage: {
    top: "3%",
    right: "30%",
  },
  quizContainer: {
    width: "100%",
    height: 0.64 * height,
    marginTop: 0.2 * height,
  },
  quizBackground: {
    width: "80%",
    height: 0.18 * height,
    backgroundColor: "white",
    borderRadius: 20,
    top: 0.04 * height,
    left: "10%",
    marginBottom: 0.06 * height,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  quizIconBackground: {
    width: "16%",
    height: "34%",
    backgroundColor: "white",
    borderRadius: 100,
    top: "-12%",
    left: "5%",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 20,
  },
  quizIcon: {
    left: "20%",
  },
  quizAuthor: {
    fontStyle: "italic",
    top: -40,
    textAlign: "right",
    paddingRight: "5%",
    fontSize: 12,
  },
  quizTitle: {
    fontSize: 20,
    color: "#2F93BE",
    fontWeight: "bold",
    top: -30,
    left: 30,
  },
  quizDescription: {
    top: -20,
    left: 50,
  },
});
