import React from "react";
import { StyleSheet, View } from "react-native";
import PostsScreen from "./PostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsIcon from "../assets/icons/PostsIcon";
import AddPhotoIcon from "../assets/icons/AddPhotoIcon";
import UserIcon from "../assets/icons/UserIcon";
import CreatePostIcon from "../assets/icons/CreatePostIcon";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <Tabs.Navigator
        initialRouteName="Posts"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Posts") {
              return <PostsIcon />;
            } else if (route.name === "Create") {
              return <CreatePostIcon />;
            } else if (route.name === "Profile") {
              return <UserIcon />;
            }
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tabs.Screen
          name="Posts"
          options={{ headerShown: false, tabBarLabel: "" }}
          component={PostsScreen}
        />
        <Tabs.Screen
          name="Create"
          options={{
            headerShown: false,
            tabBarLabel: "",
          }}
          component={CreatePostsScreen}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarLabel: "",
          }}
          component={ProfileScreen}
        />
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
