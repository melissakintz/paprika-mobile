import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Project, useGetTaskByProjectQuery } from "../../graphql/graphql";

export default function ProjectDetails({
  route,
}: {
  route: RouteProp<{ params: { project: Project } }, "params">;
}): JSX.Element {
  const { project } = route.params;
  const { data: tasks, loading } = useGetTaskByProjectQuery({
    variables: { projectId: project.id },
  });
  return (
    <View>
      <Text style={styles.title}>{project.name}</Text>
      <Text>{project.description}</Text>
      <Text>{project.client}</Text>
      <Text style={styles.title}>TACHES LIEES</Text>
      <FlatList
        data={tasks?.getTaskByProject}
        renderItem={(task) => <Text>{task.item.name}</Text>}
        ListEmptyComponent={() => <Text>Acunes tâches pour le moment</Text>}
        refreshing={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  update: {
    padding: 19,
    backgroundColor: "orange",
    justifyContent: "center",
    margin: 5,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    marginVertical: 10,
  },
  client: {
    color: "gray",
    textTransform: "uppercase",
  },
  card: {
    margin: 5,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  container: {
    margin: 5,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    height: 2,
    marginBottom: 8,
    backgroundColor: "orange",
  },
  add: {
    alignItems: "center",
    color: "orange",
    justifyContent: "center",
    margin: 10,
  },
  badge: {
    padding: 4,
    borderRadius: 5,
    backgroundColor: "lightgray",
    alignSelf: "flex-end",
  },
  textBadge: {
    fontSize: 10,
  },
});
