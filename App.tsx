import React, { useEffect, useState, Fragment } from 'react';
import { AppRegistry, StyleSheet, Text, TextProps, View } from "react-native";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import store from './store'
import { Provider, RootStateOrAny } from 'react-redux'
import { useSelector } from 'react-redux'
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import ProjectScreen from "./screens/ProjectScreen";
import TaskScreen from "./screens/TaskScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.1.88:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const isLogged = useSelector((state: RootStateOrAny) => state.logged.value);

  return (
      <ApolloProvider client={client}>
        {isLogged ?
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: any;

                  if (route.name === "Projets") {
                    iconName = focused ? "briefcase" : "briefcase-outline";
                  } else if (route.name === "Accueil") {
                    iconName = focused ? "fast-food" : "fast-food-outline";
                  } else if (route.name === "Tâches") {
                    iconName = focused
                      ? "checkmark-circle"
                      : "checkmark-circle-outline";
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },

                tabBarActiveTintColor: "#E33636",

                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen name="Projets" component={ProjectScreen} />
              <Tab.Screen name="Accueil" component={HomeScreen} />
              <Tab.Screen name="Tâches" component={TaskScreen} />
            </Tab.Navigator>
          </NavigationContainer>
          :
          <LoginScreen />}
      </ApolloProvider>
  );
}

const styles = StyleSheet.create({});

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent("Paprika", () => AppWrapper);
