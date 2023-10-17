import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostsScreen from "./PostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsIcon from "../assets/icons/PostsIcon";
import ArrowIcon from "../assets/icons/ArrowIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { useNavigation } from "@react-navigation/core";
import AddPostButton from "../components/AddPostButton";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Tabs.Navigator
        initialRouteName="Posts"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Posts") {
              let color;
              color = focused ? "#FF6C00" : "#212121";
              return <AntDesign name="appstore-o" size={24} color={color} />;
            } else if (route.name === "Create") {
              return (
                <AddPostButton
                  title={"+"}
                  onPress={() => navigation.navigate("Create")}
                />
              );
            } else if (route.name === "Profile") {
              let color;
              color = focused ? "#FF6C00" : "#212121";
              return <AntDesign name="user" size={24} color={color} />;
            }
          },
          tabBarStyle: {
            paddingTop: 9,
            height: 83,
          },
          tabBarShowLabel: false,
        })}
      >
        <Tabs.Screen
          name="Posts"
          options={{
            title: "Публікації",
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
          options={({ route }) => ({
            title: "Створити публікацію",
            tabBarStyle: {
              display: "none",
            },
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
          })}
          component={CreatePostsScreen}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
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
