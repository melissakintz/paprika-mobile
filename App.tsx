import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AppRegistry } from "react-native";
import { Provider, RootStateOrAny, useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfilScreen from "./screens/profilScreens/ProfilScreen";
import ProjectDetails from "./screens/projectScreens/ProjectDetails";
import ProjectScreen from "./screens/projectScreens/ProjectScreen";
import OneTaskScreen from "./screens/taskScreens/OneTaskScreen";
import TaskScreen from "./screens/taskScreens/TaskScreen";
import store from "./store";

const link = new HttpLink({ uri: "http://192.168.1.20:4000/graphql" });

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
        <Stack.Screen
          name="OneTaskScreen"
          component={OneTaskScreen}
          options={{ title: "Tâche" }}
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
        <Stack.Screen
          name="ProfilScreen"
          component={ProfilScreen}
          options={{ title: "Profile" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

function App() {
  const isLogged = useSelector((state: RootStateOrAny) => state.logged.value);

  return (
    <ApolloProvider client={client}>
      {isLogged ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
              <Stack.Screen name="Home" component={TabNavigator} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
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
