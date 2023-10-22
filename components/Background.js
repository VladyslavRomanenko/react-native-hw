import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { handleCloseKeyboard } from "../utils/handleCloseKeyboard";
import BgImg from "../assets/images/background.jpg";

export const Background = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <ImageBackground source={BgImg} style={styles.bgImage}>
        {children}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
