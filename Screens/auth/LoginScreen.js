import { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { Input } from "../../components/Input";
import { ConfirmBtn } from "../../components/ConfirmBtn";
import { Redirect } from "../../components/Redirect";
import { AuthTitle } from "../../components/AuthTitle";
import { Password } from "../../components/Password";
import { Background } from "../../components/Background";
import useKeyboardVisibility from "../../hooks/useKeyboardVisibility";
import { handleCloseKeyboard } from "../../utils/handleCloseKeyboard";

import { Border, Color } from "../../styles/globalStyles";
import { signInThunk } from "../../redux/auth/authOperations";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isKeyboardVisible, setIsKeyboardVisible] = useKeyboardVisibility();

  const handleSubmit = () => {
    const data = { email, password };
    dispatch(signInThunk(data))
      .unwrap()
      .then(() => {
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((error) => Alert.alert("Помилка логінізації", error));
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
        <View style={styles.container}>
          <AuthTitle title="Увійти" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.inputContainer,
                marginBottom: isKeyboardVisible ? 75 : 43,
              }}
            >
              <Input
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
              />
              <Password value={password} onChangeText={setPassword} />
            </View>
          </KeyboardAvoidingView>
          <ConfirmBtn title="Увійти" onPress={handleSubmit} />
          <Redirect
            firstPart="Немає акаунту?"
            secondPart="Зареєструватися"
            navigateTo="Register"
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
    paddingTop: 32,
    paddingBottom: 120,
    backgroundColor: Color.white,
    borderTopRightRadius: Border.m,
    borderTopLeftRadius: Border.m,
  },
  inputContainer: {
    rowGap: 16,
  },
  passwordContainer: {
    position: "relative",
  },
});
