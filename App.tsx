import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppRegistry } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import ProjectScreen from "./screens/ProjectScreen";
import TaskScreen from "./screens/TaskScreen";

const Tab = createBottomTabNavigator();
const link = new HttpLink({ uri: "http://192.168.1.21:4000" });

// Initialize Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

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
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("Paprika", () => App);
