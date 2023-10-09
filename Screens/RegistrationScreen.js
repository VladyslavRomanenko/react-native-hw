import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import ImageInput from "../components/ImageInput";
import BackGroundAuthentication from "../components/BackGroundAuthentication";
import Input from "../components/Input";
import FormContainer from "../components/FormContainer";

const RegistrationScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <BackGroundAuthentication>
      <View style={styles.innerContainer}>
        <ImageInput />
        <Text style={styles.text}>Реєстрація</Text>

        <Input placeholder="Логін" />
        <Input placeholder="Адреса електронної пошти" />
        <Input
          placeholder="Пароль"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {password !== "" && (
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={toggleShowPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.showPasswordButtonText}>
              {showPassword ? "Сховати" : "Показати"}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.btnSubmit}
          activeOpacity={1}
          onPress={() => {}}
        >
          <Text style={styles.btnSubmitText}>Зареєструватися</Text>
        </TouchableOpacity>
        <View style={styles.textRegister}>
          <Text style={styles.textAcc}>Вже є акаунт? </Text>
          <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
            <Text style={styles.registerLink}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackGroundAuthentication>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    paddingBottom: Platform.OS === "ios" ? 40 : 16,
  },
  plusBtn: {
    position: "absolute",
    right: -12,
    bottom: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    letterSpacing: 0.3,
    marginBottom: 33,
    fontFamily: "Roboto-500",
  },
  btnSubmit: {
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
  },
  btnSubmitText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto-400",
  },
  textRegister: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    fontFamily: "Roboto-400",
  },

  textAcc: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-400",
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
    fontFamily: "Roboto-400",
  },
  showPasswordButton: {
    position: "absolute",
    right: 32,
    bottom: 255,
  },
  showPasswordButtonText: {
    fontSize: 16,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
