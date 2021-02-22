import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialTextField from "components/materialTextfield";
import TaskItem from "../addNewTask/taskItem";
import PlusIcon from "components/icons/plus.svg";
import { colors } from "constants/index";

const TaskBox = (props: any) => {
  const {
    isDefaultTask,
    taskName,
    icon,
    amount,
    isOnFcous,
    onChange,
    onChangeText,
  } = props;

  return (
    <View>
      {isDefaultTask ? (
        <TaskItem isSingle taskName={taskName} icon={icon} amount={amount} />
      ) : (
        <View style={styles.textInputBox}>
          <MaterialTextField
            label="نام فعالیت جدید"
            keyboardType="default"
            maxLength={30}
            isOnFcous={isOnFcous}
            onChange={onChange}
            onChangeText={onChangeText}
            editable={!isDefaultTask}
            value={taskName}
          />
          <PlusIcon style={styles.plusIcon} />
        </View>
      )}
    </View>
  );
};

export default TaskBox;

const styles = StyleSheet.create({
  textInputBox: {
    height: 59,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  plusIcon: {
    color: colors.gray600,
    right: "50%",
    bottom: "4%",
  },
});
