import { Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { RootStateOrAny, useSelector } from "react-redux";
import { Project, Task, User } from "../../graphql/graphql";
import ProjectContainer from "../components/projectComponent/ProjectContainer";

export default function ProjectDetails({
  route,
}: {
  route: RouteProp<{ params: { project: Project } }, "params">;
}): JSX.Element {
  const { project } = route.params;
  const user: User = useSelector(
    (state: RootStateOrAny) => state.userlogged
  ).value;
  const navigation = useNavigation();

  return (
    <>
      <ProjectContainer>
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
            keyExtractor={(user, index) => user.id || index}
          />
          <View style={styles.workers}></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Tâches associées</Text>
          <FlatList
            data={project.tasks}
            renderItem={(task) => <TaskCard task={task.item} />}
            ListEmptyComponent={() => <Text>Acunes tâches pour le moment</Text>}
            keyExtractor={(task, index) => task.id || index}
          />
        </View>
      </ProjectContainer>
      {user.role !== "USER" ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Projets", {
              screen: "AssignUserToProject",
              params: {
                project: project,
              },
            })
          }
        >
          <Feather name="users" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
    </>
  );
}
const TaskCard = ({ task }: { task: Task }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.taskContainer}
      onPress={() =>
        navigation.navigate("Taches", {
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
  client: {
    color: "gray",
    textTransform: "uppercase",
    alignSelf: "center",
  },
  description: { textAlign: "center", marginTop: 30 },
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
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: "orange",
    justifyContent: "center",
  },
  section: {
    marginVertical: 10,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
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
