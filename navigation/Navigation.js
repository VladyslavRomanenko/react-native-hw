import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import Home from "../Screens/Home";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import PostsScreen from "../Screens/PostsScreen";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { TouchableOpacity } from "react-native";

const MainStack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="Posts" component={PostsScreen} />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Публікації",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerLeft: null,
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-500",
              fontSize: 17,
            },
            headerRight: () => (
              <TouchableOpacity
                style={{
                  paddingRight: 16,
                  paddingBottom: 10,
                }}
                activeOpacity={1}
              >
                <LogoutIcon />
              </TouchableOpacity>
            ),
          }}
        />
        <MainStack.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            title: "Створити публікацію",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerLeft: true,
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-500",
              fontSize: 17,
            },
          }}
        />
        <MainStack.Screen
          name="Comment"
          component={CommentsScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
