import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import Signin from "./Login";
import SignUp from "./Signup";
import UserProfile from "./userProfile";

//redux
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const SignUpContainer = () => {
  //redux state
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="signin"
        >
          {isAuth ? (
            <Stack.Screen name="userprofile" component={UserProfile} />
          ) : (
            <>
              <Stack.Screen name="signin" component={Signin} />
              <Stack.Screen name="signup" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default SignUpContainer;
