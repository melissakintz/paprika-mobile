import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  useGetAllProjectsQuery,
  useGetAllTasksQuery,
  useGetAllUsersQuery,
  useGetUserQuery,
} from "../graphql/graphql";
import { loggedOut } from "../Redux/login";
import CalendarHome from "./homeComponent/Calendar";
import CurrentProjectCard from "./homeComponent/CurrentProjectCard";
import CurrentTaskCard from "./homeComponent/CurrentTaskCard";
import HelpCard from "./homeComponent/HelpCard";
import ProjectByRole from "./homeComponent/ProjectByRole";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const isLogged = useSelector((state: RootStateOrAny) => state.logged.value);
  const { getItem } = useAsyncStorage("userId");
  const [userId, setUserId] = useState("");

  const { data: project, error } = useGetAllProjectsQuery();
  const { data: tasks } = useGetAllTasksQuery();
  // console.log(project?.getAllProjects[0].description);
  const allTasksArray = tasks?.getAllTasks;
  const numberOfTasks = allTasksArray?.length;
  const allProjectArray = project?.getAllProjects;
  const numberOfProject = allProjectArray?.length;

  const [projectList, setProjectList] = useState(false);
  const [taskList, setTaskList] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [projectDescription, setProjectDescription] = useState(false);
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = currentUserTab.data?.getAllUsers[0].id;

  useEffect(() => {
    const getUserId = async () => {
      const id = await getItem();
      if (id) setUserId(id);
    };
    getUserId();
  }, []);

  useEffect(() => {
    if (!(userId || isLogged)) navigation.navigate("Login");
  }, [isLogged, userId]);

  async function logout() {
    dispatch(loggedOut());
    await AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
  }

  const { data: user, error: errorUser } = useGetUserQuery({
    variables: { userId: currentUser! },
  });
  console.log();
  const date = new Date();
  const currentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  return (
    <ScrollView>
      <CalendarHome />
      <Image style={styles.img} source={require("../assets/paprika1.png")} />
      <View style={styles.viewContainer}>
        <HelpCard />
        <CurrentProjectCard />
        <CurrentTaskCard />
        <ProjectByRole />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
    opacity: 0.9,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerText: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "75%",
    padding: 20,
    margin: 10,
    backgroundColor: "#e6dcdc",
    borderRadius: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 1,
  },
  listProject: {
    color: "white",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 2,
  },
  containerIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  icon: {
    fontSize: 40,
  },
  img: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "auto",
    marginLeft: "auto",
    paddingBottom: 50,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  compteBtn: {
    width: "40%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#095e79",
  },
  logoutBtn: {
    width: "40%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#E33636",
  },
  textCenterBlack: {
    textAlign: "center",
    color: "black",
    marginLeft: "auto",
    display: "flex",
  },
  textPadding: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
