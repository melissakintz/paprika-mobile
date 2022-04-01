import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,ScrollView
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
  Project,
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetProjectsByUserQuery,
  useGetAllProjectsQuery,
  Task
} from "../../graphql/graphql";

import React, { useState } from "react";

export default function taskProgress() {
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = currentUserTab.data?.getAllUsers[0].id;
  const { data: user, error: errorUser } = useGetUserQuery({
      variables: { userId: currentUser! },
  });

  const [modalProject, setmodalProject] = useState(false);
  const [modalTask, setmodalTask] = useState(false);

  const {
    data: projects,
    error,
  } = useGetProjectsByUserQuery();

  return (
    <ScrollView>
      <TouchableOpacity style={styles.containerText} onPress={() => {
        if (modalProject == true) {
          setmodalProject(false)
        } else {
          setmodalProject(true)
          if (modalTask == true) {
            setmodalTask(false)
          }
        }
      }}>
        {modalProject? (
        <View style={styles.containerTask}>
          <Text style={[styles.textCenter, styles.textSize]}>Projet(s) en cours:
          </Text>
          <FlatList
            data={projects?.getProjectsByUser}
            renderItem={(project) => (
              <View>
                <Text style={styles.listTask}>{project.index} => {project.item?.name}</Text>
                <Text style={styles.listTaskOne}><Ionicons name="person" />{project.item?.client}</Text>
              </View>
            )}      
            ListEmptyComponent={() => <Text style={styles.noProjet}>pas de projets</Text>}
          />
        </View>
        ):(
          <Text style={styles.textModal}>Voir mes projets en cours </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerText} onPress={() => {
        if (modalTask == true) {
          setmodalTask(false)
        } else {
          setmodalTask(true)
          if (modalProject == true) {
            setmodalProject(false)
          }
        }
      }}>
        {modalTask? (
        <View style={styles.containerTask}>
          <Text style={[styles.textCenter, styles.textSize]}>Tâche(s) en cours:
          </Text>
          <FlatList
            data={projects?.getProjectsByUser}
            ListEmptyComponent={() => <Text>Pas de tâches associées</Text>}
            renderItem={(project) => (
              <View>
                <Text style={styles.listTask}>{project.item?.name}</Text>
                <Text style={styles.listTaskOne}><Ionicons name="send-outline" />{project.item?.tasks}</Text>
              </View>
            )}
          />
        </View>
        ):(
          <Text style={styles.textModal}>Voir mes tâches en cours </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
containerTask: {
    paddingTop: 30
  },
  containerText: {
    backgroundColor: "#EFEFEF",
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 0.2
  },
  containerListTasks: {
    display: "flex",
    flexDirection: "row"
  },
  textCenter: {
    textAlign: "center",
    textDecorationLine: "underline",
    paddingBottom: 20,
  },
  textSize: {
    fontSize: 20
  },
  noProjet: {
    textTransform: "uppercase"
  },
  listTask: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20
  },
  listTaskOne: {
    paddingLeft: 30,
    paddingBottom: 20
  },
  textModal: {
    textAlign: "center",
    textTransform: "uppercase",
    textDecorationStyle: "solid",
    textDecorationColor: "black",
    paddingBottom: 20,
    paddingTop: 10
  }
});