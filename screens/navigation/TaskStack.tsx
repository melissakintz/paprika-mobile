import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import OneTaskScreen from "../taskScreens/OneTaskScreen";
import TaskScreen from "../taskScreens/TaskScreen";

const Stack = createStackNavigator();

export default function TaskStack() {
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
}
