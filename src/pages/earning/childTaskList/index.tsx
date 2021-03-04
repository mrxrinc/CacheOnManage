import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import { useNavigation } from "@react-navigation/core";
import AlertController from "components/alertController";
import { deleteChildTask, childStatusTask } from "utils/api";
import { RootState } from "../../../../customType";
import { useDispatch, useSelector } from "react-redux";
import EditTask from "./editTaskModal";
import { getEarningData } from "redux/actions/Earning";
import { formatNumber } from "utils";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";
import Item from "./item/Item";

const TaskList = (props: any) => {
  const theme = props.theme;
  const { childInfo } = props;
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

  const handleDeleteTask = () => {
    deleteChildTask(token, taskId)
      .then(() => {
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
      .then(() => {
        dispatch(getEarningData(id));
        setStatusTask(false);
      })
      .catch(function (error) {
        throw error;
      });
  };

  const otherPayments = childInfo.incomes;
  return (
    <View style={styles.container}>
      <FormattedText
        style={[styles.tasksListTitle, { color: theme.titleColor }]}
        fontFamily="Medium"
      >
        فعالیت ها
      </FormattedText>
      {childInfo.task == "" ? (
        <View style={styles.emptyTasksListContainer}>
          <View style={styles.emptyTasksList}>
            <FormattedText
              style={styles.emptyTaskDescription}
              id="earning.taskDescription"
            />
          </View>
        </View>
      ) : (
        <FlatList
          numColumns={1}
          contentContainerStyle={styles.taskItemsContainer}
          data={childInfo.task}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Item
              status={item.status}
              theme={theme}
              item={item}
              onDone={() => {
                setTaskId(item.id);
                navigation.navigate("confirmTask", {
                  item,
                });
              }}
              onDelete={() => {
                setTaskId(item.id);
                setDeleteTask(true);
                setTaskName(item.taskName);
              }}
              onEdit={() => {
                setTaskName(item.taskName);
                setIcon(item.icon);
                setTaskAmount(item.amount);
                setTaskId(item.id);
                setTaskType(item.type);
                setEditTask(true);
              }}
              onToDo={() => {
                setTaskId(item.id);
                setTaskName(item.taskName);
                setEndTaskModal(true);
              }}
            />
          )}
        />
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
