import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";
import LinearGradient from "react-native-linear-gradient";
import BluJrLogo from "components/icons/bluJrLogo.svg";
import { withTheme } from "themeCore/themeProvider";

const Splash = ({ setTheme }: any) => {
  const navigation = useNavigation();
  useEffect(() => {
    setTheme("FATHER BLU JUNIOR");
    const timer = setTimeout(() => {
      navigation.navigate("app");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.blackBackground}>
      <StatusBar backgroundColor={"#307fe2"} />
      <LinearGradient
        colors={["#307fe2", "#307fe2"]}
        style={styles.linearGradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <BluJrLogo />
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default withTheme(Splash);
