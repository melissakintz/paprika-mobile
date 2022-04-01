import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGetUserQuery, useGetAllUsersQuery, useGetProjectRolesQuery } from "../../graphql/graphql";

export default function RoleCurrentProject() {

  const {
    data: roleUser,
    error,
  } = useGetProjectRolesQuery();
    return (
        <View style={styles.containerList}>
            <View>
                <Text style={[styles.textAlignLeft, styles.textSize , styles.textUnderline]}>Rôle: </Text>
            </View>
            <View>
            <FlatList
            data={roleUser?.getProjectRoles}
            renderItem={(project) => (
              <View>
                <Text >{project.item?.name}</Text>
              </View>
            )}      
            ListEmptyComponent={() => <Text>Pas de rôle assigné</Text>}
          />
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