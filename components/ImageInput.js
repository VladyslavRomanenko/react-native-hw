import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AddPhotoIcon from "../assets/icons/AddPhotoIcon";

const ImageInput = ({ photo }) => {
  return (
    <View style={styles.photo} activeOpacity={1}>
      <ImageBackground style={styles.photoContainer} source={photo}>
        <AddPhotoIcon
          fill_color={photo ? "#E8E8E8" : "#FF6C00"}
          width={40}
          style={[
            styles.addBtn,
            {
              transform: photo ? [{ rotate: "0deg" }] : [{ rotate: "45deg" }],
            },
          ]}
          onPress={() => {
            console.log("object");
          }}
        />
      </ImageBackground>
    </View>
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
    left: Platform.OS === "ios" ? 130 : 143,
  },

  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginLeft: "auto",
    marginRight: "auto",
  },
  addBtn: {
    position: "absolute",
    right: -18,
    bottom: 10,
  },
});

export default ImageInput;
