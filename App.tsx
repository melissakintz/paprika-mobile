import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import HomeStack from "./screens/navigation/HomeStack";
import LoginStack from "./screens/navigation/LoginStack";
import ProjectStack from "./screens/navigation/ProjectStack";
import TaskStack from "./screens/navigation/TaskStack";
import store from "./store";
import theme from "./styles/theme";
import getUser from "./utils/userUtils";

const link = new HttpLink({ uri: "http://192.168.1.20:4000/graphql" });

const authLink = setContext(async (_, { headers }) => {
  const token: string | null = await getUser.getUserToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : undefined,
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
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen
            name="Login"
            component={LoginStack}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent("Paprika", () => Main);
