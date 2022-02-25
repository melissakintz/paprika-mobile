import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGetUserQuery, useGetAllUsersQuery } from "../../graphql/graphql";

export default function taskProgress() {
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = currentUserTab.data?.getAllUsers[0].id;
  const { data: user, error: errorUser } = useGetUserQuery({
      variables: { userId: currentUser! },
  });
  return (
    <View style={styles.containerTask}>
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