import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress, disabled = false, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.btn, style]}
      activeOpacity={1}
    >
      <Text style={styles.textBtn}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FF6C00",
    padding: 16,
    borderRadius: 100,
  },
  textBtn: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto-400",
    fontSize: 16,
  },
});

export default CustomButton;
