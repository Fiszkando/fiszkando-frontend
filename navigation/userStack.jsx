import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddNewScreen from '../screens/AddNewScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StartQuizScreen from '../screens/StartQuizScreen';
import QuizScreen from '../screens/QuizScreen';
import FinishQuizScreen from '../screens/FinishQuizScreen';
import Feather from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StartQuiz" component={StartQuizScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="FinishQuiz" component={FinishQuizScreen} />
    </Stack.Navigator>
  );
}

export default function UserStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 12,
            elevation: 20
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                color={focused ? "#2F93BE" : "#D9D9D9"}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="search"
                color={focused ? "#2F93BE" : "#D9D9D9"}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddNew"
          component={AddNewScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="plus-circle"
                color={focused ? "#2F93BE" : "#D9D9D9"}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="users"
                color={focused ? "#2F93BE" : "#D9D9D9"}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Root"
          component={Root}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            tabBarShowLabel: false,
            tabBarIconStyle: { display: "none" }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}