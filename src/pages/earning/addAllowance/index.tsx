import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import Button from "components/button";
import Edit from "components/icons/editIcon.svg";
import Close from "components/icons/close.svg";
import Modal from "react-native-modal";
import AlertController from "components/alertController";
import { formatNumber } from "utils";
import { addAllowance } from "utils/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../customType";
import { getEarningData } from "redux/actions/Earning";
import UnequalTwinButtons from "components/unequalTwinButtons";
import SavingActions from "store/Saving/saving.actions";
import { withTheme } from "themeCore/themeProvider";
import styles from "./styles";

const AddAllowance = (props: any) => {
  const theme = props.theme;
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
        setDeleteAllowance(false);
      });
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
                <Edit width={19} height={19} fill={theme.ButtonBlueColor} />
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
export default withTheme(AddAllowance);
