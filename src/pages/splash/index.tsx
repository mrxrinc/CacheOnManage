import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";
import LinearGradient from "react-native-linear-gradient";
import cacheonmanageLogo from "components/icons/cacheonmanageLogo.svg";
import { withTheme } from "themeCore/themeProvider";

const Splash = ({ setTheme }: any) => {
  const navigation = useNavigation();
  useEffect(() => {
    setTheme("FATHER CASH JUNIOR");
    const timer = setTimeout(() => {
      navigation.navigate("auth");
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
        <cacheonmanageLogo />
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
