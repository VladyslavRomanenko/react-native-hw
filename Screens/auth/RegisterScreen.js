import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { SimpleLineIcons } from "@expo/vector-icons";

import { AuthTitle } from "../../components/AuthTitle";
import { Input } from "../../components/Input";
import { ConfirmBtn } from "../../components/ConfirmBtn";
import { Redirect } from "../../components/Redirect";
import { Password } from "../../components/Password";
import useKeyboardVisibility from "../../hooks/useKeyboardVisibility";
import { Background } from "../../components/Background";
import { handleCloseKeyboard } from "../../utils/handleCloseKeyboard";

import { signUpThunk } from "../../redux/auth/authOperations";
import { Color, Border } from "../../styles/globalStyles";
import { uploadImageToServer } from "../../utils/uploadImageToServer";
import AddPhotoIcon from "../../assets/icons/AddPhotoIcon";
import EditPhotoIcon from "../../assets/icons/EditPhotoIcon";

export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [isKeyboardVisible, setIsKeyboardVisible] = useKeyboardVisibility();

  useEffect(() => {
    (async () => {
      const mediaPermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      if (mediaPermission.status !== "granted") {
        console.log("No access to media library");
      }
    })();
  }, []);

  const handleAvatarLoad = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const photo = avatar
      ? await uploadImageToServer({ imageUri: avatar, folder: "avatars" })
      : "https://shorturl.at/agwJW";

    const data = { name, email, password, photo };
    dispatch(signUpThunk(data))
      .unwrap()
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((error) => Alert.alert("Помилка реєстрації", error));
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: avatar }} />
            <TouchableOpacity
              style={styles.addBtn}
              activeOpacity={0.5}
              onPress={handleAvatarLoad}
            >
              {avatar ? <EditPhotoIcon /> : <AddPhotoIcon />}
            </TouchableOpacity>
          </View>
          <AuthTitle title="Реєстрація" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.inputContainer,
                marginBottom: isKeyboardVisible ? 100 : 43,
              }}
            >
              <Input placeholder="Логін" value={name} onChangeText={setName} />
              <Input
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
              />
              <Password value={password} onChangeText={setPassword} />
            </View>
          </KeyboardAvoidingView>
          <ConfirmBtn title="Зареєстуватися" onPress={handleSubmit} />
          <Redirect
            firstPart="Вже є акаунт?"
            secondPart="Увійти"
            navigateTo="Login"
          />
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 74,
    backgroundColor: Color.white,
    borderTopRightRadius: Border.m,
    borderTopLeftRadius: Border.m,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
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
    borderRadius: Border.s,
    backgroundColor: Color.lightGray,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: Border.s,
  },
  addBtn: {
    position: "absolute",
    bottom: 14,
    right: -18,
    backgroundColor: "transparent",
  },
  icon: {
    backgroundColor: Color.white,
    borderRadius: 50,
  },
  inputContainer: {
    rowGap: 16,
  },
});
