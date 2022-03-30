import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../HomeScreen";
import ProfilScreen from "../profilScreens/ProfilScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
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
}
