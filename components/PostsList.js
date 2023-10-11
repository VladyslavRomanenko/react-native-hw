import React from "react";
import { StyleSheet, View } from "react-native";
import Post from "./Post";
import { ScrollView } from "react-native-gesture-handler";

const PostsList = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        scrollEnabled={true}
      >
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
});

export default PostsList;
