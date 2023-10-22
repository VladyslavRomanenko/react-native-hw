import { Alert, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { CommentsScreen } from "../postsScreens/CommentsScreen";
import { MapScreen } from "../postsScreens/MapScreen";
import { DefaultScreen } from "../postsScreens/DefaultScreen";
import { Color } from "../../styles/globalStyles";
import { signOutThunk } from "../../redux/auth/authOperations";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const PostsScreen = createStackNavigator();

  const handleSignOut = () => {
    dispatch(signOutThunk())
      .unwrap()
      .catch((error) => Alert.alert("Помилка виходу з акаунту", error));
  };

  return (
    <PostsScreen.Navigator
      initialRouteName="PostsDefault"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <PostsScreen.Screen
        name="PostsDefault"
        component={DefaultScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              activeOpacity={0.5}
              onPress={handleSignOut}
            >
              <Feather name="log-out" size={24} color={Color.fogGray} />
            </TouchableOpacity>
          ),
        }}
      />
      <PostsScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
      <PostsScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
        }}
      />
    </PostsScreen.Navigator>
  );
};
