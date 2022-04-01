import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Project, useCreateTaskMutation } from "../../graphql/graphql";

export default function CreateTask({
  route,
}: {
  route: RouteProp<{ params: { project: Project } }, "params">;
}) {
  const { project } = route.params;
  const navigation = useNavigation();
  const [task, setTask] = useState({
    name: "",
    description: "",
    projectId: "",
    users: [],
  });
  const [createTask] = useCreateTaskMutation();

  const [assignees, setAssignees] = useState<Array<string>>([]);

  const handlePress = (isChecked: boolean, user: string) => {
    if (isChecked) {
      setAssignees((prev) => [...prev, user]);
    } else {
      setAssignees((prev) => prev.filter((el) => el !== user));
    }
  };

  console.log({ASSIGNEES: assignees})

  const handleCreation = async () => {
    try {
      createTask({
        variables: {
          taskInput: {
            name: task.name,
            description: task.description,
            projectId: project.id,
            users: assignees,
            status: "OPEN",
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
      <FlatList
        scrollEnabled
        data={project.participants}
        renderItem={(user) => (
          <View>
            <Text>
              <Ionicons name="person" color={"gray"} size={16} />
              {user.item?.user?.email}
            </Text>
            <BouncyCheckbox
              onPress={(isChecked: boolean) => {
                handlePress(isChecked, user.item?.user?.id);
              }}
            />
          </View>
        )}
      />
      <TouchableOpacity onPress={() => handleCreation()}>
        <Text>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
