import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetAllTasksQuery } from "../../graphql/graphql";
import theme from "../../styles/theme";

export default function TaskScreen({ navigation }: any) {
  const { data: tasks } = useGetAllTasksQuery();

  const iconName = (item: any) => {
    if (item.status) {
      if (item.status === "DONE") return "pizza";
      if (item.status === "INPROGRESS") return "beer";
      if (item.status === "OPEN") return "flower";
    }
  };
  const iconColor = (item: any) => {
    if (item.status) {
      if (item.status === "DONE") return "#FF5C7A";
      if (item.status === "INPROGRESS") return "#FF8F5C";
      if (item.status === "OPEN") return "#7EA08B";
    }
  };

  const firstUpperCase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.taskContainer}>
      <FlatList
        data={tasks?.getAllTasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              item.status === "DONE" && styles.done,
              item.status === "INPROGRESS" && styles.inprogress,
              item.status === "OPEN" && styles.open,
            ]}
            onPress={() => navigation.navigate("OneTaskScreen", { task: item })}
          >
            <View style={styles.firstRow}>
              <Ionicons
                name={iconName(item)}
                color={iconColor(item)}
                size={32}
              />
              <Text style={styles.text}>{firstUpperCase(item.name)}</Text>
            </View>

            <Text style={styles.description}>
              {firstUpperCase(item.description)}
            </Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  card: {
    flex: 0.3,
    margin: 10,
    padding: 16,
    borderLeftWidth: 16,
  },
  done: {
    backgroundColor: theme.colors.done,
    borderLeftColor: "#FF5C7A",
  },
  inprogress: {
    backgroundColor: theme.colors.inprogress,
    borderLeftColor: "#FF8F5C",
  },
  open: {
    backgroundColor: theme.colors.open,
    borderLeftColor: "#7EA08B",
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 8,
  },
  description: {
    paddingTop: 16,
  },
});
