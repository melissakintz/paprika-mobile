import { StyleSheet, Text, View } from "react-native";
import getUser from "../../utils/userUtils";

export default function RoleCurrent() {
  const currentUser = getUser.getCurrentUser();
    return (
        <View style={styles.containerList}>
            <View>
                <Text style={[styles.textAlignLeft, styles.textSize , styles.textUnderline]}>Rôles: </Text>
            </View>
            <View>
                <Text style={styles.textAlignRight}>{currentUser?.getCurrentUser?.role}</Text>
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