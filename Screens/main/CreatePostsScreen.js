import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { selectUser } from "../../redux/auth/authSelectors";
import { db } from "../../firebase/config";
import { handleCloseKeyboard } from "../../utils/handleCloseKeyboard";
import { uploadImageToServer } from "../../utils/uploadImageToServer";
import { Border, Color, FontFamily, FontSize } from "../../styles/globalStyles";

export const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);

  const user = useSelector(selectUser);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const location = await Location.requestForegroundPermissionsAsync();

      // if (status !== "granted") {
      //   console.log("Permission to access location was denied");
      //   return;
      // }

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (photoUri) {
      (async () => {
        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocationCoords(coords);

        const [address] = await Location.reverseGeocodeAsync(coords);

        if (!address) return;

        const fullLocation = `${address.city}, ${address.region}, ${address.country}`;
        setLocation(fullLocation);
      })();
    }
  }, [photoUri]);

  const isNotDisabled = photoUri && title && location;

  const takePicture = async () => {
    if (photoUri) {
      setPhotoUri(null);
      return;
    }
    const photo = await camera.takePictureAsync();
    setPhotoUri(photo.uri);
  };

  const handleReset = () => {
    setPhotoUri(null);
    setTitle("");
    setLocation("");
  };

  const handlePost = async () => {
    const imageUrl = await uploadImageToServer({
      imageUri: photoUri,
      folder: "postImages",
    });

    const data = {
      imageUrl,
      title,
      location,
      locationCoords,
      userId: user.id,
      date: Date.now(),
    };

    await addDoc(collection(db, "posts"), data);

    navigation.navigate("PostsDefault");
    handleReset();
  };

  const handleDelete = () => {
    handleReset();
    navigation.navigate("PostsDefault");
  };

  const handleToggleCamera = () => {
    setType((prev) =>
      prev === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.image} />
          ) : (
            <Camera style={styles.camera} ref={setCamera}></Camera>
          )}
          <TouchableOpacity
            style={{
              ...styles.btnContainer,
              backgroundColor: photoUri ? Color.transparentWhite : Color.white,
            }}
            activeOpacity={0.5}
            onPress={takePicture}
          >
            {photoUri ? (
              <MaterialCommunityIcons
                name="camera-retake"
                size={24}
                color={Color.white}
              />
            ) : (
              <MaterialCommunityIcons
                name="camera"
                size={24}
                color={Color.darkGray}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.5}>
          <Text style={styles.downloadText}>
            {photoUri ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </TouchableOpacity>
        <View style={styles.inputsWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Назва..."
              placeholderTextColor={Color.darkGray}
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View
            style={{
              ...styles.inputContainer,
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Feather name="map-pin" size={24} color={Color.darkGray} />
            <TextInput
              placeholder="Місцевість..."
              placeholderTextColor={Color.darkGray}
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <TouchableOpacity
            style={{
              ...styles.postBtn,
              backgroundColor: isNotDisabled ? Color.orange : Color.lightGray,
            }}
            activeOpacity={0.5}
            disabled={isNotDisabled ? false : true}
            onPress={handlePost}
          >
            <Text
              style={{
                ...styles.postText,
                color: isNotDisabled ? Color.white : Color.darkGray,
              }}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trashBtn}
            activeOpacity={0.5}
            onPress={handleDelete}
          >
            <Feather name="trash-2" size={24} color={Color.darkGray} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: Color.white,
  },
  cameraContainer: {
    position: "relative",
    height: 240,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: Border.xs,
    overflow: "hidden",
    marginBottom: 8,
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  image: {
    height: 240,
  },
  downloadBtn: {
    marginBottom: 32,
  },
  downloadText: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.m,
    color: Color.darkGray,
  },
  inputsWrapper: {
    gap: 16,
    marginBottom: 32,
  },
  inputContainer: {
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
  },
  input: {
    fontFamily: FontFamily.robotoMedium,
    fontSize: FontSize.m,
    color: Color.dark,
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  postBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 32,
    borderRadius: Border.l,
  },
  postText: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.m,
  },
  trashBtn: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.lightGray,
  },
});
