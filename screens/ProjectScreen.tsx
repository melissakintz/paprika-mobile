import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Project,
  useCreateProjectMutation,
  useGetAllProjectsQuery,
} from "../graphql/graphql";

export default function ProjectScreen() {
  const {
    data: projects,
    refetch,
    loading,
    fetchMore,
  } = useGetAllProjectsQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectClient, setProjectClient] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [createProject] = useCreateProjectMutation();

  return (
    <View style={styles.safeContainer}>
      <FlatList
        contentContainerStyle={styles.container}
        data={projects?.getAllProjects}
        renderItem={(project) => <ProjectCard project={project.item} />}
        ListEmptyComponent={() => <Text>pas de projets en cours</Text>}
        onRefresh={refetch}
        refreshing={loading}
        onEndReached={() => fetchMore}
        initialNumToRender={5}
      />
      <TouchableOpacity
        style={styles.add}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={40} color="#E33636" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.close}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle-outline" size={24} color="red" />
            </Pressable>

            <Text style={styles.title}>Ajouter un project</Text>
            <TextInput
              placeholder="nom du projet"
              value={projectName}
              style={styles.input}
              onChangeText={(value) => setProjectName(value)}
            />
            <TextInput
              placeholder="Client"
              value={projectClient}
              style={styles.input}
              onChangeText={(value) => setProjectClient(value)}
            />
            <TextInput
              placeholder="description"
              value={projectDescription}
              style={styles.input}
              onChangeText={(value) => setProjectDescription(value)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                createProject({
                  variables: {
                    projectInput: {
                      name: projectName,
                      client: projectClient,
                      description: projectDescription,
                    },
                  },
                });
                setModalVisible(false);
                refetch();
              }}
            >
              <Text style={styles.textStyle}>Ajouter</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.header,
          { backgroundColor: project.endAt ? "green" : "orange" },
        ]}
      />
      <Text style={styles.title}>{project.name}</Text>
      <Text style={styles.description}>{project.description}</Text>
      <Text style={styles.client}>{project.client}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {},
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
  },
  header: {
    height: 2,
    marginBottom: 8,
  },
  add: {
    alignItems: "center",
    color: "orange",
    justifyContent: "center",
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  safeContainer: {
    height: "100%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    margin: 5,
  },
  close: {
    margin: -10,
    alignSelf: "flex-end",
  },
});
