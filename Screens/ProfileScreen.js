import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackGroundAuthentication from "../components/BackGroundAuthentication";
import LogoutIcon from "../assets/icons/LogoutIcon";
import ImageInput from "../components/ImageInput";
import bgImage from "../assets/bg-auth.png";
import { useNavigation } from "@react-navigation/core";
import PostsList from "../components/PostsList";
import photo from "../assets/photo_natali.png";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={bgImage} style={styles.image}>
      <View style={styles.container}>
        <ImageInput />
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={1}
          onPress={() => navigation.navigate("Login")}
        >
          <LogoutIcon />
        </TouchableOpacity>
        <Text style={styles.name}>Natali Romanova</Text>
        <PostsList></PostsList>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 203,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  logoutBtn: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  name: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-500",
    color: "#212121",
    letterSpacing: 0.3,
    marginBottom: 33,
  },
});

export default ProfileScreen;
