import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Layout from "components/layout";
import Header from "components/header";
import { useNavigation } from "@react-navigation/core";
import TaskBox from "./TaskBox";
import DefaultTasks from "./DefaultTasks";
import { getDefaultTask, getChildInfo, addNewTask } from "utils/api";
import { RootState } from "../../../../customType";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";
import DetailTask from "./DetailTask";

const AddNew = (props: any) => {
  const navigation = useNavigation();
  const theme = props.theme;
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  const [taskName, setTaskName] = useState("");
  const [amount, setAmount] = useState("");
  const [icon, setIcon] = useState("");
  const [isDefaultTask, setIsDefaultTask] = useState<boolean>(false);
  const [defaulTask, setDefualtTask] = useState([]);
  const [childSelected, setChildSelected] = useState<any>([]);
  const [childInfo, setChildInfo] = useState([]);
  const [onFocus, setOnFocus] = useState(false);
  const [activityTask, setActivityTask] = useState("ONCE");
  const [customDefault, setCustomDefault] = useState(false);
  const [error, setError] = useState<any>({ field: "", message: "" });

  useEffect(() => {
    getDefaultTasks();
    getChildData();
  }, []);

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  const handleAddChild = (child: any) => {
    let newList = childSelected.concat(child);
    setChildSelected(newList);
  };

  const handleRemoveChild = (child: string) => {
    var index = childSelected.indexOf(child);
    let newList = childSelected;
    if (index > -1) {
      childSelected.splice(index, 1);
    }
    setChildSelected(newList);
  };

  const handleClick = () => {
    const data = {
      taskName: taskName,
      activityType: activityTask,
      // childIds: childIdList,
      amount: amount,
      customDefault,
    };
    console.log(childSelected);
    console.log(data);
    // addNewTask(token, data)
    //   .then((response) => {
    //     childIdList.splice(0, childIdList.length);
    //     dispatch(getEarningData(Math.random()));
    //     navigation.navigate("earningTab");
    //   })
    //   .catch((err) => {
    //     console.warn("ERROR: ", err.response);
    //   });
  };
  const getDefaultTasks = () => {
    getDefaultTask(token)
      .then((response: any) => {
        setDefualtTask(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const getChildData = () => {
    getChildInfo(token)
      .then((response: any) => {
        setChildInfo(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const onItem = (item: any) => {
    setTaskName(item.taskName);
    setAmount(item.amount);
    setOnFocus(true);
    setIcon(item.icon);
    setIsDefaultTask(true);
  };

  const handleSelection = (data: any) => {
    const isInclued = childSelected.includes(data);
    if (isInclued) {
      handleRemoveChild(data);
    } else {
      handleAddChild(data);
    }
    console.log(isInclued);
    console.log(data);
  };

  const handleBack = () => {
    if (onFocus) {
      onItem("");
      setOnFocus(false);
      setIsDefaultTask(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Layout>
      <Header dynamicTitle={"تعریف فعالیت جدید"} handleBack={handleBack} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <View style={styles.content}>
          <TaskBox
            isDefaultTask={isDefaultTask}
            taskName={taskName}
            amount={amount}
            icon={icon}
            isOnFcous={() => setOnFocus(true)}
            onChange={clearError}
            onChangeText={(value: any) => setTaskName(value)}
          />
          <DefaultTasks
            isVisible={!onFocus}
            onItem={onItem}
            defaulTask={defaulTask}
          />
          <DetailTask
            childInfo={childInfo}
            setAmount={setAmount}
            onSelect={handleSelection}
            isChild={isChild}
            amount={amount}
            isVisible={onFocus}
            isDefaultTask={isDefaultTask}
            customDefault={customDefault}
            setCustomDefault={() => setCustomDefault(!customDefault)}
            onceActivityTask={activityTask}
            setOnceActivityTask={() => setActivityTask("ONCE")}
            weeklyActivityTask={activityTask}
            setWeeklyActivityTask={() => setActivityTask("WEEKLY")}
          />
        </View>
        <Button
          isHide={!onFocus}
          color={theme.ButtonGreenColor}
          title="تعریف فعالیت جدید"
          onPress={() => handleClick()}
          // disabled={!factorCheck || (!isChild && childIdList.length === 0)}
        />
      </ScrollView>
    </Layout>
  );
};

export default withTheme(AddNew);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    justifyContent: "space-between",
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
