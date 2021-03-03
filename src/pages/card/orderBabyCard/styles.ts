import { StyleSheet, Dimensions } from "react-native";
import { colors } from "constants/index";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
  },
  cardBox: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.5,
  },
  cardPack: {
    height: "40.8%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgBox: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  description: {
    width: width,
    height: height * 0.14,
    marginTop: "7%",
    backgroundColor: "#edf0f5",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionTextBox: {
    width: width * 0.85,
  },
  descriptionText: { textAlign: "center", fontSize: 16, color: "#00015d" },
  button: {
    width: width * 0.89,
    height: 44,
  },
  buttonsWrapper: {
    marginTop: 30,
    marginBottom: 15,
  },
  editButtonWrapper: {
    width: "100%",
    padding: 20,
    paddingVertical: 30,
  },
  loadingWrapper: {
    width: "100%",
    height: 70,
    paddingTop: 10,
  },
  modalBodyContainer: {
    alignItems: "center",
  },
  addressTitle: {
    width: "89%",
    height: 64,
    marginBottom: 30,
    justifyContent: "center",
  },
  editAddressTitleText: {
    color: colors.gray250,
    fontSize: 14,
    lineHeight: 25,
  },
  addressTitleText: {
    color: colors.gray550,
    fontSize: 16,
    lineHeight: 18,
  },
  address: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inquiryResultWrapper: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalResultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
    // flexDirection: "row",
    backgroundColor: colors.white,
    // alignItems: "flex-end",
  },
  itemInput: {
    width: 128,
    height: 25,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
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
