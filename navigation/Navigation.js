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
import ArrowIcon from "../assets/icons/ArrowIcon";

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
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <MainStack.Screen
          name="Comment"
          component={CommentsScreen}
          options={{
            title: "Коментарі",
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
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
