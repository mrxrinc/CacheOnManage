import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  head: {
    width: "100%",
    padding: 20,
    paddingTop: 30,
    minHeight: 200,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    position: "absolute",
    top: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: colors.gray800,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 7,
    paddingLeft: 7,
  },
  editIconWrapper: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 5,
    bottom: 5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.buttonSubmitActive,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    color: colors.title,
    marginBottom: 10,
  },
  callInformation: {
    width: "100%",
    minHeight: 40,
    backgroundColor: colors.gray900,
    padding: 10,
    paddingHorizontal: 20,
  },
  callText: {
    fontSize: 11,
    color: colors.gray300,
    lineHeight: 20,
  },
  bluePhoneNumber: {
    color: colors.links,
  },
  cardsWrapper: {
    padding: 20,
  },
  cardRow: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardRowDescription: {
    fontSize: 10,
    color: colors.gray600,
    marginTop: -8,
    marginBottom: 7,
  },
  modalContent: {
    padding: 15,
    minHeight: 150,
  },
  modalDescription: {
    fontSize: 14,
    color: colors.gray300,
    textAlign: "left",
    marginBottom: 20,
  },
  validatePassword: {
    marginBottom: 20,
  },
  imageUploadWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  uploadIcon: {},
  uploadTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  mobileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  unequalButtonsWrapper: {
    marginHorizontal: -15,
    alignItems: "center",
  },
});
