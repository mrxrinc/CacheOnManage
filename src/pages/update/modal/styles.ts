
import {
    StyleSheet,
    Dimensions,
  } from "react-native";
const { width } = Dimensions.get("screen");
import { colors } from "constants/index";

export default StyleSheet.create({
    content: {
      backgroundColor: colors.white,
      borderRadius: 15,
      paddingHorizontal: 16,
      paddingBottom: 22,
      paddingTop: 16,
    },
    title: {
      color: colors.title,
      fontSize: 16,
      lineHeight: 19,
      letterSpacing: 0,
      textAlign: "center",
    },
    version: {
      color: colors.title,
      textAlign: "center",
      fontSize: 12,
      fontWeight: "normal",
      lineHeight: 15,
      letterSpacing: 0,
    },
    dsc: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "normal",
      lineHeight: 20,
      letterSpacing: 0,
      textAlign: "left",
      marginTop: 20,
      marginBottom: 20,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      marginLeft: 8,
    },
    itemText: {
      color: colors.text,
      fontWeight: "normal",
      letterSpacing: 0,
      textAlign: "left",
    },
    itemPoint: {
      backgroundColor: colors.buttonSubmitActive,
      width: 6,
      height: 6,
      borderRadius: 10,
      marginBottom: -5,
      marginRight: 4,
    },
    buttons: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: -16,
      marginTop: 15,
    },
    titleSecondary: {
      color: colors.white,
    },
    contentScrollView: { maxHeight: width * 0.8 },
    btn:{borderRadius:40},
  });