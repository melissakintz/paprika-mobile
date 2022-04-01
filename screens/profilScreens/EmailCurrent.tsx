import { StyleSheet, Text, View } from "react-native";
import { useGetAllUsersQuery } from "../../graphql/graphql";
import getUser from "../../utils/userUtils";

export default function EmailCurrent() {
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = getUser.getCurrentUser();
    return (
        <View style={styles.containerList}>
            <View>
                <Text style={[styles.textAlignLeft, styles.textSize , styles.textUnderline]}>Email: </Text>
            </View>
            <View>
                <Text style={styles.textAlignRight}>{currentUser?.getCurrentUser?.email}</Text>
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