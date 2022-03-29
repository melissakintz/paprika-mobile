import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useGetAllUsersQuery, useGetUserQuery } from "../graphql/graphql";
import { loggedOut } from "../Redux/login";
import CalendarHome from "./homeComponent/Calendar";
import CurrentProjectCard from "./homeComponent/CurrentProjectCard";
import CurrentTaskCard from "./homeComponent/CurrentTaskCard";
import HelpCard from "./homeComponent/HelpCard";
import ProjectByRole from "./homeComponent/ProjectByRole";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  function logout() {
    dispatch(loggedOut());
  }

  const [buttonConnection, setButtonConnection] = useState(false);
  const [modalCard, setModalCard] = useState(false);
  const [taskList, setTaskList] = useState(false);
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = currentUserTab.data?.getAllUsers[0].id;

  const { data: user, error: errorUser } = useGetUserQuery({
    variables: { userId: currentUser! },
  });

  return (
    <ScrollView>
      <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if(buttonConnection == true) {
          setButtonConnection(false)
        } else {
          setButtonConnection(true)
        }
      }}
      >
        {buttonConnection ? (
          <>
            <TouchableOpacity
              style={styles.compteBtn}
              onPress={() => navigation.navigate("ProfilScreen", { user })}
              >
              <Text style={{ color: "#F2F2F2" }}>Mon compte</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={logout}
            >
              <Text style={{ color: "#F2F2F2" }}>Déconnexion</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.containerButtonLogin}>
            <View style={styles.menuButtonLogin}></View>
            <View style={styles.menuButtonLogin}></View>
            <View style={styles.menuButtonLogin}></View>
          </View>
        )}

      </TouchableOpacity>
      {/* <CalendarHome /> */}
      <View style={styles.containerLogo} >
        <Image style={styles.img} source={require("../assets/paprika1.png")} />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (modalCard == true) {
            setModalCard(false)
          } else {
            setModalCard(true)
          }
        }}
      >
        {modalCard ? (
          <>
        <View style={styles.viewContainer}>
          <HelpCard />
          <CurrentProjectCard />
          <CurrentTaskCard />
          <ProjectByRole />
        </View>
          </>
        ) : (
          <View>
            <Text>Voir plus</Text>
            <Image style={styles.img} source={require("../assets/arrowdown.png")} />
          </View>
        )}
      </TouchableOpacity>

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
  containerButtonLogin: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    width: 100,
    height: 100
  },
  menuButtonLogin: {
    width: 35,
    height: 5,
    color: "black",
    backgroundColor: "black",
    marginBottom: 10,
    paddingRight: 10,
    marginRight: 20
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
    width: "auto"
  },
  containerLogo: {
    width: 200,
    marginTop: -30,
    marginLeft: "auto",
    marginRight: "auto"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  compteBtn: {
    width: "40%",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#095e79",
  },
  logoutBtn: {
    width: "40%",
    borderRadius: 5,
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
