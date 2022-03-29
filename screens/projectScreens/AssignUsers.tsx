import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import {
  Project,
  useAssignUsersToProjectMutation,
  useGetAllUsersQuery,
  useGetProjectRolesQuery,
} from "../../graphql/graphql";
import ProjectContainer from "../components/projectComponent/ProjectContainer";

export default function AssignUsers({
  route,
}: {
  route: RouteProp<{ params: { project: Project } }, "params">;
}): JSX.Element {
  const { project } = route.params;

  return (
    <ProjectContainer>
      <Text style={styles.title}>{project.name}</Text>
      <Text style={styles.client}>
        <Ionicons name="person" /> {project.client}
      </Text>
      <CreateForm project={project} />
    </ProjectContainer>
  );
}

const CreateForm = ({ project }: { project: Project }): JSX.Element => {
  const { data: users } = useGetAllUsersQuery();
  const { data: roles } = useGetProjectRolesQuery();
  const [assignUsers] = useAssignUsersToProjectMutation({
    refetchQueries: ["GetProjectsByUser"],
  });
  const [assignees, setAssignees] = useState<
    Array<{ userId: string; roleId: string }>
  >([]);

  const handlePress = (isChecked: boolean, user: string, role: string) => {
    if (isChecked) {
      setAssignees((prev) => [...prev, { userId: user, roleId: role }]);
    } else {
      setAssignees((prev) => prev.filter((el) => el.userId !== user));
    }
  };

  const handleValidation = () => {
    assignUsers({
      variables: { projectId: project.id, usersRoles: assignees },
    });
  };

  return (
    <View>
      <FlatList
        scrollEnabled
        data={users?.getAllUsers}
        renderItem={(user) => (
          <View style={styles.list}>
            <Text style={styles.title}>
              <Ionicons name="person" color={"gray"} size={16} />
              {user.item.email}{" "}
            </Text>
            <FlatList
              horizontal={true}
              data={roles?.getProjectRoles}
              renderItem={(role) => (
                <BouncyCheckbox
                  size={25}
                  fillColor="orange"
                  unfillColor="#FFFFFF"
                  text={`${role.item?.name}`}
                  iconStyle={{ borderColor: "orange" }}
                  onPress={(isChecked: boolean) => {
                    handlePress(isChecked, user.item.id, role.item.id);
                  }}
                />
              )}
            />
          </View>
        )}
      />
      <Button color="green" onPress={handleValidation}>
        Valider
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  client: {
    color: "gray",
    textTransform: "uppercase",
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  workers: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  worker: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: "orange",
    justifyContent: "center",
  },
  checkbox: {
    textDecorationLine: "none",
  },
  list: {
    marginVertical: 20,
  },
});
