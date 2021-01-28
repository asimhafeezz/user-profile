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
} from "react-native";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const EditModalBox = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageData, setImageData] = useState({
    filepath: {
      data: "",
      uri: "",
    },
    fileData: "",
    fileUri: "",
  });

  //select image from gallery
  const chooseImage = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log("Response = ", response);

      // if (response.didCancel) {
      //   console.log("User cancelled image picker");
      // } else if (response.error) {
      //   console.log("ImagePicker Error: ", response.error);
      // } else if (response.customButton) {
      //   console.log("User tapped custom button: ", response.customButton);
      //   alert(response.customButton);
      // } else {
      //   const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      // alert(JSON.stringify(response));s
      console.log("response", JSON.stringify(response));
      // setImageData({
      //   filePath: response,
      //   fileData: response.data,
      //   fileUri: response.uri,
      // });
      // }
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

            {imageData ? (
              <Image
                source={{ uri: "data:image/jpeg;base64," + imageData.fileData }}
                style={styles.userImage}
              />
            ) : (
              <Image
                source={{ uri: "https://i.stack.imgur.com/DzbD0.png" }}
                style={styles.userImage}
              />
            )}

            <TouchableOpacity onPress={chooseImage}>
              <Text>Choose File</Text>
            </TouchableOpacity>

            <View style={styles.inputWrap}>
              <TextInput style={styles.textInput} placeholder="Nick Name" />
            </View>
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
        <Text style={styles.textStyle}>Edit</Text>
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
    marginBottom: 15,
    textAlign: "center",
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
});

export default EditModalBox;
