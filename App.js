import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { StatusBar, Text } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { AppNavigation } from "./components/AppNavigation";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <StatusBar
          animated={true}
          barStyle="dark-content"
          backgroundColor="#fff"
        />
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}
