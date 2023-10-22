import { useCallback, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { Color, FontFamily, FontSize } from "../../styles/globalStyles";

const MainTabs = createBottomTabNavigator();

export const Home = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);

  const navigation = useNavigation();

  const ProfileScreenWrapper = () => {
    useFocusEffect(
      useCallback(() => {
        setIsProfileActive(true);
        return () => {
          setIsProfileActive(false);
        };
      }, [])
    );

    return <ProfileScreen />;
  };

  return (
    <MainTabs.Navigator
      id="home"
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: 70,
          paddingTop: 9,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: FontFamily.robotoMedium,
          fontSize: FontSize.l,
          lineHeight: 22,
          letterSpacing: -0.408,
          color: Color.dark,
        },
      }}
    >
      <MainTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarStyle: {
            display: "flex",
          },
          headerShown: false,
          tabBarIcon: () => (
            <AntDesign name="appstore-o" size={24} color={Color.fogGray} />
          ),
        }}
      />
      {isProfileActive ? (
        <>
          <MainTabs.Screen
            name="Profile"
            component={ProfileScreenWrapper}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Feather name="user" size={24} color={Color.white} />
              ),
              tabBarItemStyle: {
                alignSelf: "center",
                height: 40,
                maxWidth: 70,
                borderRadius: 20,
                backgroundColor: Color.orange,
              },
            }}
          />
          <MainTabs.Screen
            name="Create"
            component={CreatePostsScreen}
            options={{
              tabBarStyle: { display: "none" },
              title: "Створити публікацію",
              tabBarIcon: () => (
                <Fontisto name="plus-a" size={18} color={Color.fogGray} />
              ),
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Feather name="arrow-left" size={24} color={Color.fogGray} />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : (
        <>
          <MainTabs.Screen
            name="Create"
            component={CreatePostsScreen}
            options={{
              tabBarStyle: { display: "none" },
              title: "Створити публікацію",
              tabBarIcon: () => (
                <Fontisto name="plus-a" size={18} color={Color.white} />
              ),
              tabBarItemStyle: {
                alignSelf: "center",
                height: 40,
                maxWidth: 70,
                borderRadius: 20,
                backgroundColor: Color.orange,
              },
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Feather name="arrow-left" size={24} color={Color.fogGray} />
                </TouchableOpacity>
              ),
            }}
          />
          <MainTabs.Screen
            name="Profile"
            component={ProfileScreenWrapper}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Feather name="user" size={24} color={Color.fogGray} />
              ),
            }}
          />
        </>
      )}
    </MainTabs.Navigator>
  );
};
