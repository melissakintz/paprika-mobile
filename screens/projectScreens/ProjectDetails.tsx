import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
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
    <ScrollView style={styles.container}>
      <View style={styles.header} />
      <View style={styles.section}>
        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.client}>
          <Ionicons name="person" /> {project.client}
        </Text>
        <View style={styles.dates}>
          <View style={styles.date}>
            <Text>Créé le : {toDate(project.startAt)}</Text>
          </View>
          <View style={styles.date}>
            <Text>Finis le : {toDate(project.endAt)}</Text>
          </View>
        </View>
        <Text style={styles.description}>{project.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Personnes associées</Text>
        <View style={styles.workers}>
          {/*TODO horizontal flat list*/}
          <View style={styles.worker}></View>
          <View style={styles.worker}></View>
          <View style={styles.worker}></View>
          <View style={styles.worker}></View>
          <View style={styles.worker}></View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Tâches associées</Text>
        <FlatList
          data={tasks?.getTaskByProject}
          renderItem={(task) => <Text>{task.item.name}</Text>}
          ListEmptyComponent={() => <Text>Acunes tâches pour le moment</Text>}
          refreshing={loading}
        />
      </View>
    </ScrollView>
  );
}

const toDate = (date: string): string => {
  const formatedDate = new Date(date);
  return formatedDate.toLocaleDateString();
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 25,
  },
  client: {
    color: "gray",
    textTransform: "uppercase",
    alignSelf: "center",
  },
  description: { textAlign: "center" },
  header: {
    height: 2,
    marginBottom: 8,
    backgroundColor: "orange",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  dates: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 6,
  },
  date: {
    backgroundColor: "lightgray",
    padding: 8,
    borderRadius: 20,
  },
  workers: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  worker: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "orange",
  },
  section: {
    marginVertical: 10,
  },
});
