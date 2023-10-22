import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboardVisibility = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleKeyboardShow = () => {
    setIsKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setIsKeyboardVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return [isKeyboardVisible, setIsKeyboardVisible];
};

export default useKeyboardVisibility;
