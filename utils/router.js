import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../Screens/auth/LoginScreen";
import { RegisterScreen } from "../Screens/auth/RegisterScreen";
import { Home } from "../Screens/main/Home";

const MainStack = createStackNavigator();

export const defineRoute = (isAuth) => {
  return (
    <MainStack.Navigator initialRouteName="Login">
      {!isAuth ? (
        <>
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      )}
    </MainStack.Navigator>
  );
};
