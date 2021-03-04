import React from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import BluJrLogo from "components/icons/bluJrLogo.svg";
import { useNavigation } from "@react-navigation/core";
import Button from "components/button";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { isChild } from "redux/actions/User";
import { withTheme } from "../../themeCore/themeProvider";
import {
  getLocalData,
  setLocalData,
  // logLocalStorage,
} from "utils/localStorage";
import Update from "pages/update";

const EntryType = ({ setTheme }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleTouch = async (child: boolean) => {
    dispatch(isChild(child));
    // logLocalStorage();
    const firstLaunch = await getLocalData("FIRST_LAUNCH");
    if (!firstLaunch) {
      await setLocalData("FIRST_LAUNCH", "1");
      navigation.navigate("intro");
      child ? setTheme("CHILD MONEY") : setTheme("FATHER BLU JUNIOR");
    } else {
      navigation.navigate("login");
      child ? setTheme("CHILD MONEY") : setTheme("FATHER BLU JUNIOR");
    }
  };

  return (
    <LinearGradient colors={["#307fe2", "#307fe2"]} style={styles.container}>
      <StatusBar backgroundColor={"#307fe2"} />
      <View
        style={{
          flex: 0.7,
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "10%",
        }}
      >
        <View style={styles.logoBox}>
          <BluJrLogo />
        </View>
        <View style={styles.bouttonBox}>
          {/* <Button
            color={"#00bfb2"}
            onPress={() => {
              handleTouch(false);
              setTheme("FATHER MONEY");
            }}
            title="ورود والدین مانی"
          /> */}
          <Button
            color={"#00bfb2"}
            style={{ marginTop: 20, borderRadius: 10 }}
            onPress={() => {
              handleTouch(false);
            }}
            title=" ورود والدین"
          />

          <Button
            color={"#00bfb2"}
            style={{ marginTop: 20, borderRadius: 10 }}
            onPress={() => {
              handleTouch(true);
            }}
            title="ورود فرزندان"
          />
        </View>
      </View>
      <Update />
    </LinearGradient>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: width,
    flex: 1,
  },
  logoBox: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height * 0.25,
  },
  bouttonBox: {
    justifyContent: "space-around",
    alignItems: "center",
    width: width * 0.89,
  },
});

export default withTheme(EntryType);
