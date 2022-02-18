import React, { useEffect, useState, Fragment } from 'react';
import { AppRegistry, StyleSheet, Text, TextProps, View } from "react-native";
import store from './store'
import { Provider, RootStateOrAny } from 'react-redux'
import { useSelector } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProjectDetails from "./screens/projectScreens/ProjectDetails";
import ProjectScreen from "./screens/projectScreens/ProjectScreen";
import TaskScreen from "./screens/TaskScreen";

const link = new HttpLink({ uri: "http://192.168.1.88:4000/graphql" });

// Initialize Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
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
        headerShown: false,
      })}
    >
      <Tab.Screen name="Projets" component={ProjectStack} />
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="Tâches" component={TaskStack} />
    </Tab.Navigator>
  );
};

const ProjectStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="ProjetScreen"
          component={ProjectScreen}
          options={{ title: "Projets" }}
        />
        <Stack.Screen
          name="ProjetDetails"
          component={ProjectDetails}
          options={{ title: "Détails" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
const TaskStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="TaskScreen"
          component={TaskScreen}
          options={{ title: "Tâches" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Accueil" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

function App() {
  const isLogged = useSelector((state: RootStateOrAny) => state.logged.value);

  return (
    <ApolloProvider client={client}>
      {isLogged ?
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
              <Stack.Screen name="Home" component={TabNavigator} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      :
      <LoginScreen />}
    </ApolloProvider>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent("Paprika", () => AppWrapper);
