import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../styles/globalStyles";

export const Redirect = ({
  firstPart = "",
  secondPart = "",
  navigateTo = "Register",
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.redirectText}>{firstPart}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo)}
        activeOpacity={0.5}
      >
        <Text
          style={{ ...styles.redirectText, textDecorationLine: "underline" }}
        >
          {secondPart}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 4,
  },
  redirectText: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.m,
    color: Color.blue,
    textAlign: "center",
  },
});
