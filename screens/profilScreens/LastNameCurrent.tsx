import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGetUserQuery, useGetAllUsersQuery } from "../../graphql/graphql";

export default function LastNameCurrent() {
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = currentUserTab.data?.getAllUsers[0].id;
  const { data: user, error: errorUser } = useGetUserQuery({
      variables: { userId: currentUser! },
  });
    return (
        <View style={styles.containerList}>
            <View>
                <Text style={[styles.textAlignLeft, styles.textSize , styles.textUnderline]}>Prénom: </Text>
            </View>
            <View>
                <Text style={styles.textAlignRight}>{currentUserTab.data?.getAllUsers[0].lastName}</Text>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
  containerList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  textAlignLeft: {
    textAlign: "left",
    justifyContent: "flex-start"
  },
  textAlignRight: {
    textAlign: "right",
    justifyContent: "flex-end"
  },
  textSize: {
    fontSize: 20
  },
  textUnderline: {
    textDecorationLine: "underline",
  }
});