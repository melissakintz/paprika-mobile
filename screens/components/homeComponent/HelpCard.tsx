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

import { useGetAllProjectsLazyQuery, useGetAllProjectsQuery, useGetAllUsersQuery, useGetUserQuery } from "../../../graphql/graphql";
import { useGetAllTasksLazyQuery, useGetAllTasksQuery } from "../../../graphql/graphql";
import { useDispatch } from 'react-redux';

export default function HelpCard() {
    const [helpModal, setHelpModal] = useState(false);
    return (
        <TouchableOpacity style={styles.containerText} onPress={() => {
            if (helpModal == true) {
                setHelpModal(false)
            } else {
                setHelpModal(true)
            }
        }}>
            <Text style={styles.text}>Besoin d'aide ?</Text>
            {helpModal ? (
                <View>
                    <Text style={styles.textPadding}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab accusamus eum possimus perspiciatis provident ea reiciendis excepturi minima atque suscipit inventore, esse temporibus sapiente autem quod veniam totam voluptates voluptatibus.</Text>
                    <Text style={styles.textPadding}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium earum sequi nemo nihil nesciunt fuga obcaecati temporibus magni doloremque laborum laudantium necessitatibus harum odio fugiat tempore, modi, cupiditate non natus.</Text>
                    <Text style={styles.textPadding}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium earum sequi nemo nihil nesciunt fuga obcaecati temporibus magni doloremque laborum laudantium necessitatibus harum odio fugiat tempore, modi, cupiditate non natus.</Text>
                </View>
            ) : (
                <Text>Cliquez pour en voir plus </Text>
            )}
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
    }
});