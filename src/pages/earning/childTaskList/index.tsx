import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import { FormattedText } from "components/format-text";
import Button from "components/button";
import { colors } from "constants/index";
import Edit from "components/icons/editIcon.svg";
import Trash from "components/icons/trashIcon.svg";
import { useNavigation } from "@react-navigation/core";
import AlertController from "components/alertController";
import { deleteChildTask, childStatusTask } from "utils/api";
import { RootState } from "../../../../customType";
import { useDispatch, useSelector } from "react-redux";
import EditTask from "./editTaskModal";
import { getEarningData } from "redux/actions/Earning";
import { formatNumber, jalaliDate } from "utils";
import SoilClockIcon from "components/icons/soilClock.svg";
import SoilClockIconBr from "components/icons/soilClock-br.svg";
import FailIcon from "components/icons/fail.svg";
import FailIconBr from "components/icons/fail-br.svg";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

const TaskList = (props: any) => {
  const theme = props.theme;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [deleteTask, setDeleteTask] = useState<boolean>(false);
  const [statusTask, setStatusTask] = useState<boolean>(false);
  const [endTaskModal, setEndTaskModal] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskAmount, setTaskAmount] = useState("");
  const [icon, setIcon] = useState("");
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
        throw error;
      });
  };

  const handleChildDoneStatusTask = (id: any) => {
    let data = {
      id: id,
      status: "DONE",
    };
    childStatusTask(token, data)
      .then((response) => {
        dispatch(getEarningData(id));
        setStatusTask(false);
      })
      .catch(function (error) {
        throw error;
      });
  };

  type TagType = {
    status?: any;
  };

  const PaymentTag = ({ status }: TagType) => {
    return (
      <View
        style={[
          styles.paymentTag,
          {
            backgroundColor: status ? theme.ButtonGreenColor : colors.gray600,
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
    console.log("renderCard>>", item);
    return (
      <View style={styles.taskItem}>
        <View style={styles.taskStatus}>
          {item.status == "FAILED" &&
            (theme.key == "FATHER BLU JUNIOR" ? <FailIconBr /> : <FailIcon />)}
          {item.status == "DONE" &&
            (theme.key == "FATHER BLU JUNIOR" ? (
              <SoilClockIconBr />
            ) : (
              <SoilClockIcon />
            ))}
          {item.status == "TODO" && (
            <View
              style={[styles.todoIcon, { borderColor: theme.ButtonGreenColor }]}
            />
          )}
          {item.status == "ACCEPT" && <PaymentTag />}
          {item.status == "PAIED" && <PaymentTag status />}
        </View>
        <View style={styles.taskItemMiddleLine} />
        <View style={styles.taskItemContent}>
          <View style={styles.taskItemNameDate}>
            <FormattedText
              style={[styles.taskItemTitle, { color: theme.titleColor }]}
              fontFamily="Medium"
            >
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
            <View style={styles.taskTextWrapper}>
              {item.status !== "ACCEPT" && item.type !== "PAID" && (
                <FormattedText style={styles.recurringText}>
                  {handleTaskRecurringType(item.type)}
                </FormattedText>
              )}
              <FormattedText
                style={styles.taskItemAmount}
                fontFamily="Regular-FaNum"
              >
                {formatNumber(item.amount)}
              </FormattedText>
              <FormattedText style={styles.recurringText}>ريال</FormattedText>
            </View>

            <View style={styles.taskItemOptionsBox}>
              {item.status == "ACCEPT" && (
                <StarRating
                  disabled
                  maxStars={5}
                  emptyStar={"star"}
                  emptyStarColor={colors.gray650}
                  fullStar={"star"}
                  fullStarColor={colors.star}
                  iconSet={"MaterialIcons"}
                  rating={item.qualityStar || 2}
                  reversed={true}
                  starSize={22}
                  containerStyle={{ flexDirection: "row-reverse" }}
                />
              )}

              {item.status == "FAILED" && (
                <FormattedText style={styles.taskItemFailedText}>
                  رد شده
                </FormattedText>
              )}

              {item.status == "DONE" && !isChild && (
                <Button
                  style={styles.taskItemConfirmButton}
                  color={theme.ButtonGreenColor}
                  title="تائید انجام مسئولیت"
                  fontSize={12}
                  titleStyle={styles.taskItemConfirmButtonText}
                  onPress={() => {
                    setTaskId(item.id);
                    navigation.navigate("confirmTask", {
                      item,
                    });
                  }}
                />
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
                    <Trash width={18} height={18} fill={theme.ButtonRedColor} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setTaskName(item.taskName);
                      setIcon(item.icon);
                      setTaskAmount(item.amount);
                      setTaskId(item.id);
                      setTaskType(item.type);
                      setEditTask(true);
                    }}
                  >
                    <Edit width={18} height={18} fill={theme.ButtonBlueColor} />
                  </TouchableOpacity>
                </View>
              )}
              {item.status == "TODO" && isChild && (
                <TouchableOpacity
                  style={[
                    styles.taskItemConfirmButton,
                    { backgroundColor: "#43e6c5", borderRadius: 10 },
                  ]}
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
      <FormattedText
        style={[styles.tasksListTitle, { color: theme.titleColor }]}
        fontFamily="Medium"
      >
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
        <FormattedText
          style={[styles.otherPaymentsTitle, { color: theme.titleColor }]}
          fontFamily="Medium"
        >
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
                  style={[
                    styles.otherPaymentsItemTitle,
                    { color: theme.titleColor },
                  ]}
                  fontFamily="Bold"
                >
                  {item.description.substring(0, 30) || "--"}
                  {item.description.length > 30 && "..."}
                </FormattedText>
                <FormattedText
                  style={styles.otherPaymentsAmount}
                  fontFamily="Regular-FaNum"
                >
                  {formatNumber(item.amount)} ريال
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
      <AlertController
        showModal={deleteTask}
        setShowModal={() => setDeleteTask(false)}
        title="حذف فعالیت"
        description={`آیا از حذف فعالیت “${taskName}” اطمینان دارید؟`}
        rightTitle="انصراف"
        rightColor={theme.titleColor}
        rightAction={() => setDeleteTask(false)}
        leftTitle="بله"
        leftColor={theme.ButtonRedColor}
        leftAction={handleDeleteTask}
        centerText
      />
      <AlertController
        showModal={endTaskModal}
        setShowModal={() => setEndTaskModal(false)}
        title="اتمام فعالیت"
        description={`آیا انجام فعالیت “${taskName}” را تائید می‌کنید؟`}
        rightTitle="بله"
        rightAction={() => handleChildDoneStatusTask(taskId)}
        leftTitle="انصراف"
        leftAction={() => setEndTaskModal(false)}
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
        icon={icon}
      />
    </View>
  );
};
export default withTheme(TaskList);
