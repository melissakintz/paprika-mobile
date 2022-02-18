import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loggedOut } from '../Redux/login';

export default function HomeScreen() {
    const dispatch = useDispatch();

    function logout() {
        dispatch(loggedOut())
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.logoutBtn}
                onPress={logout}
            >
                <Text style={{ color: '#F2F2F2' }}>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C9BFBF',
        alignItems: 'center',
        justifyContent: 'center',
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
});
