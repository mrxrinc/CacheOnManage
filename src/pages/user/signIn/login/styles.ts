import { Dimensions, StyleSheet } from "react-native";
import { colors } from "constants/index";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  inputContainer: {
    width: width,
    height: height,
    flex:1,
  },
  container:{ backgroundColor: colors.gray900, flex: 1 },
  contentContainer:{
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: "center",
  },
  inputBox: { justifyContent: "center", alignItems: "center",marginTop:22},
  inputPack: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * 0.89,
    marginTop:44,
    // height: height < 700 ? height * 0.28 : height * 0.2,
  },
  textInputBox: {
  },
  button: { width: width * 0.89, height: 44 },
  touch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  forgetTouch: {
    width: width * 0.89,
    height: height * 0.04,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  blueText: {
    fontSize: 16,
    color: "#0c96ff",
  },

  fingerBox: {
    width: width,
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  content:{
    alignItems: 'center',
  },
});
