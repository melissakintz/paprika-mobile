import { Text, View } from "react-native";

export default function ProfilScreen({ route }: object) {
  const { user } = route.params;
  const currentUser = user.getUser;
  return (
    <View>
      <Text>Nom: {currentUser.firstName }</Text>
      <Text>Prénom: {currentUser.lastName }</Text>
      <Text>Email:{currentUser.email }</Text>
      <Text>Rôle:{currentUser.role}</Text>
      <Text>Tâche(s) en cours:{currentUser.role}</Text>
    </View>
  );
}
