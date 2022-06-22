import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from "react-native";
import { useGetCurrentUserQuery } from "../graphql/graphql";
import getUser from "../utils/userUtils";
import CurrentProjectCard from "./components/homeComponent/CurrentProjectCard";
import CurrentTaskCard from "./components/homeComponent/CurrentTaskCard";
import HelpCard from "./components/homeComponent/HelpCard";
import ProjectByRole from "./components/homeComponent/ProjectByRole";

const FadeInView = (props: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default function HomeScreen({ navigation }: any) {
  useEffect(() => {
    const getUserId = async () => {
      const user = await getUser.getUserToken();
      if (user == null) {
        navigation.navigate("Login");
      }
    };
    getUserId();
  }, []);

  async function logout() {
    await AsyncStorage.removeItem("@userToken");
    navigation.navigate("Login");
  }

  const [buttonConnection, setButtonConnection] = useState(false);
  const [modalCard, setModalCard] = useState(false);

  const currentUser = getUser.getCurrentUser();

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (buttonConnection == true) {
            setButtonConnection(false);
          } else {
            setButtonConnection(true);
          }
        }}
      >
        {buttonConnection ? (
          <>
            <TouchableOpacity
              style={styles.compteBtn}
              onPress={() => navigation.navigate("ProfilScreen", { currentUser })}
             >
              <Text style={{ color: "#F2F2F2", fontFamily: "Roboto" }}>Mon profil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Text style={{ color: "#F2F2F2", fontFamily: "Roboto" }}>Déconnexion</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.containerButtonLogin}>
            <View style={styles.menuButtonLogin}></View>
            <View style={styles.menuButtonLogin}></View>
            <View style={styles.menuButtonLogin}></View>
          </View>
        )}
      </TouchableOpacity>
      {/* <CalendarHome /> */}
      <View style={styles.containerLogo} >
        <FadeInView style={styles.containerImageAnimated}>
          <Image style={styles.img} source={require("../assets/paprika1.png")} />
        </FadeInView>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FadeInView style={styles.containerTextAnimated}>
          <Text style={styles.textAnimated}>Hello {currentUser?.getCurrentUser?.firstName}</Text>
        </FadeInView>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (modalCard == true) {
            setModalCard(false);
          } else {
            setModalCard(true);
          }
        }}
      >
        {modalCard ? (
          <>
            <View style={styles.viewContainer}>
              <View
                style={[
                  styles.containerLogoModal,
                  styles.containerLogoModalAfter,
                ]}
              >
                <Text style={styles.textModal}>Voir moins</Text>
                <Image
                  style={styles.imgArrowRotate}
                  source={require("../assets/arrowdown.png")}
                />
              </View>
              <HelpCard />
              <CurrentProjectCard />
              <CurrentTaskCard />
              <ProjectByRole />
            </View>
          </>
        ) : (
          <View style={styles.containerLogoModal}>
            <Text style={styles.textModal}>Tout les projets</Text>
            <Image style={styles.imgArrow} source={require("../assets/arrowdown.png")} />
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    opacity: 0.9,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerButtonLogin: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    width: 100,
    height: 100,
  },
  menuButtonLogin: {
    width: 35,
    height: 5,
    color: "black",
    backgroundColor: "black",
    marginBottom: 10,
    paddingRight: 10,
    marginRight: 20,
  },
  containerText: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "75%",
    padding: 20,
    margin: 10,
    backgroundColor: "#e6dcdc",
    borderRadius: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 1,
  },
  listProject: {
    color: "white",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 2,
  },
  containerIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  icon: {
    fontSize: 40,
  },
  img: {
    flex: 1,
    width: "auto",
  },
  containerLogo: {
    width: 200,
    marginTop: -30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  compteBtn: {
    width: "40%",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#095e79",
  },
  logoutBtn: {
    width: "40%",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#E33636",
  },
  textCenterBlack: {
    textAlign: "center",
    color: "black",
    marginLeft: "auto",
    display: "flex",
  },
  textPadding: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  containerLogoModal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 50,
  },
  imgArrow: {
    width: 20,
    height: "auto",
  },
  imgArrowRotate: {
    width: 20,
    height: "auto",
    transform: [{ rotate: "180deg" }],
  },
  textModal: {
    textTransform: "uppercase",
  },
  containerLogoModalAfter: {
    paddingBottom: 50
  },
  textAnimated: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    color: '#f94545',
    textDecorationStyle :"solid" ,
    textDecorationColor: "#f94545"
  },
  containerTextAnimated: {
    width: 250,
    height: 70,
    backgroundColor: '#EFEFEF',
    fontFamily: "Roboto"
  },
  containerImageAnimated: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    height: 300,
  }
});
