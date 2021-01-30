import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpButtonHandler = () => {
    setLoading(true);

    if (username === "" || pass1 === "" || pass2 === "") {
      setErr("All fields required*");
      setLoading(false);
    } else if (pass1 !== pass2) {
      setErr("enter same passwords");
      setLoading(false);
    } else {
      setErr("");
      const userData = {
        username,
        password: pass1,
      };
      axios
        .post("http://138.68.247.26:8010/api/signup/", userData)
        .then(() => {
          navigation.navigate("signin-screen");
          setLoading(false);
        })
        .catch(() => {
          setErr("network err");
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="username"
        />
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          value={pass1}
          onChangeText={(text) => setPass1(text)}
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          value={pass2}
          onChangeText={(text) => setPass2(text)}
          style={styles.textInput}
          placeholder="Re type password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("signin-screen")}>
        <Text style={styles.helpText}>
          Already have an account ? login here
        </Text>
      </TouchableOpacity>

      {err ? <Text style={styles.errText}>{err}</Text> : null}

      <View style={styles.SignupButton}>
        <Button
          disabled={loading}
          onPress={signUpButtonHandler}
          title="Signup"
        />
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
    color: "white",
    marginTop: 5,
  },
  SignupButton: {
    marginTop: 15,
    width: "90%",
  },
  errText: {
    color: "red",
    marginTop: 5,
  },
});
export default Signup;
