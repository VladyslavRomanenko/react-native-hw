import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import pic from "../assets/avatar.png";

const Example = () => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 250,
        }}
      >
        <Image
          source={pic}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <Text style={styles.Textinput}>Username</Text>
        <TextInput placeholder="username" style={styles.input} />
        <Text style={styles.Textinput}>Password</Text>
        <TextInput placeholder="password" style={styles.input} />
        <TouchableHighlight style={styles.btn}>
          <Text style={styles.btnText}>Button</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "$f5f5f5",
  },

  Textinput: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    padding: 20,
  },

  btn: {
    backgroundColor: "orange",
    padding: 20,
  },
  btnText: {
    fontSize: 40,
  },
});

export default Example;
