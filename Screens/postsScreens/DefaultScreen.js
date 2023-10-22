import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";

import { PostItem } from "../../components/PostItem";
import { db } from "../../firebase/config";
import { selectUser } from "../../redux/auth/authSelectors";
import { Border, Color, FontFamily, FontSize } from "../../styles/globalStyles";

export const DefaultScreen = () => {
  const [posts, setPosts] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, "posts"), (doc) => {
        const allPosts = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);
        setPosts(allPosts);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: user.avatar }} style={styles.image} />
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: Color.white,
    paddingTop: 32,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: Border.s,
  },
  userName: {
    fontFamily: FontFamily.robotoBold,
    fontSize: FontSize.s,
    color: Color.dark,
  },
  userEmail: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.xs,
    color: Color.fogGray,
  },
});
