import React from "react";
import { View, StyleSheet, Dimensions, Image, StatusBar } from "react-native";
import logo from "images/logo.png";
import Mony from "components/icons/money.svg";
import { useNavigation } from "@react-navigation/core";
import Button from "components/button";
import LinearGradient from "react-native-linear-gradient";
import Leafs from "images/drawer/top-design.svg";
import { useDispatch } from "react-redux";
import { isChild } from "redux/actions/User";
import { withTheme } from "../../themeCore/themeProvider";
import {
  getLocalData,
  setLocalData,
  logLocalStorage,
} from "utils/localStorage";
import Update from "pages/update";

const EntryType = ({ setTheme }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleTouch = async (child: boolean) => {
    dispatch(isChild(child));
    logLocalStorage();
    const firstLaunch = await getLocalData("FIRST_LAUNCH");
    if (!firstLaunch) {
      await setLocalData("FIRST_LAUNCH", "1");
      navigation.navigate("intro");
    } else {
      navigation.navigate("login");
    }
  };

  return (
    <LinearGradient colors={["#397fff", "#bb6aff"]} style={styles.container}>
      <StatusBar hidden />
      <View
        style={{
          width: width * 0.8,
          height: height * 0.85,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.imageBox}>
          <Leafs width={120} height={144} />
        </View>

        <View style={styles.logoBox}>
          <Image source={logo} style={styles.logo} />
          <Mony width={100} height={30} style={{ marginTop: 19.6 }} />
        </View>
        <View style={styles.bouttonBox}>
          <Button
            style={styles.button}
            color={"#42e6c5"}
            onPress={() => {
              handleTouch(false);
              setTheme("FATHER MONEY");
            }}
            title="ورود والدین مانی"
          />
          <Button
            style={styles.button}
            color={"#42e6c5"}
            onPress={() => {
              handleTouch(false);
              setTheme("FATHER BLU JUNIOR");
            }}
            title=" ورود والدین بلوجونیور"
          />

          <Button
            style={styles.button}
            color={"#42e6c5"}
            onPress={() => {
              handleTouch(true);
              setTheme("CHILD MONEY");
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
    justifyContent: "flex-start",
    alignItems: "center",
    width: width,
    flex: 1,
  },
  imageBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: width,
    height: height * 0.27,
    marginRight: 35,
  },
  logo: {
    width: 118,
    height: 67,
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
    height: height * 0.21,
  },
  button: {
    borderRadius: 30,
  },
});

export default withTheme(EntryType);
