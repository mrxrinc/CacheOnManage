import React, { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Camera from "./camera";
import { FormattedText } from "components/format-text";

const Recorder = () => {
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          width: width * 0.8,
          height: height * 0.89,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Camera />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  inputContainer: {
    width: width,
    height: height * 0.89,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
export default Recorder;
