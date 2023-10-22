import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { updateProfile } from "firebase/auth";

import { Background } from "../../components/Background";
import { UserPostItem } from "../../components/UserPostItem";
import { selectUser } from "../../redux/auth/authSelectors";
import { signOutThunk } from "../../redux/auth/authOperations";
import { auth, db } from "../../firebase/config";
import { uploadImageToServer } from "../../utils/uploadImageToServer";
import { Border, Color, FontFamily, FontSize } from "../../styles/globalStyles";
import { updateAvatar } from "../../redux/auth/authSlice";
import EditPhotoIcon from "../../assets/icons/EditPhotoIcon";

export const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "posts"), where("userId", "==", user.id));
      onSnapshot(q, (doc) => {
        const allPosts = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);
        setUserPosts(allPosts);
      });

      const mediaPermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      if (mediaPermission.status !== "granted") {
        console.log("No access to media library");
      }
    })();
  }, []);

  const handleSignOut = () => {
    dispatch(signOutThunk())
      .unwrap()
      .catch((error) => Alert.alert("Помилка виходу з акаунту", error));
  };

  const handleUpdateAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const newAvatar = result.assets[0].uri;

    setAvatar(newAvatar);

    const photo = await uploadImageToServer({
      imageUri: newAvatar,
      folder: "avatars",
    });

    const currentUser = auth.currentUser;

    dispatch(updateAvatar({ photo }));

    await updateProfile(currentUser, {
      photoURL: photo,
    });
  };

  const handleNavigate = () => {
    navigation.navigate("Create");
  };

  return (
    <Background>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logOutBtn}
          activeOpacity={0.5}
          onPress={handleSignOut}
        >
          <Feather name="log-out" size={24} color={Color.darkGray} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: avatar ? avatar : user.avatar }}
          />
          <TouchableOpacity
            style={styles.changeBtn}
            activeOpacity={0.5}
            onPress={handleUpdateAvatar}
          >
            <EditPhotoIcon />
            {/* <SimpleLineIcons
              name="close"
              size={25}
              color={Color.gray}
              style={styles.avatarIcon}
            /> */}
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        {userPosts.length ? (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <UserPostItem post={item} />}
          />
        ) : (
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.5}
            onPress={handleNavigate}
          >
            <Text style={styles.addText}>Додайте перший пост</Text>
            <MaterialCommunityIcons
              name="file-image-plus"
              size={50}
              color={Color.orange}
            />
          </TouchableOpacity>
        )}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "80%",
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 70,
    borderTopRightRadius: Border.m,
    borderTopLeftRadius: Border.m,
    backgroundColor: Color.white,
  },
  logOutBtn: {
    alignSelf: "flex-end",
    marginBottom: 46,
  },
  imageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: Border.s,
  },
  changeBtn: {
    position: "absolute",
    right: -18,
    bottom: 14,
  },
  avatarIcon: {
    borderRadius: 50,
    backgroundColor: Color.white,
  },
  userName: {
    marginBottom: 32,
    fontFamily: FontFamily.robotoMedium,
    fontSize: FontSize.xl,
    letterSpacing: 0.3,
    textAlign: "center",
    color: Color.dark,
  },
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 12,
    marginTop: 30,
  },
  addText: {
    fontFamily: FontFamily.robotoMedium,
    fontSize: FontSize.l,
    color: Color.fogGray,
  },
});
