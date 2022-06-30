import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCreateCommentMutation } from "../../graphql/graphql";
import getUser from "../../utils/userUtils";
import Comments from "./CommentsScreen";

export default function OneTaskScreen({ route }: any) {
  const { task } = route.params;
  // const [content, setContent] = useState('');
  const [createComment, { data: comment }] = useCreateCommentMutation();
  const taskId = task.id;
  const [incorrectStyle, setIncorrectStyle] = useState(false);
  const [correctStyle, setCorrectStyle] = useState(false);
  const currentUser = getUser.getCurrentUser();
  const userId = currentUser!.getCurrentUser!.id;
  const [modalVisible, setModalVisible] = useState(false);

  

  return (
    <View style={{ flex: 1, minHeight: '100%' }}>
      <View>
        <Text>Titre: {task.name}</Text>
        <Text>Description: {task.description}</Text>
        <Text>Status: {task.status ? task.status : ""}</Text>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView>
                <Comments props={task.id} />
                <TouchableOpacity
                  style={styles.buttonCloseModal}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text>Fermer</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Ionicons name="chatbox-ellipses-outline" size={18} />
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
    padding: 10,
    borderRadius: 40,
    marginStart: 'auto',
    marginTop: 'auto',
  },
  buttonCloseModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
