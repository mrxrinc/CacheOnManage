import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Rating } from "react-native-ratings";
import { FormattedText } from "components/format-text";
import Button from "components/button";
import { colors, iosBoxShadow, width, IOS } from "constants/index";
import Tick from "components/icons/tick.svg";
import Edit from "components/icons/edit.svg";
import Trash from "components/icons/trash.svg";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/earing-stack-navigator";
import AlertController from "components/alertController";
import { deleteChildTask, childStatusTask } from "utils/api";
import { RootState } from "../../../customType";
import { useDispatch, useSelector } from "react-redux";
import EditTask from "./editTaskModal";
import { getEarningData } from "redux/actions/Earning";
import { formatNumber, jalaliDate } from "utils";
import SoilClockIcon from "components/icons/soilClock.svg";
import FailIcon from "components/icons/fail.svg";

type Navigation = NavigationProp<StackParamList>;

const TaskList = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Navigation>();
  const [deleteTask, setDeleteTask] = useState<boolean>(false);
  const [statusTask, setStatusTask] = useState<boolean>(false);
  const [endTaskModal, setEndTaskModal] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskAmount, setTaskAmount] = useState("");
  const [taskType, setTaskType] = useState<string | null>(null);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  const handleDeleteTask = () => {
    deleteChildTask(token, taskId)
      .then((response) => {
        dispatch(getEarningData(taskId));
        setDeleteTask(false);
      })
      .catch(function (error) {
        console.log("deleteChildtask err" + error.message);
        throw error;
      });
  };

  const handleChildDoneStatusTask = (id) => {
    let data = {
      id: id,
      status: "DONE",
    };
    childStatusTask(token, data)
      .then((response) => {
        console.log("handleChildDoneStatusTask res", response);

        dispatch(getEarningData(id));
        setStatusTask(false);
      })
      .catch(function (error) {
        console.log("handleChildDoneStatusTask err", error);
        throw error;
      });
  };

  // const handleVerifyStatusTask = () => {
  //   let data = {
  //     id: taskId,
  //     status: "ACCEPT",
  //   };
  //   childStatusTask(token, data)
  //     .then((response) => {
  //       console.log("handleVerifyStatusTask res", response);
  //       dispatch(getEarningData(taskId));
  //       setStatusTask(false);
  //     })
  //     .catch(function (error) {
  //       console.log("handleVerifyStatusTask err", error);
  //       throw error;
  //     });
  // };

  // const handleFailedStatusTask = () => {
  //   let data = {
  //     id: taskId,
  //     status: "FAILED",
  //   };
  //   childStatusTask(token, data)
  //     .then((response) => {
  //       dispatch(getEarningData(taskId));
  //       setStatusTask(false);
  //     })
  //     .catch(function (error) {
  //       throw error;
  //     });
  // };

  type TagType = {
    status?: boolean;
  };

  const PaymentTag = ({ status }: TagType) => {
    return (
      <View
        style={[
          styles.paymentTag,
          {
            backgroundColor: status
              ? colors.buttonSubmitActive
              : colors.gray600,
          },
        ]}
      >
        <FormattedText
          style={styles.paymentTagText}
          id={status ? "earning.paid" : "earning.unpaid"}
        />
        <View style={styles.paymentTagTriangle} />
        <View
          style={[
            styles.paymentTagTriangle,
            styles.paymentTagTriangleSecondary,
          ]}
        />
      </View>
    );
  };

  const handleTaskRecurringType = (status: string) => {
    if (status === "ONE_OFF") return "یک‌بار";
    else if (status === "WEEKLY") return "هفتگی";
    return;
  };

  const handleRecurringTitle = (status: string) => {
    switch (status) {
      case "FAILED":
        return "تاریخ رد:";
      case "DONE":
        return "تاریخ انجام:";
      case "TODO":
        return "تاریخ ایجاد:";
      case "ACCEPT":
        return "تاریخ تائید:";
      case "PAID":
        return "تاریخ تائید:";
      default:
        return "تاریخ:";
    }
  };

  const renderCart = (item: any) => {
    return (
      <View style={styles.taskItem}>
        <View style={styles.taskStatus}>
          {item.status == "FAILED" && <FailIcon />}
          {item.status == "DONE" && <SoilClockIcon />}
          {item.status == "TODO" && <View style={styles.todoIcon} />}
          {item.status == "ACCEPT" && <PaymentTag status />}
          {item.status == "PAID" && <PaymentTag />}
        </View>
        <View style={styles.taskItemMiddleLine} />
        <View style={styles.taskItemContent}>
          <View style={styles.taskItemNameDate}>
            <FormattedText style={styles.taskItemTitle} fontFamily="Medium">
              {item.taskName}
            </FormattedText>
            <FormattedText
              style={styles.taskItemDate}
              fontFamily="Regular-FaNum"
            >
              {handleRecurringTitle(item.status) + " " + jalaliDate(item.date)}
            </FormattedText>
          </View>
          <View style={styles.taskItemAmountOptions}>
            <FormattedText
              style={styles.taskItemAmount}
              fontFamily="Regular-FaNum"
            >
              {item.status !== "ACCEPT" && item.type !== "PAID" && (
                <FormattedText style={styles.recurringText}>
                  {handleTaskRecurringType(item.type)}
                </FormattedText>
              )}
              {"   "}
              {formatNumber(item.amount)}
              <FormattedText style={styles.recurringText}> ريال</FormattedText>
            </FormattedText>
            <View style={styles.taskItemOptionsBox}>
              {item.status == "ACCEPT" && (
                <Rating
                  showRating={false}
                  readonly
                  startingValue={item.qualityStar || 2}
                  imageSize={20}
                  style={styles.stars}
                  startStyle={{ flexDirection: "row-reverse" }}
                />
              )}

              {item.status == "FAILED" && (
                <FormattedText style={styles.taskItemFailedText}>
                  رد شده
                </FormattedText>
              )}

              {item.status == "DONE" && !isChild && (
                <TouchableOpacity
                  style={styles.taskItemConfirmButton}
                  onPress={() => {
                    setTaskId(item.id);
                    navigation.navigate("confirmTask", {
                      item,
                    });
                  }}
                >
                  <FormattedText style={styles.taskItemConfirmButtonText}>
                    تائید انجام مسئولیت
                  </FormattedText>
                </TouchableOpacity>
              )}

              {item.status == "DONE" && isChild && (
                <FormattedText style={styles.waitingToConfirmText}>
                  در انتظار تائید
                </FormattedText>
              )}

              {item.status == "TODO" && !isChild && (
                <View
                  style={{
                    flexDirection: "row",
                    width: 70,
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setTaskId(item.id);
                      setDeleteTask(true);
                      setTaskName(item.taskName);
                    }}
                  >
                    <Trash width={37} height={37} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setTaskName(item.taskName);
                      setTaskAmount(item.amount);
                      setTaskId(item.id);
                      setTaskType(item.type);
                      setEditTask(true);
                    }}
                  >
                    <Edit width={24} height={24} />
                  </TouchableOpacity>
                </View>
              )}
              {item.status == "TODO" && isChild && (
                <TouchableOpacity
                  style={styles.taskItemConfirmButton}
                  onPress={() => {
                    setTaskId(item.id);
                    setTaskName(item.taskName);
                    setEndTaskModal(true);
                  }}
                >
                  <FormattedText style={styles.taskItemConfirmButtonText}>
                    اتمام فعالیت
                  </FormattedText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const otherPayments = props.childInfo.incomes;

  return (
    <View style={styles.container}>
      <FormattedText style={styles.tasksListTitle} fontFamily="Medium">
        فعالیت ها
      </FormattedText>
      {props.childInfo.task == "" ? (
        <View style={styles.emptyTasksListContainer}>
          <View style={styles.emptyTasksList}>
            <FormattedText
              style={styles.emptyTaskDescription}
              id="earning.taskDescription"
            />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            numColumns={1}
            contentContainerStyle={styles.taskItemsContainer}
            data={props.childInfo.task}
            renderItem={({ item, index }) => renderCart(item, index)}
          />
        </View>
      )}

      <View style={styles.otherPayments}>
        <FormattedText style={styles.otherPaymentsTitle} fontFamily="Medium">
          سایر واریزی‌ها
        </FormattedText>
        {otherPayments.length > 0 ? (
          otherPayments.map((item: any, index: number) => (
            <View
              style={[
                styles.otherPaymentsItem,
                {
                  marginTop: index === 0 ? 10 : 20,
                },
              ]}
              key={item.id}
            >
              <View style={styles.otherPaymentsTitleWrapper}>
                <FormattedText
                  style={styles.otherPaymentsItemTitle}
                  fontFamily="Bold"
                >
                  {item.name || "--"}
                </FormattedText>
                <FormattedText
                  style={styles.otherPaymentsAmount}
                  fontFamily="Regular-FaNum"
                >
                  {formatNumber(
                    item.amount.substring(0, item.amount.length - 3)
                  )}
                  {"  "}
                  ريال
                </FormattedText>
              </View>

              <FormattedText
                style={styles.otherPaymentsSecondaryText}
                fontFamily="Regular-FaNum"
              >{`تاریخ پرداخت:  ${item.date.substring(0, 10)}`}</FormattedText>
            </View>
          ))
        ) : (
          <FormattedText
            style={styles.emptyTaskDescription}
            id="earning.otherPaymentsDescription"
          />
        )}
      </View>

      <View style={[styles.buttonWrapper, { marginTop: 20, marginBottom: 10 }]}>
        <Button
          color={colors.buttonOpenActive}
          title="افزودن مسئولیت جدید"
          onPress={() => navigation.navigate("addNewTask")}
        />
      </View>

      <AlertController
        showModal={deleteTask}
        setShowModal={() => setDeleteTask(false)}
        title="حذف فعالیت"
        description={`آیا از حذف فعالیت “${taskName}” اطمینان دارید؟`}
        rightTitle="انصراف"
        rightAction={() => setDeleteTask(false)}
        leftTitle="بله"
        leftColor={colors.red}
        leftAction={handleDeleteTask}
        centerText
      />
      {/* <AlertController
        showModal={statusTask}
        setShowModal={() => setStatusTask(false)}
        title="تائید انجام فعالیت"
        description=" با تائید انجام فعالیت، درآمد حاصل از این فعالیت از حساب شما کسر و به حساب فرزندتان منتقل میگردد."
        rightTitle="تایید"
        rightColor={colors.buttonSubmitPressed}
        rightAction={handleVerifyStatusTask}
        leftTile="عدم تایید"
        leftAction={handleFailedStatusTask}
      /> */}
      <AlertController
        showModal={endTaskModal}
        setShowModal={() => setEndTaskModal(false)}
        handleNewAction={() => setEndTaskModal(false)}
        handleMainAction={() => handleChildDoneStatusTask(taskId)}
        backOpacity={0.15}
        title="اتمام فعالیت"
        description={`آیا انجام فعالیت “${taskName}” را تائید می‌کنید؟`}
        isNewAction="بله"
        acceptButton="انصراف"
      />
      <EditTask
        showModal={editTask}
        setShowModal={() => setEditTask(false)}
        backOpacity={0.15}
        title="ویرایش فعالیت"
        taskName={taskName}
        amount={taskAmount}
        taskId={taskId}
        type={taskType}
      />
    </View>
  );
};
export default TaskList;

const styles = StyleSheet.create({
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
    color: colors.title,
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
    color: colors.text,
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
    height: 24,
    backgroundColor: colors.buttonSubmitActive,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
  },
  taskItemConfirmButtonText: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
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
    borderColor: colors.buttonSubmitActive,
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
    lineHeight: 12,
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
    color: colors.title,
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
    color: colors.title,
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
  buttonWrapper: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
