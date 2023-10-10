import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BackGroundAuthentication from "../components/BackGroundAuthentication";
import Input from "../components/Input";
import FormContainer from "../components/FormContainer";
import CustomButton from "../components/CustomButton";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    console.log({ login, password });
  };

  return (
    <BackGroundAuthentication>
      <View style={styles.container}>
        <Text style={styles.loginTitle}>Увійти</Text>
        <Input
          placeholder="Адреса електронної пошти"
          value={login}
          onChangeText={(text) => setLogin(text)}
        />

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
        <CustomButton
          title={"Увійти"}
          onPress={() => {}}
          style={{ marginTop: 43 }}
        />
        <View style={styles.textRegister}>
          <Text style={styles.textAcc}>Немає акаунту? </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.registerLink}>Зареєструватися</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackGroundAuthentication>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: Platform.OS === "ios" ? 132 : 50,
  },
  loginTitle: {
    textAlign: "center",
    fontSize: 30,
    letterSpacing: 0.3,
    marginBottom: 33,
    fontFamily: "Roboto-500",
  },
  input: {
    backgroundColor: "#F6F6F6",
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  btnSubmit: {
    marginTop: 27,
    padding: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnSubmitText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    fontFamily: "Roboto-400",
  },
  textRegister: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
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
    top: Platform.OS === "ios" ? 185 : 202,
  },
  showPasswordButtonText: {
    fontSize: 16,
    color: "#1B4371",
  },
});

export default LoginScreen;
