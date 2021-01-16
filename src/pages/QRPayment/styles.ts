import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    height: "100%",
    flex: 1,
  },
  containerBgColor: {
    backgroundColor: "#c7c7c7",
  },
  qrContainer: {
    display: "flex",
    alignContent: "center",
  },
  preview: {
    width: 280,
    height: 200,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  qrPreview: {
    height: 200,
    width: 284,
    left: "12%",
    borderWidth: 2,
    borderColor: "#24ddb5",
    marginTop: 200,
    marginBottom: 20,
  },
  overlay: {
    // position: "absolute",
    // padding: 16,
    // right: 0,
    // left: 0,
    // alignItems: "center",
    // zIndex: 100,
    // marginTop: 500,
  },
  topOverlay: {
    // height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },

  bottomOverlay: {
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 16,
    color: "#00015d",
    textAlign: "center",
  },
  buttonsWrapper: {
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 2,
    borderColor: "#1daffc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: width * 0.45,
    alignItems: "center",
    padding: 6,
    //borderRadius: 9,
  },
  activeButton1: {
    backgroundColor: "#1daffc",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,

    // width: "100%",
  },
  activeButton2: {
    backgroundColor: "#1daffc",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 13,
  },
  diactiveButton: {
    backgroundColor: "#fff",
    borderRadius: 9,
  },
  blueText: {
    color: "#1daffc",
  },
  whiteText: {
    color: "#fff",
  },
});
