import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../styles/globalStyles";

export const Input = ({
  placeholder = "",
  secured = false,
  onChangeText,
  value,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextInput
      style={{
        ...styles.input,
        backgroundColor: isFocused ? Color.white : Color.lightGray,
        borderColor: isFocused ? Color.orange : Color.gray,
      }}
      placeholder={placeholder}
      placeholderTextColor={Color.darkGray}
      onFocus={handleFocus}
      onBlur={handleBlur}
      secureTextEntry={secured}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: Border.xs,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.s,
    color: Color.dark,
  },
});
