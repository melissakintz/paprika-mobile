import {
  NavigationRouteContext,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useCreateTaskMutation } from "../../graphql/graphql";

export default function CreateTask({
  route,
}: {
  route: RouteProp<{ params: { projectId: string } }, "params">;
}) {
  const { projectId } = route.params;
  const navigation = useNavigation();
  const [task, setTask] = useState({
    name: "",
    description: "",
    projectId: "",
    users: [],
  });
  const [createTask] = useCreateTaskMutation();

  const handleCreation = async () => {
    try {
      createTask({
        variables: {
          taskInput: {
            name: task.name,
            description: task.description,
            projectId: projectId,
            users: ["7e43ae1a-cf45-4111-ae93-6907f952212c"],
            status: "OPEN"
          },
        },
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Créer une tâche</Text>
      <Text>Titre</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="Titre de la tâche"
        value={task.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
      />
      <Text>Description</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="Description de la tâche..."
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
      />
      <TouchableOpacity onPress={() => handleCreation()}>
        <Text>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
