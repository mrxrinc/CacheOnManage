import { StyleSheet, Dimensions } from "react-native";
import { colors } from "constants/index";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  editContent: {
    padding: 20,
  },
  targetBox: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    minHeight: 125,
    padding: 15,
    elevation: 7,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
  },
  targetTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#00015d",
  },
  halfWidth: {
    width: "50%",
  },
  progressBarGray: {
    width: "100%",
    height: 10,
    borderRadius: 10,
    backgroundColor: "#f4f6fa",
    marginVertical: 10,
  },
  alignRight: {
    textAlign: "right",
  },
  button: {
    width: "50%",
    minWidth: 80,
    maxWidth: 130,
    height: 28,
    borderRadius: 100,
    backgroundColor: colors.buttonSubmitActive,
  },
  targetInfo: {
    color: "#515c6f",
    fontSize: 12,
  },
  noTarget: {
    fontSize: 16,
    color: "#00015d",
    textAlign: "center",
    height: 200,
    marginTop: 20,
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    height: "70%",
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  modalSwipeHandle: {
    width: 100,
    height: 3,
    borderRadius: 10,
    backgroundColor: colors.white,
    opacity: 0.8,
    alignSelf: "center",
    top: -20,
  },
  modalHead: {
    width: width * 0.89,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalCloseWrapper: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitleWrapper: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    color: "#00015d",
    fontSize: 16,
  },
  modalContent: {
    width: width * 0.89,
  },
});
