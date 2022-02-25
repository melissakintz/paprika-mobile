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
import { Appbar } from 'react-native-paper';

import { useGetAllProjectsLazyQuery, useGetAllProjectsQuery, useGetAllUsersQuery, useGetUserQuery } from "../../graphql/graphql";
import { useGetAllTasksLazyQuery, useGetAllTasksQuery } from "../../graphql/graphql";
import { useDispatch } from 'react-redux';

export default function ProjectByRole() {
    const { data: tasks } = useGetAllTasksQuery();
    const allTasksArray = tasks?.getAllTasks;
    const numberOfTasks = allTasksArray?.length;
    const [taskList, setTaskList] = useState(false);
    return (
        
        <TouchableOpacity style={styles.containerText} onPress={() => {
            if (taskList == true) {
                setTaskList(false);
            } else {
                setTaskList(true);
            }
        }}>
            <Text style={styles.text}>Projet par rôle</Text>
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
                    <Text style={styles.textCenterBlack}>Cliquez pour en voir plus </Text>)}
            </Text> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
        borderRightWidth: 1
    },
    textPadding: {
        paddingTop: 20,
        paddingBottom: 20
    },
    text: {
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: 2
    },
    textCenterBlack: {
        textAlign: "center",
        color: "black",
        marginLeft: "auto",
        display: "flex"
    },
    listProject: {
        color: "white"
    }
});