import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProjectContainer({
  children,
}: {
  children: any;
}): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    marginVertical: 10,
  },
  header: {
    height: 2,
    marginBottom: 8,
    backgroundColor: "orange",
  },
});
