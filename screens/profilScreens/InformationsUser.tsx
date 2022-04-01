import { isArray } from "@apollo/client/cache/inmemory/helpers";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGetUserQuery, useGetAllUsersQuery, ProjectRole } from "../../graphql/graphql";

export default function InformationsUser({
    name,
    information,
}: {
    name: string,
    information: string | Array<ProjectRole>
}) {
  const currentUserTab = useGetAllUsersQuery();
  const currentUser = currentUserTab.data?.getAllUsers[0].id;
  const { data: user, error: errorUser } = useGetUserQuery({
      variables: { userId: currentUser! },
  });
    return (
        <View style={styles.containerList}>
            <View>
                <Text style={[styles.textAlignLeft, styles.textSize , styles.textUnderline]}>{name}: </Text>
            </View>
            <View>
                {isArray(information) ? information.map(
                    (element, index)=> <Text style={styles.textAlignRight}>{element}</Text>
                    ) : <Text style={styles.textAlignRight}>{information}</Text>}
                
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