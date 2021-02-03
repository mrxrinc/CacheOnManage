import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import Button from "components/button";
import Edit from "components/icons/edit.svg";
import Tick from "components/icons/tick.svg";
import Close from "components/icons/close.svg";
import Modal from "react-native-modal";
import AlertController from "components/alertController";
import { formatNumber } from "utils";
import { addAllowance } from "utils/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../customType";
import { getEarningData } from "redux/actions/Earning";
import UnequalTwinButtons from "components/unequalTwinButtons";
import SavingActions from "store/Saving/saving.actions";

const { width, height } = Dimensions.get("window");

const days = [
  { name: "0" },
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" },
  { name: "6" },
];
const AddAllowance = (props: any) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState("");
  const [allowance, setAllowance] = useState("");
  const [paymentDay, setPaymentDay] = useState("0");
  const [deleteAllowance, setDeleteAllowance] = useState<boolean>(false);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleAddAllowance = ({ remove }: { remove: boolean }) => {
    const data = {
      paymentDay: paymentDay,
      childId: props.childInfo.id,
      allowanceAmount: remove ? 0 : allowance,
    };
    addAllowance(token, data)
      .then((response) => {
        dispatch(getEarningData(Math.random()));
        toggleModal();
        setDeleteAllowance(false);
        dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
      })
      .catch((err) => {
        console.log("err is", err.response);
        setDeleteAllowance(false);
      });
  };

  const renderGridItem = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={styles.daysContainer}
        onPress={() => {
          setPaymentDay(item.name);
          setActive(index);
        }}
      >
        <View
          style={[
            styles.activeBox,
            { backgroundColor: active == index ? "#43e6c5" : "white" },
          ]}
        >
          <Tick width={14} height={14} fill={"white"} />
        </View>
        <FormattedText
          style={{ color: "#515c6f", fontSize: 12, marginLeft: 5, width: 50 }}
        >
          {item.name == "0"
            ? "شنبه"
            : item.name == "1"
            ? "یکشنبه"
            : item.name == "2"
            ? "دوشنبه"
            : item.name == "3"
            ? "سه شنبه"
            : item.name == "4"
            ? "چهارشنبه"
            : item.name == "5"
            ? "پنج شنبه"
            : "جمعه"}
        </FormattedText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!props.childInfo.allowanceAmount ? (
        <View style={styles.noAllowanceBox}>
          <FormattedText
            style={styles.noAllowanseTitle}
            id="earning.allowance"
          />
          <FormattedText style={styles.noAllowanseDescription}>
            مقداری برای پول توجیبی فرزندتان تعیین نکرده‌اید.
          </FormattedText>
          <View style={styles.addAllowanceButton}>
            <Button
              color={colors.buttonOpenActive}
              title="تعریف پول توجیبی"
              outline
              onPress={toggleModal}
              style={{ elevation: 0, shadowOpacity: 0 }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.yesAllowanceBox}>
          <FormattedText style={styles.textTitle} id="earning.allowance" />

          <View style={styles.contentBox}>
            <FormattedText style={styles.textTitle} fontFamily="Regular-FaNum">
              {formatNumber(props.childInfo.allowanceAmount)} ریال
            </FormattedText>
            {!isChild && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setActive(props.childInfo.paymentDay);
                  props.childInfo.allowanceAmount &&
                    setAllowance(props.childInfo.allowanceAmount + "");
                  toggleModal();
                }}
              >
                <Edit width={22} height={22} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0.3}
          backdropTransitionOutTiming={10}
          backdropTransitionInTiming={500}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.addAllowanceModal}>
            <View style={styles.header}>
              <View />
              <FormattedText
                style={{ color: "#00015d", fontSize: 16, lineHeight: 20 }}
                fontFamily="Regular-FaNum"
              >
                پول توجیبی {props.childInfo.nickname}
              </FormattedText>
              <TouchableOpacity onPress={toggleModal}>
                <Close width={14} height={14} fill={colors.title} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
              <View />
              <TextInput
                style={styles.textInput}
                returnKeyType="done"
                placeholderTextColor="#c9cbcc"
                keyboardType="numeric"
                maxLength={9}
                underlineColorAndroid={"transparent"}
                onChangeText={(text) => {
                  setAllowance(text.replace(/,/g, ""));
                }}
                value={formatNumber(allowance) ?? ""}
              />
              <FormattedText style={{ color: colors.title, fontSize: 12 }}>
                {" "}
                ریال
              </FormattedText>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <FormattedText style={styles.description}>
                پول توجیبی به همراه درآمد فرزند شما هر هفته جمعه راس ساعت ۱۲ شب
                واریز خواهد شد.
              </FormattedText>
              {/* <FlatList
                // horizontal={true}
                numColumns={3}
                contentContainerStyle={{
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  width: 290,
                  height: 120,
                  marginRight: "20%",
                }}
                data={days}
                renderItem={({ item, index }) => renderGridItem(item, index)}
              /> */}
            </View>
            <View style={styles.unequalButtonsWrapper}>
              <UnequalTwinButtons
                mainText="ذخیره"
                mainColor={colors.buttonSubmitActive}
                mainOnPress={handleAddAllowance}
                secondaryText="حذف"
                secondaryColor={colors.buttonDestructiveActive}
                secondaryOnPress={() => setDeleteAllowance(true)}
              />
            </View>

            <AlertController
              showModal={deleteAllowance}
              setShowModal={() => setDeleteAllowance(false)}
              title="حذف پول توجیبی"
              description="با انجام این عمل دیگر پول توجیبی بصورت اتوماتیک از حساب شما کسر نمی‌شود.آیا از حذف پول توجیبی اطمینان دارید؟"
              rightTitle="انصراف"
              rightAction={() => setDeleteAllowance(false)}
              leftTitle="حذف"
              leftColor={colors.red}
              leftAction={() => {
                setAllowance("0");
                handleAddAllowance({ remove: true });
              }}
              centerText
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default AddAllowance;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    backgroundColor: colors.white,
  },
  noAllowanceBox: {
    padding: 16,
    paddingHorizontal: 20,
    width: "100%",
  },
  noAllowanseTitle: {
    color: colors.title,
    fontSize: 14,
    lineHeight: 17,
  },
  noAllowanseDescription: {
    color: colors.text,
    fontSize: 12,
    textAlign: "left",
    lineHeight: 17,
    marginTop: 10,
  },
  addAllowanceButton: {
    paddingHorizontal: 36,
    paddingTop: 16,
  },
  yesAllowanceBox: {
    width: width * 0.89,
    height: height * 0.083,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textTitle: {
    fontSize: 16,
  },
  contentBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
  },
  daysContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: 65,
    margin: "2%",
    flexDirection: "row",
  },
  activeBox: {
    width: 20,
    height: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#43e6c5",
  },
  addAllowanceModal: {
    width: width * 0.89,
    height: height * 0.45,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "45%",
  },
  textInput: {
    width: 128,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#f4f6fa",
    textAlign: "center",
    fontFamily: "IRANSansMobileFaNum",
  },
  description: {
    fontSize: 14,
    color: colors.title,
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  unequalButtonsWrapper: {
    width: "100%",
    alignItems: "center",
  },
});
