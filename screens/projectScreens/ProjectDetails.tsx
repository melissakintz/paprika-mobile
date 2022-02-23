import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Project, Task } from "../../graphql/graphql";

export default function ProjectDetails({
  route,
}: {
  route: RouteProp<{ params: { project: Project } }, "params">;
}): JSX.Element {
  const { project } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.section}>
        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.client}>
          <Ionicons name="person" /> {project.client}
        </Text>
        <View style={styles.dates}>
          <View style={styles.date}>
            <Text>Début: {toLocaleDate(project.startAt)}</Text>
          </View>
          <Ionicons name="calendar-outline" size={30} />

          <View
            style={[
              styles.date,
              {
                backgroundColor: moreThanNow(project.endAt)
                  ? "#ff726f"
                  : "lightgreen",
              },
            ]}
          >
            <Text>Fin: {toLocaleDate(project.endAt)}</Text>
          </View>
        </View>
        <Text style={styles.description}>{project.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Personnes associées</Text>
        <FlatList
          horizontal={true}
          data={project.participants}
          renderItem={(user) => (
            <View style={styles.worker}>
              <Text>{user.item?.user?.firstName}</Text>
            </View>
          )}
          ListEmptyComponent={() => <Text>Pas encore de participants</Text>}
          keyExtractor={(user) => user.id}
        />
        <View style={styles.workers}></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Tâches associées</Text>
        <FlatList
          data={project.tasks}
          renderItem={(task) => <TaskCard task={task.item} />}
          ListEmptyComponent={() => <Text>Acunes tâches pour le moment</Text>}
          keyExtractor={(task) => task.id}
        />
      </View>
    </View>
  );
}
const TaskCard = ({ task }: { task: Task }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.taskContainer}
      onPress={() =>
        navigation.navigate("Tâches", {
          screen: "OneTaskScreen",
          params: { task: task },
        })
      }
    >
      <View style={styles.taskContainer}>
        <View
          style={[
            styles.taskHeader,
            {
              backgroundColor:
                task.status === "OPEN"
                  ? "lightgray"
                  : task.status === "INPROGRESS"
                  ? "orange"
                  : "green",
            },
          ]}
        />
        <Text style={styles.taskText}>{task.name}</Text>
      </View>

      <View
        style={[
          styles.taskBadge,
          {
            backgroundColor:
              task.status === "OPEN"
                ? "lightgray"
                : task.status === "INPROGRESS"
                ? "orange"
                : "green",
          },
        ]}
      >
        <Text>{task.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const toLocaleDate = (date: string): string => {
  const formatedDate = new Date(date);
  return formatedDate.toLocaleDateString();
};

const moreThanNow = (date: string): boolean => {
  const now = new Date();
  const compare = new Date(date);
  if (now < compare) return true;
  return false;
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 25,
    height: "97%",
  },
  client: {
    color: "gray",
    textTransform: "uppercase",
    alignSelf: "center",
  },
  description: { textAlign: "center", marginTop: 30 },
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
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  taskHeader: {
    height: 20,
    width: 3,
  },
  taskText: {
    fontSize: 20,
    paddingLeft: 10,
  },
  taskBadge: {
    fontSize: 20,
    padding: 4,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
});
