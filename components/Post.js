import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import exmplImage from "../assets/image-1.png";
import CommentIcon from "../assets/icons/CommentIcon";
import LocationIcon from "../assets/icons/LocationIcon";

const Post = () => {
  return (
    <View style={styles.post}>
      <Image source={exmplImage} style={styles.image} />
      <Text style={styles.text}>Wood</Text>
      <View style={styles.container}>
        <View style={styles.commentsContainer}>
          <TouchableOpacity activeOpacity={1}>
            <CommentIcon />
          </TouchableOpacity>
          <Text style={styles.amountComments}>0</Text>
        </View>
        <View style={styles.locationContainer}>
          <LocationIcon />
          <Text style={styles.textLocation}>Ivano-Frankivsk</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 32,
  },
  image: {
    width: 340,
    height: 240,
  },
  text: {
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: "Roboto-500",
    fontSize: 16,
    color: "#212121",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  amountComments: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-400",
  },
  textLocation: {
    fontSize: 16,
    fontFamily: "Roboto-400",
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default Post;
