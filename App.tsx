import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import ProjectScreen from "./screens/ProjectScreen";
import TaskScreen from "./screens/TaskScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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

const styles = StyleSheet.create({});

AppRegistry.registerComponent("Paprika", () => App);
