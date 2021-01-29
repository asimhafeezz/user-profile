import React, { useState } from "react";
import base64 from "base-64";
import utf8 from "utf8";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import useAuthActions from "../actions/authActions";

const Login = ({ navigation }) => {
  //states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { setIsAuth } = useAuthActions();

  const onLoginButtonClick = () => {
    const userData = {
      username: base64.encode(utf8.encode(username)),
      password: base64.encode(utf8.encode(password)),
    };
    console.log("token", base64.encode(utf8.encode(`${username}:${password}`)));

    setLoading(true);

    if (username === "" || password === "") {
      setErr("All fields required*");
      setLoading(false);
    } else {
      axios
        .post("http://138.68.247.26:8010/api/login/", {
          headers: {
            Authorization: `Basic ${base64.encode(
              utf8.encode(`${username}:${password}`)
            )}`,
          },
        })
        .then((res) => {
          AsyncStorage.setItem(
            "token",
            base64.encode(utf8.encode(`${username}:${password}`))
          );
          console.log(res.data);
          setIsAuth(true);
          navigation.navigate("userprofile");
          setLoading(false);
        })
        .catch((e) => {
          setErr("Network Server Err");
          setLoading(false);
          console.log({ e });
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="username or email"
        />
      </View>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {err ? <Text style={styles.errText}>{err}</Text> : null}

      <View style={styles.loginButton}>
        <Button disabled={loading} title="Login" onPress={onLoginButtonClick} />
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
    color: "white",
    marginTop: 5,
  },
  loginButton: {
    marginTop: 15,
    width: "90%",
  },
  errText: {
    color: "red",
    marginTop: 2,
  },
});
export default Login;
