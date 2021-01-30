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

import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import useAuthActions from "../actions/authActions";
import { useEffect } from "react";

const UserProfile = ({ navigation }) => {
  //local state
  const [haveData, setHaveData] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    nick_name: null,
    profile_pic: null,
  });

  const [token, setToken] = useState("");
  const [dataChanged, setDataChanged] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const { setIsAuth } = useAuthActions();

  const logOut = () => {
    setIsAuth(false);
    AsyncStorage.removeItem("token");
    navigation.navigate("signin-screen");
  };

  useEffect(() => {
    const unsub = () => {
      setDataLoading(true);

      AsyncStorage.getItem("token").then((userToken) => {
        setToken(userToken);
        axios({
          url: "http://138.68.247.26:8010/api/login/",
          method: "POST",
          headers: {
            Authorization: `Basic ${userToken}`,
          },
        }).then((res) => {
          const userdata = res.data;
          if (userdata.profile_pic === null || userdata.nick_name === null) {
            setHaveData(false);
          } else {
            setHaveData(true);
          }
          setUserData(userdata);
          setDataLoading(false);
        });
      });
    };
    return unsub();
  }, [dataChanged]);

  return dataLoading ? (
    <View style={styles.loadingView}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <>
      <View style={styles.signoutButtonOuterView}>
        <View style={styles.signoutButton}>
          <TouchableOpacity onPress={logOut}>
            <Text style={styles.helpText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>User Profile</Text>

        {haveData && (
          <>
            <Image
              source={{
                uri: "http://138.68.247.26:8010" + userData.profile_pic,
              }}
              style={styles.userImage}
            />

            <Text style={styles.name}>{userData.nick_name}</Text>
          </>
        )}

        <View style={styles.button}>
          <EditModalBox
            haveData={haveData}
            userData={userData}
            dataChanged={dataChanged}
            token={token}
            setDataChanged={setDataChanged}
          />
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
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    backgroundColor: "coral",
  },
});
export default UserProfile;
