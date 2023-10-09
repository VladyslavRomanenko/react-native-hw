import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ImageInput = () => {
  return (
    <TouchableOpacity style={styles.photo} activeOpacity={1} onPress={() => {}}>
      <FontAwesome5
        name="plus-circle"
        size={25}
        color="#FF6C00"
        backgroundColor="#fafafa"
        style={styles.plusBtn}
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
  plusBtn: {
    position: "absolute",
    right: -12,
    bottom: 20,
  },
});

export default ImageInput;
