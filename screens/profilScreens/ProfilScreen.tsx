import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGetUserQuery, useGetAllUsersQuery, useGetProjectRolesQuery } from "../../graphql/graphql";
import Ionicons from "@expo/vector-icons/Ionicons";
import TaskProgress from "./TaskProgress";
import InformationsUser from "./InformationsUser";

export default function ProfilScreen({ route }: object) {
  const { user } = route.params;
  const currentUser = user.getCurrentUser();
  const {
    data: roleUser,
    error,
  } = useGetProjectRolesQuery();

  return (
    <View style={styles.containerBig}>
      <View style={styles.container}>
        <InformationsUser name={"Nom"} information={currentUser.firstName}/>
        <InformationsUser name={"Prénom"} information={currentUser.lastName}/>
        <InformationsUser name={"Email"} information={currentUser.email}/>
        <InformationsUser name={"Rôle"} information={currentUser.role}/>
      </View>
    <TaskProgress />

    </View>
  );
}

const styles = StyleSheet.create({
  containerBig: {
    backgroundColor: "white",
    flex: 1,
    padding: 20
  },
  container: {
    backgroundColor: "#e6dcdc",
    justifyContent: "space-between",
    borderRadius: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 1
  },
  containerList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  textAlignLeft: {
    textAlign: "left",
    justifyContent: "flex-start"
  },
  textAlignRight: {
    textAlign: "right",
    justifyContent: "flex-end"
  },
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
  textUnderline: {
    textDecorationLine: "underline",
  }
});