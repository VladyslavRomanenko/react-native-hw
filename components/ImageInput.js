import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AddPhotoIcon from "../assets/icons/AddPhotoIcon";

const ImageInput = () => {
  return (
    <TouchableOpacity style={styles.photo} activeOpacity={1}>
      <AddPhotoIcon
        fill_color="#FF6C00"
        width={40}
        style={styles.addBtn}
        onPress={() => {}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: 125,
  },
  addBtn: {
    position: "absolute",
    right: -18,
    bottom: 10,
    transform: [{ rotate: "45deg" }],
  },
});

export default ImageInput;
