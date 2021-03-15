import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import Button from "components/button";
import { useDispatch, useSelector } from "react-redux";
import { childEditTask } from "utils/api";
import { getEarningData } from "redux/actions/Earning";
import { RootState } from "../../../../../customType";
import { formatNumber } from "utils";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";
import Header from "./Header";
import TaskName from "./TaskName";
import InputInfo from "./InputInfo";
import ToggleOptions from "pages/earning/addNewTask/ToggleOptions";

const EditTask = ({
  showModal,
  setShowModal,
  title,
  taskName,
  amount,
  taskId,
  type,
  icon,
  backOpacity,
  theme,
}: any) => {
  const [inputAmount, setInputAmount] = useState("");
  const [activityType, setActivityType] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [factorCheck, setFactorCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setInputAmount(amount);
    handleFactorCheck(amount);
  }, [amount, showModal]);

  useEffect(() => {
    setActivityType(type === "WEEKLY" ? type : "ONCE");
  }, [type]);

  const handleTouch = () => {
    setLoading(true);
    let data = {
      id: taskId,
      amount: inputAmount,
      taskName: taskName,
      activityType,
    };
    childEditTask(token, data, taskId)
      .then(() => {
        setLoading(false);
        dispatch(getEarningData(Math.random()));
        setShowModal(false);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  const handleFactorCheck = (value: string) => {
    if (parseInt(value) % 5000 === 0) {
      setFactorCheck(true);
    } else {
      setFactorCheck(false);
    }
  };

  const onChangeAmount = (inp: any) => {
    setInputAmount(ckeckTemp(inp));
    handleFactorCheck(ckeckTemp(inp));
  };

  const ckeckTemp = (inp: string) => {
    return inp.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
  };

  let disableBtn =
    !factorCheck || loading || inputAmount.toString().charAt(0) === "0";
  return (
    <Modal
      useNativeDriver
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      style={styles.modal}
      backdropOpacity={backOpacity}
    >
      <View style={styles.modalContainer}>
        <Header onClose={() => setShowModal(false)} title={title} />
        <TaskName icon={icon} taskName={taskName} />
        <InputInfo
          value={formatNumber(inputAmount)}
          amount={amount}
          onChangeText={onChangeAmount}
          taskName={taskName}
          factorCheck={factorCheck}
        />
        <ToggleOptions
          isChild={false}
          isDefaultTask
          onceActivityTask={activityType}
          setOnceActivityTask={() => setActivityType("ONCE")}
          weeklyActivityTask={activityType}
          setWeeklyActivityTask={() => setActivityType("WEEKLY")}
        />
        <Button
          style={styles.buttonWrapper}
          color={theme.ButtonGreenColor}
          title="ذخیره"
          onPress={handleTouch}
          disabled={disableBtn}
          loading={loading}
        />
      </View>
    </Modal>
  );
};
export default withTheme(EditTask);
