import { useGetAllUsersQuery } from '../graphql/graphql';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { loggedIn } from '../Redux/login'

export default function LoginScreen() {
  const dispatch = useDispatch()
  const [incorrectStyle, setIncorrectStyle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: user } = useGetAllUsersQuery();
  const allUsers = user?.getAllUsers;
  function login() {
    if (allUsers !== undefined) {
      allUsers.forEach( user => {
        if (email === user.email && password === "paprika") {
          dispatch(loggedIn());
        } else {
          setIncorrectStyle(true);
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/paprika1.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#E33636"
          onChangeText={(email) => setEmail(email)}
          autoCompleteType="email"
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
      <Text style={incorrectStyle ? styles.incorrect : styles.hide}>Email ou mot de passe incorrect.</Text>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Mot de passe oublié?</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={login}
      >
        <Text style={{ color: '#F2F2F2' }}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9BFBF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40
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
    paddingLeft: 20
  },
  forgot_button: {
    height: 30,
    marginBottom: 10,
  },
  incorrect: {
    color: '#E33636',
    fontWeight: 'bold',
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
    display: 'none'
  }
});