import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Navigation from "./navigation/Navigation";
import MapScreen from "./Screens/MapScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Navigation />;
}
