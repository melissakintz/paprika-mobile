import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "../../graphql/graphql";

export default function OneTaskScreen({
  route,
}: {
  route: RouteProp<{ params: { task: Task } }, "params">;
}) {
  const { task } = route.params;

  return (
    <View style={styles.oneTaskContainer}>
      <Text style={styles.title}>{task.name.toUpperCase()}</Text>
      <TouchableOpacity
        style={[
          styles.btn,
          task.status === "DONE" && styles.done,
          task.status === "INPROGRESS" && styles.inprogress,
          task.status === "OPEN" && styles.open,
        ]}
      >
        <Text>{task.status}</Text>
      </TouchableOpacity>
      <View style={styles.description}>
        <Text style={styles.label}>Description :</Text>
        <Text style={styles.text}>{task.description}</Text>
      </View>
      <View>
        <FlatList
          data={task.users}
          renderItem={(item) => (
            <View style={styles.userCard}>
              <View style={styles.avatar}>
                <Ionicons name="person-outline" color="white" size={32} />
              </View>
              <View>
                <Text style={styles.names}>
                  {item.item.firstName} {item.item.lastName.toUpperCase()}
                </Text>
                <Text>{item.item.email}</Text>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  oneTaskContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  title: {
    marginBottom: 8,
    fontSize: 32,
    fontWeight: "bold",
  },
  btn: {
    padding: 8,
    marginBottom: 40,
    borderLeftWidth: 16,
  },
  done: {
    backgroundColor: "#ffcad4",
    borderLeftColor: "#FF5C7A",
  },
  inprogress: {
    backgroundColor: "#ffe5d9",
    borderLeftColor: "#FF8F5C",
  },
  open: {
    backgroundColor: "#d8e2dc",
    borderLeftColor: "#7EA08B",
  },
  description: {
    backgroundColor: "white",
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  text: {
    textAlign: "justify",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 4,
    borderColor: "white",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    width: 48,
    height: 48,
    borderRadius: 100,
    marginRight: 16,
  },
  names: {
    fontWeight: "bold",
  },
});
