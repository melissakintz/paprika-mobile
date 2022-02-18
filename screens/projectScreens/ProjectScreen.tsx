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
import { Swipeable } from "react-native-gesture-handler";
import { NavigationStackScreenProps } from "react-navigation-stack";
import {
  Project,
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} from "../../graphql/graphql";

export default function ProjectScreen({
  navigation,
}: {
  navigation: NavigationStackScreenProps;
}) {
  const {
    data: projects,
    refetch,
    loading,
    fetchMore,
  } = useGetAllProjectsQuery();
  const [createModalVisible, setCreateModalVisible] = useState(false);

  return (
    <View style={styles.safeContainer}>
      <FlatList
        contentContainerStyle={styles.container}
        data={projects?.getAllProjects}
        renderItem={(project) => (
          <ProjectCard project={project.item} navigation={navigation} />
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

const UpdateModal = ({
  project,
  setShowUpdateModal,
  showUpdateModal,
}: {
  project: Project;
  setShowUpdateModal: (show: boolean) => void;
  showUpdateModal: boolean;
}): JSX.Element => {
  const [projectName, setProjectName] = useState(project.name);
  const [projectClient, setProjectClient] = useState(project.client);
  const [projectDescription, setProjectDescription] = useState(
    project.description
  );
  const [updateProject] = useUpdateProjectMutation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showUpdateModal}
      onRequestClose={() => {
        setShowUpdateModal(!showUpdateModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.close}
            onPress={() => setShowUpdateModal(false)}
          >
            <Ionicons name="close-circle-outline" size={24} color="red" />
          </Pressable>

          <Text style={styles.title}>Modifier le project</Text>
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
            style={[styles.input]}
            onChangeText={(value) => setProjectDescription(value)}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              updateProject({
                variables: {
                  projectId: project.id,
                  updateProjectInput: {
                    name: projectName,
                    description: projectDescription,
                    client: projectClient,
                  },
                },
              });
              setShowUpdateModal(false);
            }}
          >
            <Text style={styles.textStyle}>Modifier</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const ProjectCard = ({
  project,
  navigation,
}: {
  project: Project;
  navigation: NavigationStackScreenProps;
}): JSX.Element => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  return (
    <>
      <Swipeable renderRightActions={RightAction}>
        <Pressable
          onLongPress={() => setShowUpdateModal(true)}
          style={styles.card}
          onPress={() =>
            navigation.navigate("ProjetDetails", { project: project })
          }
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
        </Pressable>
      </Swipeable>
      <UpdateModal
        project={project}
        setShowUpdateModal={setShowUpdateModal}
        showUpdateModal={showUpdateModal}
      />
    </>
  );
};

const RightAction = () => {
  return (
    <TouchableOpacity style={styles.update}>
      <Ionicons name="pencil" size={30} color="white" />
    </TouchableOpacity>
  );
};

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
