import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Project, useGetTaskByProjectQuery } from "../../graphql/graphql";

export default function ProjectDetails({
  route,
}: {
  route: RouteProp<{ params: { project: Project } }, "params">;
}): JSX.Element {
  const { project } = route.params;
  const { data: tasks } = useGetTaskByProjectQuery({
    variables: { projectId: project.id },
  });
  return (
    <View>
      <Text>{project.name}</Text>
      <Text>{project.description}</Text>
      <Text>{project.client}</Text>
      <Text>TACHES LIEES</Text>
      <FlatList
        data={tasks?.getTaskByProject}
        renderItem={(task) => <Text>{task.item.name}</Text>}
        ListEmptyComponent={() => <Text>Acunes tâches pour le moment</Text>}
      />
    </View>
  );
}
