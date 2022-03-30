import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Project, useGetUserQuery, useGetAllUsersQuery ,useGetProjectsByUserQuery } from "../../graphql/graphql";

export default function taskProgress() {
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = currentUserTab.data?.getAllUsers[0].id;
  const { data: user, error: errorUser } = useGetUserQuery({
      variables: { userId: currentUser! },
  });
  const {
    data: projects,
    refetch,
    loading,
    fetchMore,
  } = useGetProjectsByUserQuery();

  console.log(projects?.getProjectsByUser + "test")



  return (
    <View style={styles.containerTask}>
      <FlatList
        data={projects?.getProjectsByUser}
        renderItem={(project) => (project.item?.client)}
        onRefresh={refetch}
        refreshing={loading}
        onEndReached={() => fetchMore}
        initialNumToRender={5}
        keyExtractor={(project) => project.id}
      />
        <View>
          <Text style={[styles.textCenter, styles.textSize]}>Tâche(s) en cours: </Text>
        </View>
        <View>
          <Text>{currentUser?.task} "une simple task ecrite en dur"</Text>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
containerTask: {
    paddingTop: 30
    },
    textCenter: {
    textAlign: "center",
    textDecorationLine: "underline",
    paddingBottom: 20,
    },
    textSize: {
    fontSize: 20
    },
});