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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import { Provider, RootStateOrAny, useSelector } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import HomeStack from "./screens/navigation/HomeNavigation";
import ProjectStack from "./screens/navigation/ProjectNavigation";
import TaskStack from "./screens/navigation/TaskNavigation";
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

function App() {
  const isLogged = useSelector((state: RootStateOrAny) => state.logged.value);
  const { getItem } = useAsyncStorage("userId");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      const id = await getItem();
      if (id) setUserId(id);
    };
    getUserId();
  });

  return (
    <ApolloProvider client={client}>
      {isLogged || userId ? (
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
