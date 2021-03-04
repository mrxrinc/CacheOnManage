import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import Tick from "components/icons/tick.svg";
import Close from "components/icons/close.svg";
import Button from "components/button";
import { useDispatch, useSelector } from "react-redux";
import { childEditTask } from "utils/api";
import { getEarningData } from "redux/actions/Earning";
import { RootState } from "../../../../../customType";
import NoteIcon from "components/icons/note.svg";
import { formatNumber } from "utils";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

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
    console.log(data);
    childEditTask(token, data, taskId)
      .then((res) => {
        console.log(res);
        setLoading(false);
        dispatch(getEarningData(Math.random()));
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
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
  return (
    <Modal
      useNativeDriver
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      style={styles.modal}
      backdropOpacity={backOpacity}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FormattedText style={styles.title}>{title}</FormattedText>
          <TouchableOpacity
            style={{
              width: 24,
              height: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setShowModal(false);
            }}
          >
            <Close width={12} height={12} fill={"black"} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.modalContent,
            {
              justifyContent: "flex-start",
              marginTop: 20,
            },
          ]}
        >
          <View style={styles.iconBox}>
            <Image
              source={{ uri: `data:image/png;base64, ${icon}` }}
              style={styles.itemIcon}
            />
          </View>
          <FormattedText style={styles.taskName}>{taskName}</FormattedText>
        </View>

        <View style={styles.earningBox}>
          <View style={{ alignItems: "flex-start" }}>
            <FormattedText style={styles.earningText}>
              درآمد حاصل از {taskName}
            </FormattedText>

            <View style={styles.factorWrapper}>
              <NoteIcon />
              <FormattedText
                style={[
                  styles.factorText,
                  {
                    color: !amount || factorCheck ? colors.title : colors.red,
                  },
                ]}
              >
                ضریبی ۵،۰۰۰ ریال
              </FormattedText>
            </View>
          </View>
          <View style={styles.earningTextInputBox}>
            <TextInput
              style={styles.TextInput}
              returnKeyType="done"
              keyboardType="numeric"
              maxLength={10}
              underlineColorAndroid={"transparent"}
              onChangeText={(value) => {
                setInputAmount(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""));
                handleFactorCheck(
                  value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")
                );
              }}
              value={formatNumber(inputAmount)}
            />
            <FormattedText id="home.rial" style={styles.unitText} />
          </View>
        </View>
        <View style={styles.repeatingOptionWrapper}>
          <TouchableOpacity
            onPress={() => {
              setActivityType("ONCE");
            }}
            style={styles.activityButton}
          >
            <View
              style={[
                styles.checkBox,
                {
                  borderColor: theme.ButtonGreenColor,
                  backgroundColor:
                    activityType == "ONCE" ? theme.ButtonGreenColor : "white",
                },
              ]}
            >
              <Tick width={14} height={14} fill={"white"} />
            </View>

            <FormattedText
              id="earning.justOnceActivity"
              style={styles.activityText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActivityType("WEEKLY");
            }}
            style={styles.activityButton}
          >
            <View
              style={[
                styles.checkBox,
                {
                  borderColor: theme.ButtonGreenColor,
                  backgroundColor:
                    activityType == "WEEKLY" ? theme.ButtonGreenColor : "white",
                },
              ]}
            >
              <Tick width={14} height={14} fill={"white"} />
            </View>
            <FormattedText
              id="earning.weeklyActivity"
              style={styles.activityText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            color={theme.ButtonGreenColor}
            title="ذخیره"
            onPress={handleTouch}
            disabled={!factorCheck || loading}
            loading={loading}
          />
        </View>
      </View>
    </Modal>
  );
};
export default withTheme(EditTask);
