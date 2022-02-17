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
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.safeContainer}>
      <FlatList
        contentContainerStyle={styles.container}
        data={projects?.getAllProjects}
        renderItem={(project) => (
          <ProjectCard
            project={project.item}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        )}
        ListEmptyComponent={() => <Text>pas de projets en cours</Text>}
        onRefresh={refetch}
        refreshing={loading}
        onEndReached={() => fetchMore}
        initialNumToRender={5}
      />
      <TouchableOpacity
        style={styles.add}
        onPress={() => setCreateModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={40} color="#E33636" />
      </TouchableOpacity>
      <CreateModal
        refetch={refetch}
        setCreateModalVisible={setCreateModalVisible}
        createModalVisible={createModalVisible}
      />
    </View>
  );
}

const CreateModal = ({
  refetch,
  setCreateModalVisible,
  createModalVisible,
}: {
  setCreateModalVisible: (show: boolean) => void;
  createModalVisible: boolean;
  refetch: () => Promise<any>;
}): JSX.Element => {
  const [projectName, setProjectName] = useState("");
  const [projectClient, setProjectClient] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [createProject] = useCreateProjectMutation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={createModalVisible}
      onRequestClose={() => {
        setCreateModalVisible(!createModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.close}
            onPress={() => setCreateModalVisible(false)}
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
              setCreateModalVisible(false);
              refetch();
            }}
          >
            <Text style={styles.textStyle}>Ajouter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const ProjectCard = ({
  project,
  setModalVisible,
  modalVisible,
}: {
  project: Project;
  setModalVisible: (show: boolean) => void;
  modalVisible: boolean;
}): JSX.Element => {
  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.header} />
        <View style={styles.badge}>
          <Text
            style={[
              styles.textBadge,
              { color: project.endAt ? "green" : "blue" },
            ]}
          >
            {project.endAt ? "CLOSED" : "OPEN"}
          </Text>
        </View>
        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.description}>{project.description}</Text>
        <Text style={styles.client}>
          <Ionicons name="person" /> {project.client}
        </Text>
      </TouchableOpacity>
      <ProjectModal
        project={project}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </>
  );
};

const ProjectModal = ({
  project,
  modalVisible,
  setModalVisible,
}: {
  project: Project;
  modalVisible: boolean;
  setModalVisible: (show: boolean) => void;
}): JSX.Element => {
  const start = new Date(project.startAt);
  let end;
  if (project.endAt) end = new Date(project.endAt);

  return (
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

          <Text>Date de début: {start.toDateString()}</Text>
          <Text>Date de fin: {end ? end.toDateString() : "indéfinie"}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
