import React, { useState } from "react";
import { Text } from "react-native";

const CreatorStep = ({ id = -1, data }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState([]);

  return (
    <Text style={{ color: "red", fontSize: 40 }}>
      Creator Step Component Works! id: {id} data: {data}
    </Text>
  );
};

export default CreatorStep;
