import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TaskProgress from "./TaskProgress";
import NameCurrent from "./NameCurrent";
import LastNameCurrent from "./LastNameCurrent";
import EmailCurrent from "./EmailCurrent";
import RoleCurrent from "./RoleCurrent";

export default function ProfilScreen({ route }: object) {
  const { user } = route.params;
  const currentUser = user.getUser;
  return (
    <View style={styles.containerBig}>
      <View style={styles.container}>
        <NameCurrent />
        <LastNameCurrent />
        <EmailCurrent />
        <RoleCurrent />
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