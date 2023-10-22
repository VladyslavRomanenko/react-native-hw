import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Input } from "./Input";
import { Color, FontFamily, FontSize } from "../styles/globalStyles";

export const Password = ({ onChangeText, value = "" }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.passwordContainer}>
      <Input
        placeholder="Пароль"
        secured={!isPasswordVisible}
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable
        style={styles.showBtn}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Text style={styles.showBtnTitle}>
          {isPasswordVisible ? "Сховати" : "Показати"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    position: "relative",
  },
  showBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showBtnTitle: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.m,
    color: Color.blue,
  },
});
