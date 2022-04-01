import { StyleSheet, View } from "react-native";
import getUser from "../../utils/userUtils";
import EmailCurrent from "./EmailCurrent";
import LastNameCurrent from "./LastNameCurrent";
import NameCurrent from "./NameCurrent";
import RoleCurrent from "./RoleCurrent";
import TaskProgress from "./TaskProgress";

export default function ProfilScreen({ route }: object) {
  const { user } = route.params;
  const currentUser = getUser.getCurrentUser();
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