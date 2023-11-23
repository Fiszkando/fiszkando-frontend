import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const TitleBanner = ({ title }) => {
  return (
    <View style={styles.titleBackground}>
      <View style={styles.innerTitleBackground}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBackground: {
    width: '80%',
    height: 0.1 * height,
    top: 0.12 * height,
    marginHorizontal: '10%',
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 20,
  },
  innerTitleBackground: {
    width: '95%',
    height: '85%',
    borderColor: '#908D8D',
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Harlow-Solid-Italic',
    fontSize: 40,
  },
});

export default TitleBanner;
