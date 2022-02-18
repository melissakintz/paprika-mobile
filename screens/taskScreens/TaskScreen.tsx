import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useGetAllTasksQuery } from "../../graphql/graphql";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TaskScreen() {
  const { data: tasks } = useGetAllTasksQuery();
  console.log(tasks?.getAllTasks);

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
          <View
            style={[
              styles.card,
              item.status === "DONE" && styles.done,
              item.status === "INPROGRESS" && styles.inprogress,
              item.status === "OPEN" && styles.open,
            ]}
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
          </View>
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
  firstRow:{
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 8
  },
  description: {
    paddingTop: 16,
  },
});
