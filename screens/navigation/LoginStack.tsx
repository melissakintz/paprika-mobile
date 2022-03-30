import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../LoginScreen";

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
