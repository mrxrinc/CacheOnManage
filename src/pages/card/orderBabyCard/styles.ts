import { StyleSheet, Dimensions } from "react-native";
import { colors, iosBoxShadow } from "constants/index";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  plusBtn: {
    position: "absolute",
    zIndex: 10,
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  cardBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    elevation: 3,
    ...iosBoxShadow,
  },
  cardPack: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  imgBox: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    zIndex: 1,
    ...iosBoxShadow,
  },

  description: {
    width: width,
    height: height * 0.14,
    backgroundColor: "#edf0f5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
    height: 35,
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
