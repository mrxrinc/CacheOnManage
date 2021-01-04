import React from "react";
import { View, StyleSheet } from "react-native";
import MobileServices from "./mobileService";

const QuickAccess = () => {
  return (
    <View style={styles.container}>
      <MobileServices />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuickAccess;
