import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostsScreen from "./PostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsIcon from "../assets/icons/PostsIcon";
import ArrowIcon from "../assets/icons/ArrowIcon";
import AddPhotoIcon from "../assets/icons/AddPhotoIcon";
import UserIcon from "../assets/icons/UserIcon";
import CreatePostIcon from "../assets/icons/CreatePostIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { useNavigation } from "@react-navigation/core";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
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
          // tabBarActiveTintColor: "tomato",
          // tabBarInactiveTintColor: "gray",
        })}
      >
        <Tabs.Screen
          name="Posts"
          options={{
            title: "Публікації",
            tabBarLabel: "",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-500",
              fontSize: 17,
            },
            headerRight: () => (
              <TouchableOpacity
                style={{ paddingRight: 16, paddingBottom: 10 }}
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <LogoutIcon />
              </TouchableOpacity>
            ),
          }}
          component={PostsScreen}
        />
        <Tabs.Screen
          name="Create"
          options={{
            title: "Створити публікацію",
            tabBarLabel: "",
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                <TouchableOpacity
                  style={{ paddingLeft: 16, paddingTop: 10, paddingBottom: 10 }}
                  activeOpacity={1}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <ArrowIcon />
                </TouchableOpacity>
              );
            },
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
