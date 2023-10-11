import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PhotoCameraIcon from "../assets/icons/PhotoCameraIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import CustomButton from "../components/CustomButton";
import FormContainer from "../components/FormContainer";
import BackGroundAuthentication from "../components/BackGroundAuthentication";
import DeletePost from "../components/DeletePost";

const CreatePostsScreen = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const isFormValid = title && location;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 230 : null}
        >
          <View style={styles.innerContainer}>
            <View>
              <View style={styles.photoLoad}>
                <TouchableOpacity style={styles.photoBtn} activeOpacity={1}>
                  <PhotoCameraIcon />
                </TouchableOpacity>
              </View>
              <Text style={styles.textPhoto}>Завантажте фото</Text>
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
              onPress={() => {}}
            />
          </View>
          <DeletePost onPress={() => {}} />
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
    marginBottom: 65,
  },
  photoLoad: {
    backgroundColor: "#F6F6F6",
    paddingTop: 90,
    paddingBottom: 90,
    paddingLeft: 140,
    paddingRight: 140,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },
  photoBtn: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 50,
  },
  textPhoto: {
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
