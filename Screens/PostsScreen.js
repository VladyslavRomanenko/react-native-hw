import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { useNavigation, useRoute } from "@react-navigation/core";

const PostsScreen = () => {
  const navigation = useNavigation();
  // const {
  //   params: { login, email },
  // } = useRoute();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={require("../assets/photo_natali.png")} />
        <View>
          <Text style={styles.name}>Example</Text>
          <Text style={styles.email}>Example.com.ua</Text>
        </View>
      </View>
      <View>
        <Text> POSTS</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  userInfo: {
    flexDirection: "row",
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
  },
  name: {
    fontFamily: "Roboto-700",
    fontSize: 13,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-400",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.80)",
  },
});

export default PostsScreen;
