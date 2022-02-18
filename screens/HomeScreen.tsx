import React, { useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import img from "../assets/paprika1.png";
import { Appbar } from 'react-native-paper';
import { useGetAllProjectsLazyQuery, useGetAllProjectsQuery } from "../graphql/graphql";
import { useGetAllTasksLazyQuery, useGetAllTasksQuery } from "../graphql/graphql";

export default function HomeScreen() {
    
    // const [project, setProject] = useState('');
    // const [task, setTask] = useState('');

    const { data: project, error } = useGetAllProjectsQuery();
    console.log(project?.getAllProjects[0].description)

    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => console.log('test')} />
                <Appbar.Content title="Calendar" />
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
                <Ionicons style={styles.icon} name='arrow-back-circle-outline' />
                <Ionicons style={styles.icon} name='help-circle-outline' />
            </View>
            <Image
                style={styles.img}
                source={img}
            />
            <View style={styles.viewContainer}>
                <View style={styles.containerText}>
                    <Text style={styles.text}>Le futur est par ici</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.text}>Projets en cours</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.text}>Tâches en attentes</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        backgroundColor: "#E33636",
        opacity: 0.9,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    containerText: {
        width: "50%",
        padding: 20,
    },
    text: {
        textTransform: "uppercase",
        fontWeight: "bold"
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
    }
});