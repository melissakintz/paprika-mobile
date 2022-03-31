import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";
import { useCreateCommentMutation } from "../../graphql/graphql";
import Comments from "./CommentsScreen";

export default function OneTaskScreen({ route }: any) {
  const { task } = route.params;
  const [content, setContent] = useState('');
  const [createComment, { data: comment }] = useCreateCommentMutation();
  const userConnected = useSelector((state: RootStateOrAny) => state.userlogged);
  const userId = userConnected.value.id
  const taskId = task.id;
  const [incorrectStyle, setIncorrectStyle] = useState(false);
  const [correctStyle, setCorrectStyle] = useState(false);

  async function sendNewComment() {
    try{
      await createComment({variables: {commentInput: {content, taskId, userId}}});
      setCorrectStyle(true);
    } catch(error) {
      console.log(error);
      setIncorrectStyle(true);
    }
  }

  return (
    <View style={{ flex: 1}}>
      <View>
        <Text>Titre: {task.name}</Text>
        <Text>Description: {task.description}</Text>
        <Text>Status: {task.status ? task.status : ""}</Text>
      </View>
      <View>
        <Comments props={task.id}/>
        <TextInput 
          onChangeText={setContent}
          value={content}
          placeholder={'Nouveau commentaire'}/>
        <Text style={incorrectStyle ? styles.incorrect : styles.hide}>Message invalide, veuillez réessayer.</Text>
        <Text style={correctStyle ? styles.succes : styles.hide}>Commentaire ajouté avec succès.</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={sendNewComment}>
          <Ionicons name="paper-plane-outline" size={18}/>
        </TouchableOpacity>
          
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#45C8F1",
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
  },
  hide: {
    display: 'none'
  },
  incorrect: {
    color: '#E33636',
    fontWeight: 'bold',
    height: 30,
    marginBottom: 10,
  },
  succes: {
    color: '#45C8F1',
    fontWeight: 'bold',
    height: 30,
    marginBottom: 10,
  }
});
