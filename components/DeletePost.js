import React from "react";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const DeletePost = ({ onPress, style }) => {
  return (
    <View style={[styles.container, { style }]}>
      <TouchableOpacity onPress={onPress}>
        <DeleteIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 23,
    paddingLeft: 23,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
  },
});
export default DeletePost;
