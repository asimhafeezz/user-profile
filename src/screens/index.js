import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
          initialRouteName="signin-screen"
        >
          {isAuth ? (
            <Stack.Screen name="userprofile-screen" component={UserProfile} />
          ) : (
            <>
              <Stack.Screen name="signin-screen" component={Signin} />
              <Stack.Screen name="signup-screen" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default SignUpContainer;
