import React, { useState } from "react";
import {
    ScrollView,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Appbar } from 'react-native-paper';

export default function CalendarHome() {

    const date = new Date();
    const currentDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="Calendrier" />
                <Appbar.Action icon="magnify" onPress={() => console.log('test')} />
                <Appbar.Action icon="dots-vertical" onPress={() => console.log('test')} />
            </Appbar.Header>
            <View>
                <Calendar
                    current={'2022-02-22'}
                    monthFormat={'dd MM yyyy'}
                    onMonthChange={month => {
                        console.log('month changed', month);
                    }}
                    hideArrows={false}
                    hideExtraDays={false}
                    disableMonthChange={false}
                    firstDay={1}
                />
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
    }
});