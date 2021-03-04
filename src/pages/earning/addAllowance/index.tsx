import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
} from "react-native";
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
  const { childInfo } = props;
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState("");
  const [allowance, setAllowance] = useState("");
  const [paymentDay, setPaymentDay] = useState("0");
  const [deleteAllowance, setDeleteAllowance] = useState<boolean>(false);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const [loading, setLoading] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleAddAllowance = ({ remove }: { remove: boolean }) => {
    setLoading(true);
    const data = {
      paymentDay: paymentDay,
      childId: childInfo.id,
      allowanceAmount: remove ? 0 : allowance,
    };
    addAllowance(token, data)
      .then(() => {
        setLoading(false);
        dispatch(getEarningData(Math.random()));
        toggleModal();
        setDeleteAllowance(false);
        dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
      })
      .catch(() => {
        setLoading(false);
        setDeleteAllowance(false);
      });
  };

  return (
    <View style={styles.container}>
      {!childInfo.allowanceAmount ? (
        <View style={styles.noAllowanceBox}>
          <FormattedText
            style={[styles.noAllowanseTitle, { color: theme.titleColor }]}
            id="earning.allowance"
          />
          <FormattedText style={styles.noAllowanseDescription}>
            مقداری برای پول توجیبی فرزندتان تعیین نکرده‌اید.
          </FormattedText>
          <View style={styles.addAllowanceButton}>
            <Button
              color={theme.ButtonBlueColor}
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setActive(childInfo.paymentDay);
              childInfo.allowanceAmount &&
                setAllowance(childInfo.allowanceAmount + "");
              toggleModal();
            }}
            style={styles.contentBox}
          >
            <FormattedText style={styles.textTitle} fontFamily="Regular-FaNum">
              {formatNumber(childInfo.allowanceAmount)} ریال
            </FormattedText>
            {!isChild && (
              <Edit style={styles.editIcon} fill={theme.ButtonBlueColor} />
            )}
          </TouchableOpacity>
        </View>
      )}
      <Modal
        useNativeDriver
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
              style={{
                color: theme.titleColor,
                fontSize: 16,
                lineHeight: 20,
              }}
              fontFamily="Regular-FaNum"
            >
              پول توجیبی {childInfo.nickname}
            </FormattedText>
            <Close
              onPress={toggleModal}
              width={14}
              height={14}
              fill={colors.title}
            />
          </View>
          <View style={styles.inputBox}>
            <View />
            <TextInput
              style={styles.textInput}
              returnKeyType="done"
              placeholderTextColor="#c9cbcc"
              keyboardType="numeric"
              maxLength={11}
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
            <FormattedText
              style={[styles.description, { color: theme.titleColor }]}
            >
              پول توجیبی به همراه درآمد فرزند شما هر هفته جمعه راس ساعت ۱۲ شب
              واریز خواهد شد.
            </FormattedText>
          </View>
          <UnequalTwinButtons
            style={styles.unequalButtonsWrapper}
            mainText="ذخیره"
            mainColor={theme.ButtonGreenColor}
            mainOnPress={handleAddAllowance}
            secondaryText="حذف"
            secondaryColor={theme.ButtonRedColor}
            secondaryOnPress={() => setDeleteAllowance(true)}
            mainLoading={loading}
          />

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
  );
};
export default withTheme(AddAllowance);
