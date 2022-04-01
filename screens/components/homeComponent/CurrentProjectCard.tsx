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

import { useGetAllProjectsQuery } from "../../../graphql/graphql";

export default function CurrentProjectCard() {
    const { data: project, error } = useGetAllProjectsQuery();
    const [projectList, setProjectList] = useState(false);
    const allProjectArray = project?.getAllProjects;
    const numberOfProject = allProjectArray?.length;
    const [projectDescription, setProjectDescription] = useState(false);

    return (
        <TouchableOpacity style={styles.containerText} onPress={() => {
            setProjectList(!projectList)
            }}>
            <Text style={styles.text}>Projets en cours</Text>
            <Text style={styles.text}>
                ({numberOfProject})
            </Text>
            <View>
                {projectList? (
                    <FlatList
                    data={project?.getAllProjects}
                        renderItem={(project) => (
                            <TouchableOpacity style={styles.textPadding} onPress={() => {
                                setProjectDescription(!projectDescription)
                        }}>
                            <Text> {project.item.name }</Text>
                                <Text> {project.item.client}</Text>
                                {projectDescription && (
                                    <Text style={[styles.textPadding, styles.textDescription]}>{ project.item.description}</Text>
                                )}
                        </TouchableOpacity>
                    )}
                />
                ) : (
                    <Text style={styles.textCenterBlack}>Cliquez pour en voir plus </Text>
                )}
            </View>
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
        textAlign: "left",
        color: "black",
        display: "flex"
    },
    textDescription: {
        fontStyle: "italic",
        fontWeight: "800",
        color: "grey",
    }
});