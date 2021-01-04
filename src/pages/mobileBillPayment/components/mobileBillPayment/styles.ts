import { StyleSheet, Dimensions } from "react-native";
import { colors } from "constants/index";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  pageContainer: {
    width: width * 0.89,
    height: height * 0.54,
    justifyContent: "space-around",
    alignItems: "center",
    elevation:5,
    backgroundColor:"#fff",
    marginTop: "4%",
    borderRadius: 15,
  },
  blueText: { fontSize: 16, color: "#00015d", },
  mobileInfo: {
    width: "99%",
    height: 60,
    backgroundColor: "#f4f6fa",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonBox: {
    width: width * 0.85,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  payment: { width: width * 0.52, height: 44 },
  edit: { width: width * 0.26, height: 44 },
  inquiryResultWrapper: {
    padding: 15,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalResultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  modalResultKeyText: {
    fontSize: 13,
    color: colors.gray500,
    flexShrink: 0,
    backgroundColor: colors.white,
    zIndex: 1,
    paddingLeft: 10,
  },
  modalResultMiddleLine: {
    width: "100%",
    position: "absolute",
    zIndex: 0,
    height: 1,
    backgroundColor: colors.gray800,
  },
  modalResultValueTextWrapper: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "flex-end",
  },
  modalResultValueText: {
    flexShrink: 0,
    paddingRight: 10,
    zIndex: 1,
  },
  inquiryModalButtonsWrapper: {
    height: 40,
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
