import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import { Provider, RootStateOrAny, useSelector } from "react-redux";
import HomeStack from "./screens/navigation/HomeStack";
import LoginStack from "./screens/navigation/LoginStack";
import ProjectStack from "./screens/navigation/ProjectStack";
import TaskStack from "./screens/navigation/TaskStack";
import store from "./store";

const link = new HttpLink({ uri: "http://192.168.1.25:4000/graphql" });

const authLink = setContext(async (_, { headers }) => {
  const userId = await AsyncStorage.getItem("userId");
  return {
    headers: {
      ...headers,
      authorization:
        userId !== null || userId !== undefined ? userId : undefined,
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Projets") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (route.name === "Accueil") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "Taches") {
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
      <Tab.Screen name="Taches" component={TaskStack} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group>
            <Stack.Screen name="Home" component={TabNavigator} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginStack} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent("Paprika", () => AppWrapper);
