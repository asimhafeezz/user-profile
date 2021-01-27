import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

const Login = ({ navigation }) => {
  const openSignUpScreen = () => {
    console.log("open signup screen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.inputWrap}>
        <TextInput style={styles.textInput} placeholder="username or email" />
      </View>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      {/* <TouchableOpacity>
        <Text style={styles.helpText}>Forget Password ?</Text>
      </TouchableOpacity> */}

      <View style={styles.loginButton}>
        <Button
          title="Login"
          onPress={() => navigation.navigate("userprofile")}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
        <Text style={styles.helpText}>Create new account ?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    backgroundColor: "white",
    marginVertical: 10,
    flex: 0.9,
    flexDirection: "row",
    borderRadius: 5,
    fontSize: 15,
  },
  inputWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  helpText: {
    color: "lightgrey",
    marginTop: 5,
  },
  loginButton: {
    marginTop: 15,
    width: "90%",
  },
});
export default Login;
