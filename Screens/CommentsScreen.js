import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import img from "../assets/image-1.png";
import { AntDesign } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const CommentsScreen = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [comment, setComment] = useState("");
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
      <FlatList />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.5}
            onPress={() => {}}
          >
            <AntDesign name="arrowup" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  inputContainer: {
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 25,
  },
  sendBtn: {
    position: "absolute",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    right: 8,
    top: 8,
  },
});

export default CommentsScreen;
