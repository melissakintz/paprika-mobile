import React, { useState } from "react";
import {
    ScrollView,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import img from "../assets/paprika1.png";
import { Appbar } from 'react-native-paper';

import { useGetAllProjectsLazyQuery, useGetAllProjectsQuery } from "../graphql/graphql";
import { useGetAllTasksLazyQuery, useGetAllTasksQuery } from "../graphql/graphql";
import { useDispatch } from 'react-redux';
import { loggedOut } from '../Redux/login';

import ProjectScreen from "./projectScreens/ProjectScreen";
import ProjectDetails from "./projectScreens/ProjectDetails";

import { NavigationRouteContext, TabRouter, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export default function HomeScreen() {
    const dispatch = useDispatch();
    function logout() {
        dispatch(loggedOut())
    }

    const { data: project, error } = useGetAllProjectsQuery();
    const { data: tasks, errorTasks } = useGetAllTasksQuery();
    // console.log(project?.getAllProjects[0].description);
    const allTasksArray = tasks?.getAllTasks;
    const numberOfTasks = allTasksArray?.length;
    const allProjectArray = project?.getAllProjects;
    const numberOfProject = allProjectArray?.length;

    const [projectList, setProjectList] = useState(false);
    const [taskList, setTaskList] = useState(false);


    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.compteBtn}
                    onPress={logout}
                >
                    <Text style={{ color: '#F2F2F2' }}>Mon compte</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={logout}
                >
                    <Text style={{ color: '#F2F2F2' }}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
            <Appbar.Header>
                {/* <Appbar.BackAction onPress={() => console.log('test')} /> */}
                <Appbar.Content title="Calendrier" />
                <Appbar.Action icon="magnify" onPress={() => console.log('test')} />
                <Appbar.Action icon="dots-vertical" onPress={() => console.log('test')} />
            </Appbar.Header>
            <View>
                <Calendar
                    // Initially visible month. Default = Date()
                    current={'2021-10-30'}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'dd MM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={month => {
                        console.log('month changed', month);
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
            <View style={styles.containerIcon}>
                <Ionicons style={styles.icon} name='arrow-back-circle-outline' onPress={() => console.log('test')}/>
                <Ionicons style={styles.icon} name='help-circle-outline' onPress={() => console.log('test')}/>
            </View>
            <Image
                style={styles.img}
                source={img}
            />
            <View style={styles.viewContainer}>
                <View style={styles.containerText}>
                    <Text style={styles.text}>Besoin d'aide ?</Text>
                </View>
                <TouchableOpacity style={styles.containerText} onPress={() => {
                        if (projectList == true) {
                            setProjectList(false);
                        } else {
                            setProjectList(true);
                        }
                    }}>
                    <Text style={styles.text}>Projets en cours</Text>
                    <Text style={styles.text}>
                        ({numberOfProject})
                    </Text>
                    <Text style={styles.listProject}>
                        {projectList? (
                        <FlatList
                            data={project?.getAllProjects}
                            renderItem={(project) => (
                                <Text> {project.item.name }</Text>
                            )}
                        />
                        ) : (
                                <Text style={styles.textCenterBlack}>Cliquez pour en voir plus </Text>
                        )}

                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerText} onPress={() => {
                    if (taskList == true) {
                        setTaskList(false);
                    } else {
                        setTaskList(true);
                    }
                }}>
                    <Text style={styles.text}>Tâches en attentes</Text>
                    <Text style={styles.text}>({numberOfTasks})</Text>
                    <Text style={styles.listProject}>
                        {taskList ? (
                            <FlatList
                                data={tasks?.getAllTasks}
                                renderItem={(tasks) => (
                                    <View>
                                        <Text>{tasks.item.name}</Text>
                                        <Text>Priorité : {tasks.item.priority}</Text>
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={styles.textCenterBlack}>Cliquez pour en voir plus </Text>)}
                    </Text> 
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}




const styles = StyleSheet.create({
    viewContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        opacity: 0.9,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    containerText: {
        position: "relative",
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
        borderRightWidth: 1
    },
    listProject: {
        color: "white"
    },
    text: {
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: 2
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
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingBottom: 50
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
        display: "flex"
    }
});