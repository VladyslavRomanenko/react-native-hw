import { StyleSheet, Text } from "react-native";
import { Color, FontFamily, FontSize } from "../styles/globalStyles";

export const AuthTitle = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 33,
    fontFamily: FontFamily.robotoMedium,
    fontSize: FontSize.xl,
    color: Color.dark,
    letterSpacing: 0.3,
    textAlign: "center",
  },
});
