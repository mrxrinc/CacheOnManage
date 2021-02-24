import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsWrapper: {
    width: "90%",
    maxWidth: 300,
    height: 39,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: colors.gray900,
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  tabButton: {
    width: "100%",
    maxWidth: "49%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabButtonText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: IOS ? 12 : 15,
  },
  customTabContainer: {
    paddingTop: 30,
    padding: 20,
  },
  pageTitle: {
    fontSize: 18,
    color: "#110820",
    textAlign: "left",
  },
  pageDescription: {
    fontSize: 14,
    color: "#707070",
    textAlign: "left",
    lineHeight: 24,
    marginTop: 10,
  },
  cardBuilderContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
  },
  customCardBody: {
    width: 254,
    height: 158,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  customCardImage: {
    width: 254,
    height: 158,
  },
  avatarUploadButton: {
    width: 80,
    height: 100,
    borderWidth: 3,
    borderColor: "#fff",
    borderStyle: "dashed",
    borderRadius: 8,
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    color: "#fff",
  },
  avatarUploadText: {
    color: "#fff",
    fontSize: 14,
  },
  flipButtonContainer: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    width: 56,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  otherTabContainer: {
    paddingTop: 30,
  },
  otherTabTextWrapper: {
    paddingHorizontal: 20,
  },
  carouselContainer: {
    paddingTop: 24,
    width: "100%",
    // alignItems: "center",
  },
  carouselSlide: {
    borderWidth: 0.3,
    borderColor: "#ccc",
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 5,
  },

  buttonWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 32,
  },
});
