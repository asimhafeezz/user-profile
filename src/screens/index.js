import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import Signin from "./Login";
import SignUp from "./Signup";
import UserProfile from "./userProfile";

function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}

function DetailsScreen() {
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: 900,
        }}
      >
        <Text>Details Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function SignUpContainer() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="signin"
        >
          <Stack.Screen name="signin" component={Signin} />
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="userprofile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default SignUpContainer;
