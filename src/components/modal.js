import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";

import axios from "axios";

const EditModalBox = ({
  haveData,
  setDataChanged,
  userData,
  dataChanged,
  token,
}) => {
  //local state
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageData, setImageData] = useState({
    filepath: {
      data: "",
      uri: "",
    },
    fileData: "",
    fileUri: "",
    fileType: "",
    fileName: "",
  });

  const addAndEditInfo = () => {
    //start loading
    setLoading(true);

    if (nickname === "" || imageData.fileUri === "") {
      setErr("All fields required*");
      setLoading(false);
    } else {
      setErr("");
      const fileToUpload = {
        uri: imageData.fileUri,
        type: imageData.fileType,
        name: imageData.fileName,
      };
      //putting nickname
      axios({
        url: `http://138.68.247.26:8010/api/users/${userData.id}/`,
        method: "PUT",
        headers: {
          Authorization: `Basic ${token}`,
        },
        data: { nick_name: nickname },
      })
        .then((res) => {
          console.log("nickname is sent ", res.data);

          //uploading profile image
          let formdata = new FormData();
          formdata.append("file", fileToUpload);
          axios({
            url: "http://138.68.247.26:8010/api/upload/",
            method: "POST",
            headers: {
              Authorization: `Basic ${token}`,
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
            data: formdata,
          })
            .then((res) => {
              console.log("image is sent", res.data);
              setDataChanged(!dataChanged);
              setImageData({
                filepath: {
                  data: "",
                  uri: "",
                },
                fileData: "",
                fileUri: "",
                fileType: "",
                fileName: "",
              });
              setNickname("");
              setModalVisible(false);
            })
            .catch((e) => console.log("image e", e))
            .finally(() => setLoading(false));
        })
        .catch(() => console.log("nickname err"));
    }
  };

  const editInfo = () => {
    console.log("add new info");
  };

  //select image from gallery
  const chooseImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log("response", JSON.stringify(response));
        setImageData({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          fileType: response.type,
          fileName: response.fileName,
        });
      }
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.signoutButtonOuterView}>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "#d1d1d1",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ ...styles.textStyle, color: "blue" }}>X</Text>
              </TouchableHighlight>
            </View>

            {imageData.fileUri ? (
              <Image
                source={{ uri: imageData.fileUri }}
                style={styles.userImage}
              />
            ) : null}

            <Button
              onPress={chooseImage}
              style={{ ...styles.modalText, alignSelf: "flex-start" }}
              title="Choose File"
            />

            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                value={nickname}
                onChangeText={(text) => setNickname(text)}
                placeholder="Enter new Nick Name"
              />
            </View>

            {err ? <Text style={styles.errText}>{err}</Text> : null}

            <Button
              onPress={addAndEditInfo}
              disabled={loading}
              style={styles.modalText}
              title={!haveData ? "ADD" : "EDIT"}
            />
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={{
          ...styles.openButton,
          width: 100,
          height: 40,
          backgroundColor: "#2196F3",
        }}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.textStyle}>{haveData ? "Edit" : "ADD INFO+"}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#d1d1d1",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    padding: 10,
    fontSize: 18,
    backgroundColor: "white",
    width: "100%",
    marginBottom: 20,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: (100 / 2) * 100,
    marginBottom: 15,
  },
  inputWrap: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
  signoutButtonOuterView: {
    width: "100%",
    display: "flex",
    alignSelf: "flex-end",
  },
  errText: {
    color: "red",
    marginTop: 2,
  },
});

export default EditModalBox;
