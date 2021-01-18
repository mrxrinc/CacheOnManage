import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  containerBgColor: {
    backgroundColor: "#c7c7c7",
  },
  qrContainer: {
    height: height - 10,
    flex: 1,
  },

  qrPreview: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 0,
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
    borderRadius: 5,
    backgroundColor: "#fff",
    position: "absolute",
    top: 20,
    zIndex: 5,
    right: 20,
  },
  button: {
    width: width * 0.45,
    alignItems: "center",
    padding: 6,
  },
  activeButton1: {
    backgroundColor: "#1daffc",
    borderRadius: 3,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  activeButton2: {
    backgroundColor: "#1daffc",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 8,
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

  preview: {
    width: width,
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
