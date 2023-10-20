import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationIcon from "../assets/icons/LocationIcon";
import CustomButton from "../components/CustomButton";
import DeletePost from "../components/DeletePost";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);

  const isFormValid = photoUri && title && location;

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const location = await Location.requestForegroundPermissionsAsync();
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

  const handleTakePicture = async () => {
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

  const handleToggleCamera = () => {
    setType((prev) =>
      prev === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleCreate = () => {
    navigation.navigate("Posts");
    handleReset();
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 230 : null}
        >
          <View style={styles.innerContainer}>
            <View style={styles.cameraContainer}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.image} />
              ) : (
                <Camera style={styles.camera} ref={setCamera}></Camera>
              )}

              <TouchableOpacity
                style={[
                  styles.photoBtn,
                  { backgroundColor: photoUri ? "#FFFFFF4D" : "#fff" },
                ]}
                activeOpacity={0.5}
                onPress={handleTakePicture}
              >
                {photoUri ? (
                  <MaterialCommunityIcons
                    name="camera-retake"
                    size={24}
                    color={"white"}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="camera"
                    size={24}
                    color={"grey"}
                  />
                )}
              </TouchableOpacity>

              <Text style={styles.textPhoto}>
                {photoUri ? "Редагувати фото" : "Завантажте фото"}
              </Text>
            </View>
            <TextInput
              placeholder="Назва..."
              style={styles.input}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
            <View>
              <TextInput
                placeholder="Місцевість..."
                style={[styles.input, { paddingLeft: 28 }]}
                value={location}
                onChangeText={(text) => {
                  setLocation(text);
                }}
              />

              <View style={styles.locationIcon}>
                <LocationIcon />
              </View>
            </View>
            <CustomButton
              title={"Опублікувати"}
              disabled={!isFormValid ? true : false}
              style={{
                backgroundColor: isFormValid ? "#FF6C00" : "#F6F6F6",
                marginTop: 32,
              }}
              onPress={handleCreate}
            />
          </View>
          <DeletePost onPress={handleReset} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    justifyContent: "center",
    marginBottom: 120,
  },

  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 240,
  },
  photo: {
    height: 240,
  },
  photoBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -50 }],
    padding: 18,
    borderRadius: 50,
  },

  photoBtnIs: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -50 }],
    backgroundColor: "#FFFFFF4D",
    padding: 18,
    borderRadius: 50,
  },
  textPhoto: {
    marginTop: 10,
    fontFamily: "Roboto-400",
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-400",
    color: "#212121",
    fontSize: 16,
  },
  locationIcon: {
    position: "absolute",
    left: 2,
    bottom: 15,
  },
  submitBtn: {
    marginTop: 32,
  },
});

export default CreatePostsScreen;
