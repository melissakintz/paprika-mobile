import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Project, useGetProjectsByUserQuery } from "../../graphql/graphql";

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
  } = useGetProjectsByUserQuery();

  return (
    <View style={styles.safeContainer}>
      <FlatList
        contentContainerStyle={styles.container}
        data={projects?.getProjectsByUser}
        renderItem={(project) => (
          <ProjectCard project={project.item} navigation={navigation} />
        )}
        ListEmptyComponent={() => <Text>pas de projets en cours</Text>}
        onRefresh={refetch}
        refreshing={loading}
        onEndReached={() => fetchMore}
        initialNumToRender={5}
      />
    </View>
  );
}

const ProjectCard = ({
  project,
  navigation,
}: {
  project: Project;
  navigation: NavigationStackScreenProps;
}): JSX.Element => {
  return (
    <>
      <Swipeable
        renderRightActions={RightAction}
        onSwipeableRightOpen={() => console.log("will delete")}
      >
        <Pressable
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
    </>
  );
};

const RightAction = () => {
  return (
    <TouchableOpacity style={styles.update}>
      <Ionicons name="trash" size={30} color="red" />
    </TouchableOpacity>
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
