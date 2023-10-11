import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AddPostButton = ({ title, disabled, onPress, style }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.btn, { style }]}
      activeOpacity={1}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 30,
    textAlign: "center",
  },
});

export default AddPostButton;
