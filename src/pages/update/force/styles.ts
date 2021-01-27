
import {
    StyleSheet,
    Dimensions,
  } from "react-native";
const { width } = Dimensions.get("screen");
import { colors } from "constants/index";

export default StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    backgroundColor: colors.gray900,
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "89%",
    height: 44,
    backgroundColor: colors.buttonSubmitActive,
    borderRadius: 30,
    marginBottom: 50,
  },
  title: {
    marginTop: 32,
    marginBottom: 16,
    fontSize: 18,
    color: colors.title,
  },
  dsc: {
    textAlign: "center",
    lineHeight: 24,
    color: colors.text,
    fontSize: 16,
  },
  content: {
    justifyContent: "center",
    flex: 1,
  },
  titleBtn:{
    fontWeight: 'bold',
    fontSize: 16,
  },
});