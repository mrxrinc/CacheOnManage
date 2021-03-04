import { StyleSheet } from "react-native";
import { colors, iosBoxShadow, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 85,
    backgroundColor: colors.white,
    elevation: 3,
    ...iosBoxShadow,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
  },
  taskItemMiddleLine: {
    width: 3,
    backgroundColor: colors.turquoise,
    opacity: 0.18,
    marginRight: 8,
  },
  status: {},
  detail: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    width: 120,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnStyle: {
    borderRadius: 5,
  },
  btnText: {
    lineHeight: IOS ? 8 : 16,
    textAlign: "center",
    color: colors.white,
    fontSize: 12,
  },
  amount: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    color: colors.brownishGrey,
  },
  dateText: {
    fontSize: 12,
    color: colors.brownishGrey,
  },
  weeklyText: {
    color: colors.brownishGrey,
    marginRight: 6,
  },
  rial: {
    color: colors.brownishGrey,
    marginLeft: 4,
  },
  titleText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  waitingToConfirmText: {
    fontSize: 12,
    color: colors.brownishGrey,
  },
  taskItemConfirmButton: {
    width: 120,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  taskItemConfirmButtonToDo: {
    backgroundColor: colors.buttonSubmitActive,
    borderRadius: 10,
  },
  taskItemConfirmButtonText: {
    lineHeight: IOS ? 8 : 16,
    textAlign: "center",
    color: colors.white,
  },
  taskItemFailedText: {
    color: colors.buttonDestructivePressed,
    fontSize: 12,
  },
  updateTask: {
    flexDirection: "row",
    width: 70,
    justifyContent: "space-around",
    alignItems: "center",
  },
  confirmTaskRadius: {
    borderRadius: 5,
  },
});
