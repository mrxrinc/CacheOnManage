import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  card: {
    borderWidth: 0.3,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cardImage: {
    width: 254,
    height: 158,
  },
  avatarWrapper: {
    width: 80,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 100,
  },
  addressSection: {
    height: 176,
    backgroundColor: "#f5f7fa",
    padding: 20,
    paddingTop: 16,
  },
  Title: {
    fontSize: 18,
    color: "#110820",
    textAlign: "left",
  },
  Description: {
    fontSize: 14,
    color: "#707070",
    textAlign: "left",
    lineHeight: 24,
    marginTop: 10,
  },
  addressButtonWrapper: {
    paddingLeft: "50%",
    marginTop: 20,
  },
  buttonWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 32,
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  successModalContent: {},
  successIcon: {
    alignItems: "center",
  },
  successContent: {
    justifyContent: "center",
  },
  successMessage: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
