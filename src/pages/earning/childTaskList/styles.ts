import { StyleSheet } from "react-native";
import { colors, iosBoxShadow, width, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    width: "100%",
    paddingBottom: 30,
  },
  emptyTasksListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTasksList: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingLeft: 16,
    justifyContent: "center",
    marginHorizontal: 20,
    elevation: 5,
    ...iosBoxShadow,
  },
  tasksListTitle: {
    fontSize: 16,
    paddingRight: IOS ? 0 : 20,
    paddingLeft: IOS ? 20 : 0,
  },
  emptyTaskDescription: {
    color: colors.text,
    fontSize: 14,
  },
  taskItemsContainer: {
    padding: 20,
    paddingTop: 12,
    paddingBottom: 5,
  },
  taskItem: {
    height: 85,
    flexDirection: "row",
    backgroundColor: colors.white,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 5,
    ...iosBoxShadow,
  },
  taskStatus: {
    width: 47,
    justifyContent: "center",
    alignItems: "center",
  },
  taskItemContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingLeft: 11,
    paddingRight: 16,
  },
  taskItemNameDate: {
    justifyContent: "space-between",
  },
  taskItemTitle: {
    fontSize: 14,
  },
  taskItemDate: {
    fontSize: 12,
    color: colors.gray500,
  },
  taskItemAmount: {
    fontSize: 14,
    color: colors.gray500,
    textAlign: "right",
  },
  taskItemAmountOptions: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  taskItemOptionsBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  recurringText: {
    fontSize: 12,
  },
  waitingToConfirmText: {
    fontSize: 12,
    color: colors.gray500,
  },
  taskItemMiddleLine: {
    width: 3,
    marginVertical: 15,
    backgroundColor: colors.buttonSubmitActive,
    opacity: 0.16,
  },
  taskItemConfirmButton: {
    width: 120,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  taskItemConfirmButtonText: {
    lineHeight: IOS ? 8 : 16,
    textAlign: "center",
    color: "#fff",
  },
  taskItemAcceptedText: {
    color: colors.buttonOpenActive,
    fontSize: 12,
  },
  taskItemFailedText: {
    color: colors.buttonDestructivePressed,
    fontSize: 12,
  },
  todoIcon: {
    width: 20,
    height: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  stars: {
    flexDirection: "row-reverse",
    width: 90,
    marginLeft: 3,
  },
  paymentTag: {
    width: 72,
    height: 24,
    justifyContent: "center",
    paddingLeft: 7,
    position: "absolute",
    top: 24,
    overflow: "hidden",
    transform: [
      {
        rotate: "270deg",
      },
    ],
  },
  paymentTagText: {
    fontSize: 12,
    color: colors.white,
    lineHeight: IOS ? 7 : 10,
  },
  paymentTagTriangle: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    position: "absolute",
    right: -12,
    top: 12,
    transform: [{ rotate: "45deg" }],
  },
  paymentTagTriangleSecondary: {
    top: -12,
  },
  otherPayments: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 4,
    padding: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    ...iosBoxShadow,
  },
  otherPaymentsTitle: {
    fontSize: 16,
    textAlign: "left",
    lineHeight: 20,
    paddingVertical: 10,
  },
  otherPaymentsItem: {},
  otherPaymentsTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  otherPaymentsItemTitle: {
    fontSize: 14,
    lineHeight: 22,
  },
  otherPaymentsAmount: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray400,
  },
  otherPaymentsSecondaryText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray500,
    marginTop: 5,
  },
});
