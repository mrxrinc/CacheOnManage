import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  preview: {
    width: 200,
    height: 200,
    alignItems: "center",
    left: "22%",
    borderWidth: 2,
    borderColor: "#24ddb5",
  },
  overlay: {
    position: "absolute",
    padding: 16,
    right: 0,
    left: 0,
    alignItems: "center",
  },
  topOverlay: {
    bottom: "20%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 14,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsWrapper: {
    width: width * 0.9,
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#1daffc",
    borderRadius: 10,
    zIndex: 101,
  },
  button: {
    width: width * 0.45,
    alignItems: "center",
    padding: 6,
  },
  activeButton: {
    backgroundColor: "#1daffc",

    borderRadius: 9,
  },
  blueText: {
    color: "#1daffc",
  },
  whiteText: {
    color: "#fff",
  },
});
