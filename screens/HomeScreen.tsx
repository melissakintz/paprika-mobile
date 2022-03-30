import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useGetAllUsersQuery, useGetUserQuery } from "../graphql/graphql";
import { loggedOut } from "../Redux/login";
import getUser from "../utils/userUtils";
import CalendarHome from "./components/homeComponent/Calendar";
import CurrentProjectCard from "./components/homeComponent/CurrentProjectCard";
import CurrentTaskCard from "./components/homeComponent/CurrentTaskCard";
import HelpCard from "./components/homeComponent/HelpCard";
import ProjectByRole from "./components/homeComponent/ProjectByRole";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const isLogged = useSelector((state: RootStateOrAny) => state.logged.value);

  useEffect(() => {
    const getUserId = async () => {
      const user = await getUser();
      if (user !== null) {
        setUserId(user.id);
      }
    };
    getUserId();
  }, [userId]);

  useEffect(() => {
    if (!(userId || isLogged)) navigation.navigate("Login");
  }, [isLogged, userId]);

  async function logout() {
    dispatch(loggedOut());
    await AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
  }

  const [taskList, setTaskList] = useState(false);
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = currentUserTab.data?.getAllUsers[0].id;

  const { data: user, error: errorUser } = useGetUserQuery({
    variables: { userId: currentUser! },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.compteBtn}
          onPress={() => navigation.navigate("ProfilScreen", { user })}
        >
          <Text style={{ color: "#F2F2F2" }}>Mon compte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={{ color: "#F2F2F2" }}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
      <CalendarHome />
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
