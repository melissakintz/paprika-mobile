import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoginMutation } from "../graphql/graphql";
import getUser from "../utils/userUtils";

export default function LoginScreen() {
  const [incorrectStyle, setIncorrectStyle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const userExists = async () => {
      const user = await getUser.getUserToken();
      if (!!user)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
    };
    userExists();
  });

  const [mutationLogin] = useLoginMutation();
  async function login() {
    mutationLogin({
      variables: { userLoginInput: { email, password } },
      onCompleted: async (user) => {
        setIncorrectStyle(false);
        await AsyncStorage.setItem("@userToken", user.login.token);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      },
      onError: () => {
        setIncorrectStyle(true);
      },
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <Image source={require("../assets/paprika1.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#E33636"
          onChangeText={(email) => setEmail(email)}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mot de passe"
          placeholderTextColor="#E33636"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <Text style={incorrectStyle ? styles.incorrect : styles.hide}>
        Email ou mot de passe incorrect.
      </Text>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Mot de passe oublié?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={{ color: "#F2F2F2" }}>Connexion</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9BFBF",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 1,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  TextInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
    paddingLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 10,
  },
  incorrect: {
    color: "#E33636",
    fontWeight: "bold",
    height: 30,
    marginBottom: 10,
  },
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#E33636",
  },
  hide: {
    display: "none",
  },
});
