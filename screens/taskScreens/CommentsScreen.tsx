import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCreateCommentMutation, useGetCommentsByTaskQuery } from "../../graphql/graphql";
import getUser from "../../utils/userUtils";

export default function CommentsScreen({ props }: any) {

  const { data: comments } = useGetCommentsByTaskQuery({ variables: { taskId: props } });
  const currentUser = getUser.getCurrentUser();
  const taskId = props.toString();
  const userId = currentUser!.getCurrentUser!.id;
  const [incorrectStyle, setIncorrectStyle] = useState(false);
  const [correctStyle, setCorrectStyle] = useState(false);
  const [content, setContent] = useState('');
  const [createComment, { data: comment }] = useCreateCommentMutation();

  async function sendNewComment() {
    try {
      await createComment({ variables: { commentInput: { content, taskId, userId } } });
      setCorrectStyle(true);
    } catch (error) {
      console.log(error);
      setIncorrectStyle(true);
    }
  }

  return (
    <View>
      <FlatList
        data={comments?.getCommentsByTask}
        renderItem={({ item }) => (
          <View style={styles.commentsList}>
            <Text style={styles.commentName}>{item.user?.email}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      ></FlatList>
      <View style={styles.inputBox}>
        <Text>Ajouter un commentaire</Text>
        <TextInput
          style={styles.input}
          onChangeText={setContent}
          value={content}
          placeholder={'Nouveau commentaire'} />
        <Text style={incorrectStyle ? styles.incorrect : styles.hide}>Message invalide, veuillez réessayer.</Text>
        <Text style={correctStyle ? styles.succes : styles.hide}>Commentaire ajouté avec succès.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={sendNewComment}>
          <Ionicons name="paper-plane-outline" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentsList: {
    marginVertical: 10,
    borderWidth: 2,
    padding: 5
  },
  commentName: {
    marginLeft: 'auto',
    marginRight: 5
  },
  button: {
    backgroundColor: "#45C8F1",
    width: 40,
    height: 40,
    padding: 10,
    borderRadius: 40,
    marginStart: 'auto',
    marginTop: 'auto',
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
  },
  input: {
    minHeight: 40,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
  },
  inputBox: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 10
  }
});