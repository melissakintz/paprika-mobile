import { Text, View } from "react-native";

export default function OneTaskScreen({ route }: object) {
  const { task } = route.params;

  return (
    <View>
      <Text>Titre: {task.name}</Text>
      <Text>Description: {task.description}</Text>
      <Text>Status: {task.status ? task.status : ""}</Text>
    </View>
  );
}
