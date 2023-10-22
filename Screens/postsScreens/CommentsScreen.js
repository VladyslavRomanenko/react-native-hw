import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import useKeyboardVisibility from "../../hooks/useKeyboardVisibility.js";
import { handleCloseKeyboard } from "../../utils/handleCloseKeyboard.js";
import { db } from "../../firebase/config.js";
import { selectUser } from "../../redux/auth/authSelectors.js";
import { CommentItem } from "../../components/CommentItem.js";
import { useGetComments } from "../../hooks/useGetComments.js";
import {
  Border,
  Color,
  FontFamily,
  FontSize,
} from "../../styles/globalStyles.js";

export const CommentsScreen = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [comment, setComment] = useState("");

  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [allComments] = useGetComments(route.params.id);
  const user = useSelector(selectUser);

  const [isKeyboardVisible, setIsKeyboardVisible] = useKeyboardVisibility();

  useEffect(() => {
    if (route.params) {
      setPhotoUrl(route.params.imageUrl);
    }
  }, [route.params]);

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { position: "absolute", height: 70 },
      });
    }
  }, [isFocused]);

  const handleSendComment = async () => {
    if (comment) {
      const data = {
        comment,
        userAvatar: user.avatar,
        date: Date.now(),
        userId: user.id,
      };

      const docRef = doc(db, "posts", route.params.id);
      await addDoc(collection(docRef, "comments"), data);
      setComment("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.container}>
        {photoUrl && <Image style={styles.image} source={{ uri: photoUrl }} />}
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CommentItem data={item} />}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            marginTop: "auto",
            paddingBottom: isKeyboardVisible ? 30 : 0,
          }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Коментувати..."
              placeholderTextColor={Color.darkGray}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={handleSendComment}
            >
              <AntDesign name="arrowup" size={24} color={Color.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: Color.white,
  },
  image: {
    height: 240,
    borderRadius: Border.xs,
    marginBottom: 32,
  },
  inputContainer: {
    height: 50,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    backgroundColor: Color.lightGray,
    borderRadius: Border.m,
  },
  input: {
    width: "85%",
    fontFamily: FontFamily.robotoMedium,
    fontSize: FontSize.m,
    color: Color.dark,
    paddingLeft: 8,
  },
  sendBtn: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.orange,
    borderRadius: 50,
  },
});
