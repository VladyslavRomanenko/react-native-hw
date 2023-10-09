import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

const FormContainer = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
  },
});

export default FormContainer;
