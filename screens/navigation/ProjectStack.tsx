import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AssignUsers from "../projectScreens/AssignUsers";
import CreateProject from "../projectScreens/CreateProject";
import ProjectDetails from "../projectScreens/ProjectDetails";
import ProjectScreen from "../projectScreens/ProjectScreen";

const Stack = createStackNavigator();

export default function ProjectStack() {
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
        <Stack.Screen
          name="AssignUserToProject"
          component={AssignUsers}
          options={{ title: "Ajouter des participants" }}
        />
        <Stack.Screen
          name="CreateProject"
          component={CreateProject}
          options={{ title: "Nouveau projet" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
