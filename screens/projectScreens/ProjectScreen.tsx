import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  Project,
  RoleSite,
  useDeleteProjectMutation,
  useGetProjectsByUserQuery,
} from "../../graphql/graphql";
import theme from "../../styles/theme";
import userUtils from "../../utils/userUtils";

export default function ProjectScreen() {
  const {
    data: projects,
    refetch,
    loading,
    fetchMore,
  } = useGetProjectsByUserQuery();

  return (
    <View style={styles.safeContainer}>
      <FlatList
        contentContainerStyle={styles.container}
        data={projects?.getProjectsByUser}
        renderItem={({ item }) => <ProjectCard project={item} />}
        ListEmptyComponent={() => <Text>pas de projets en cours</Text>}
        onRefresh={refetch}
        refreshing={loading}
        onEndReached={() => fetchMore}
        initialNumToRender={5}
        keyExtractor={(project) => project!.id}
      />
    </View>
  );
}

const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
  const navigation = useNavigation();
  const swipeableRef = useRef(null);
  const user = userUtils.getCurrentUser();

  const [deleteProjectMutation] = useDeleteProjectMutation({
    variables: {
      projectId: project?.id,
    },
    refetchQueries: "active",
    onCompleted: () => {
      Alert.alert("Projet supprimé", undefined);
    },
    onError: (e) => {
      Alert.alert("Erreur lors de la suppression", undefined);
      console.log(e);
    },
  });

  const deleteProject = () => {
    Alert.alert(
      "Supprimer le projet?",
      `Supprimer définitivement le projet : ${project?.name}`,
      [
        {
          text: "Non",
          onPress: () => {
            swipeableRef?.current.close();
          },
        },
        // The "Yes" button
        {
          text: "Oui",
          onPress: () => {
            deleteProjectMutation();
          },
        },
      ]
    );
  };

  const checkStatus = () => {
    if (user?.getCurrentUser?.role !== (RoleSite.Po || RoleSite.Admin)) {
      Alert.alert("tu n'as pas les droits");
      swipeableRef.current.close();
    }
  };

  const RightActions = () => {
    const actionOne: JSX.Element = (
      <TouchableOpacity
        style={styles.rightAction}
        key="actionOne"
        onPress={deleteProject}
      >
        <Ionicons name="trash" size={40} color="red" />
      </TouchableOpacity>
    );

    const actionTwo: JSX.Element = (
      <TouchableOpacity style={styles.rightAction} key="actionTwo">
        <Ionicons name="pencil" size={40} color="orange" />
      </TouchableOpacity>
    );
    if (user?.getCurrentUser?.role !== (RoleSite.Po || RoleSite.Admin))
      return null;
    return [actionOne, actionTwo];
  };

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={RightActions}
        onSwipeableRightWillOpen={checkStatus}
      >
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate("ProjetDetails", { projectId: project.id })
          }
        >
          <View style={styles.header} />
          <View style={styles.badge}>
            <Text
              style={[
                styles.textBadge,
                {
                  color: project.endAt ? theme.colors.done : theme.colors.open,
                },
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
    </>
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
    width: "100%",
  },
  header: {
    height: 2,
    marginBottom: 8,
    backgroundColor: "orange",
  },
  safeContainer: {
    height: "100%",
    marginHorizontal: 3,
  },
  badge: {
    padding: 4,
    borderRadius: 5,
    alignSelf: "flex-end",
    borderColor: "lightgray",
    borderStyle: "solid",
    borderWidth: 1,
  },
  textBadge: {
    fontSize: 10,
    fontWeight: "bold",
  },
  rightAction: {
    justifyContent: "center",
  },
});
