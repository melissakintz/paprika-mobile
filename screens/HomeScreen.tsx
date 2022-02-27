import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Appbar } from "react-native-paper";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  useGetAllProjectsQuery,
  useGetAllTasksQuery,
  useGetAllUsersQuery,
  useGetUserQuery,
} from "../graphql/graphql";
import { loggedOut } from "../Redux/login";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const isLogged = useSelector((state: RootStateOrAny) => state.logged.value);
  const { getItem } = useAsyncStorage("userId");
  const [userId, setUserId] = useState("");

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

  const { data: user, error: errorUser } = useGetUserQuery({
    variables: { userId: currentUser! },
  });
  console.log();
  const date = new Date();
  const currentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

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
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => console.log('test')} /> */}
        <Appbar.Content title="Calendrier" />
        <Appbar.Action icon="magnify" onPress={() => console.log("test")} />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => console.log("test")}
        />
      </Appbar.Header>
      <View>
        <Calendar
          // Initially visible month. Default = Date()
          current={"2022-02-22"}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"dd MM yyyy"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
        />
      </View>
      <Image style={styles.img} source={require("../assets/paprika1.png")} />
      <View style={styles.viewContainer}>
        <TouchableOpacity
          style={styles.containerText}
          onPress={() => {
            if (helpModal == true) {
              setHelpModal(false);
            } else {
              setHelpModal(true);
            }
          }}
        >
          <Text style={styles.text}>Besoin d'aide ?</Text>
          {helpModal ? (
            <View>
              <Text style={styles.textPadding}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                accusamus eum possimus perspiciatis provident ea reiciendis
                excepturi minima atque suscipit inventore, esse temporibus
                sapiente autem quod veniam totam voluptates voluptatibus.
              </Text>
              <Text style={styles.textPadding}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium earum sequi nemo nihil nesciunt fuga obcaecati
                temporibus magni doloremque laborum laudantium necessitatibus
                harum odio fugiat tempore, modi, cupiditate non natus.
              </Text>
              <Text style={styles.textPadding}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium earum sequi nemo nihil nesciunt fuga obcaecati
                temporibus magni doloremque laborum laudantium necessitatibus
                harum odio fugiat tempore, modi, cupiditate non natus.
              </Text>
            </View>
          ) : (
            <Text>Cliquez pour en voir plus </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerText}
          onPress={() => {
            setProjectList(!projectList);
          }}
        >
          <Text style={styles.text}>Projets en cours</Text>
          <Text style={styles.text}>({numberOfProject})</Text>
          <View>
            {projectList ? (
              <FlatList
                data={project?.getAllProjects}
                renderItem={(project) => (
                  <TouchableOpacity
                    style={styles.textPadding}
                    onPress={() => {
                      setProjectDescription(!projectDescription);
                    }}
                  >
                    <Text> {project.item.name}</Text>
                    <Text> {project.item.client}</Text>
                    {projectDescription && (
                      <Text style={styles.textPadding}>
                        {project.item.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.textCenterBlack}>
                Cliquez pour en voir plus{" "}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerText}
          onPress={() => {
            if (taskList == true) {
              setTaskList(false);
            } else {
              setTaskList(true);
            }
          }}
        >
          <Text style={styles.text}>Tâches en attentes</Text>
          <Text style={styles.text}>({numberOfTasks})</Text>
          <Text style={styles.listProject}>
            {taskList ? (
              <FlatList
                data={tasks?.getAllTasks}
                renderItem={(tasks) => (
                  <View style={styles.textPadding}>
                    <Text>{tasks.item.name}</Text>
                    <Text>Priorité : {tasks.item.priority}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.textCenterBlack}>
                Cliquez pour en voir plus{" "}
              </Text>
            )}
          </Text>
        </TouchableOpacity>
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
