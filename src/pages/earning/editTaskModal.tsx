import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import { colors, IOS } from "constants/index";
import Tick from "components/icons/tick.svg";
import Close from "components/icons/close.svg";
import Button from "components/button";
import { useDispatch, useSelector } from "react-redux";
import { childEditTask } from "utils/api";
import { getEarningData } from "redux/actions/Earning";
import { RootState } from "../../../customType";
import NoteIcon from "components/icons/note.svg";
import { formatNumber } from "utils";

export default ({
  showModal,
  setShowModal,
  title,
  taskName,
  amount,
  taskId,
  type,
  icon,
  backOpacity,
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
      .then((response) => {
        console.log("childEditTask response", response);
        setLoading(false);
        dispatch(getEarningData(Math.random()));
        setShowModal(false);
      })
      .catch(function (error) {
        console.log("childEditTask err" + error.message);
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
                ضریبی از ۵،۰۰۰ ریال
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
                setInputAmount(value.replace(/,/g, ""));
                handleFactorCheck(value.replace(/,/g, ""));
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
              style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: "#43e6c5",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: activityType == "ONCE" ? "#43e6c5" : "white",
              }}
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
              style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: "#43e6c5",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: activityType == "WEEKLY" ? "#43e6c5" : "white",
              }}
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
            color={colors.buttonSubmitActive}
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

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    minHeight: 318,
    width: "90%",
    maxWidth: 335,
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    paddingRight: 12,
    paddingLeft: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 8,
  },
  title: {
    color: colors.title,
    fontSize: 16,
    lineHeight: IOS ? 12 : 18,
    marginTop: 10,
  },
  taskName: {
    fontSize: 14,
    fontFamily: colors.text,
    marginLeft: 5,
  },
  description: {
    color: colors.gray500,
    fontSize: 14,
    marginTop: 5,
  },
  repeatingOptionWrapper: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    height: 60,
    marginTop: 20,
  },
  footer: {
    width: "100%",
    height: 44,
    borderTopWidth: 1,
    borderTopColor: colors.gray600,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    marginTop: 20,
    width: "100%",
    height: 44,
    paddingHorizontal: 20,
  },
  button: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerMiddleBorder: {
    width: 1,
    backgroundColor: colors.gray600,
  },
  buttonTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: colors.gray950,
    borderColor: colors.gray650,
    borderWidth: 0.5,
  },
  itemIcon: {
    width: 32,
    height: 32,
  },
  earningText: {
    fontSize: 12,
    color: colors.gray550,
    marginLeft: 2,
  },
  earningBox: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  earningTextInputBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  TextInput: {
    backgroundColor: "#f4f6fa",
    height: 36,
    fontSize: 16,
    color: "black",
    width: 80,
    borderRadius: 10,
    textAlign: "center",
    fontFamily: "IRANSansMobileFaNum",
    paddingBottom: 0,
  },
  unitText: {
    color: colors.title,
    fontSize: 12,
    marginLeft: 6,
  },
  activityText: {
    color: "#515c6f",
    fontSize: 14,
    marginLeft: 5,
  },
  activityButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  factorWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  factorText: {
    fontSize: 12,
    color: colors.title,
    lineHeight: 18,
  },
});
