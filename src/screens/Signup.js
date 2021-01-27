import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <View style={styles.inputWrap}>
        <TextInput style={styles.textInput} placeholder="Email" />
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.textInput}
          placeholder="Re type password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("signin")}>
        <Text style={styles.helpText}>
          Already have an account ? login here
        </Text>
      </TouchableOpacity>

      <View style={styles.SignupButton}>
        <Button title="Signup" />
      </View>
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
    fontSize: 22,
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
  SignupButton: {
    marginTop: 15,
    width: "90%",
  },
});
export default Signup;
