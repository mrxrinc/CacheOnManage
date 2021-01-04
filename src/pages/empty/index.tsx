import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
// import family from "images/family.png";
import { FormattedText } from "components/format-text";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/splash-stack-navigator";

type Navigation = NavigationProp<StackParamList, "splash">;

const Empty = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        {/* <Image source={family} style={styles.familyImg} /> */}
      </View>
      <View style={styles.descriptionBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("splash");
          }}
        >
          <FormattedText
            style={styles.descriptionText}
            id="entryType.description"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor: "#f4f6fa",
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height * 0.35,
  },
  familyImg: {
    width: 237.7,
    height: 231,
  },
  descriptionBox: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
    height: height * 0.15,
  },
  descriptionText: {
    fontSize: 18,
    textAlign: "center",
  },
  bouttonBox: {
    justifyContent: "space-around",
    alignItems: "center",
    width: width * 0.7,
    height: height * 0.15,
  },
  parentBox: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.7,
    height: height * 0.06,
    backgroundColor: "#27519E",
    borderRadius: 30,
    // borderRadius: 25,
    // backgroundColor: "#27519E",
  },
  childBox: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.7,
    height: height * 0.06,
    borderRadius: 25,
    backgroundColor: "#00C47B",
  },
  touch: {
    width: "100%",
    height: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
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
    fontSize: 22,
  },
});

export default Empty;
