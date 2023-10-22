import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../styles/globalStyles";

export const ConfirmBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onPress}>
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    height: 51,
    padding: 16,
    borderRadius: Border.l,
    backgroundColor: Color.orange,
    marginBottom: 16,
  },
  btnTitle: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.m,
    color: Color.white,
  },
});
