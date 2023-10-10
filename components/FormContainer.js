import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

const FormContainer = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
