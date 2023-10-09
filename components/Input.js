import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = (props) => {
  const [inputBorderColor, setInputBorderColor] = useState("#E8E8E8");
  const [inputBackgroundColor, setinputBackgroundColor] = useState("#F6F6F6");

  const customOnFocus = () => {
    setInputBorderColor("#FF6C00");
    setinputBackgroundColor("#FFF");
  };

  const customOnBlur = () => {
    setInputBorderColor("#E8E8E8");
    setinputBackgroundColor("#F6F6F6");
  };
  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: inputBorderColor,
          backgroundColor: inputBackgroundColor,
        },
      ]}
      onFocus={customOnFocus}
      onBlur={customOnBlur}
      placeholderTextColor="#BDBDBD"
      {...props}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    color: "#212121",
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 16,
    fontFamily: "Roboto-400",
  },
});

export default Input;
