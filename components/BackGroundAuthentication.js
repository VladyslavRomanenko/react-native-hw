import React from "react";
import bgImage from "../assets/bg-auth.png";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const BackGroundAuthentication = ({ children }) => {
  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.auth}
      >
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  auth: {
    backgroundColor: "white",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
});

export default BackGroundAuthentication;
