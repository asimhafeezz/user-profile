import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import EditModalBox from "../components/modal";

const UserProfile = ({ navigation }) => {
  //local state
  const [haveData, setHaveData] = useState(false);
  const openSignUpScreen = () => {
    console.log("open signup screen");
  };

  return (
    <>
      <View style={styles.signoutButtonOuterView}>
        <View style={styles.signoutButton}>
          <TouchableOpacity onPress={() => navigation.navigate("signin")}>
            <Text style={styles.helpText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>User Profile</Text>

        {haveData && (
          <>
            <Image
              source={{ uri: "https://i.stack.imgur.com/DzbD0.png" }}
              style={styles.userImage}
            />

            <Text style={styles.name}>Nick Name</Text>
          </>
        )}

        <View style={styles.button}>
          <EditModalBox haveData={haveData} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "coral",
    alignItems: "center",
    paddingTop: 70,
  },
  heading: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  helpText: {
    color: "black",
    // borderBottom: "5px",
    fontSize: 18,
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
  button: {
    marginTop: 15,
    width: "30%",
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: (100 / 2) * 100,
    marginBottom: 15,
  },
  name: {
    color: "white",
    fontSize: 20,
    marginBottom: 15,
  },
  signoutButton: {
    // marginLeft: 250,
    // width: 100,
  },
  signoutButtonOuterView: {
    backgroundColor: "coral",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
    paddingTop: 20,
  },
});
export default UserProfile;
