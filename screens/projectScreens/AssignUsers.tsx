import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import {
  Project,
  useAssignUsersToProjectMutation,
} from "../../graphql/graphql";

export default function AssignUsers({
  route,
}: {
  route: RouteProp<{ params: { project: Project } }, "params">;
}): JSX.Element {
  const [assignUsers] = useAssignUsersToProjectMutation();
  const { project } = route.params;
  console.log(project);

  return <Text>sdfsd</Text>;
}
