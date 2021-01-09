import React, { FC, useState } from "react";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import Input from "components/input";
import { useDispatch } from "react-redux";
import Button from "components/button";
import DatePicker from "components/datePicker";
import { colors } from "constants/index";
import { useFormik } from "formik";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import MaterialTextField from "components/materialTextfield";
import SavingService from "services/http/endpoints/saving";
import SavingActions from "store/Saving/saving.actions";
import { formatNumber, removeCommas } from "utils";
import { AddTarget } from "types/saving";
import moment from "moment-jalaali";
import { useNavigation } from "@react-navigation/native";

export interface Errors {
  title?: string;
  targetAmount?: string;
  weeklySavings?: string;
  targetDate?: string;
}

const EditTarget: FC<any> = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [finishTargetloading, setFinishTargetLoading] = useState<boolean>(
    false
  );
  const [targetDate, setTargetDate] = useState(props.data.targetDate);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [weeklyAmount, setWeeklyAmount] = useState(props.data.weeklySavings);
  const [targetAmount, setTargetAmount] = useState(props.data.targetAmount);
  const [firstSubmitted, setFirstSubmitted] = useState(false);

  React.useEffect(() => {
    console.log("useeffect");
    if (targetAmount || weeklyAmount) {
      const week =
        (Number(removeCommas(targetAmount)) /
          Number(removeCommas(weeklyAmount))) *
        7;
      let targetDate = moment(new Date())
        .utc()
        .add(week, "d")
        .format("jYYYY/jMM/jDD");
      setTargetDate(targetDate);
    }
  }, [targetAmount, weeklyAmount]);

  const formik = useFormik({
    initialValues: {
      title: props.data.title,
      targetAmount: String(props.data.targetAmount),
      weeklySavings: String(props.data.weeklySavings),
      targetDate: props.data.targetDate,
    },
    validateOnChange: firstSubmitted,
    validateOnBlur: false,
    validate: (values: AddTarget) => {
      const errors: Errors = {};
      setFirstSubmitted(true);
      if (!values.title) {
        errors.title = "لطفا عنوان هدف را وارد نمایید";
      }
      if (!values.targetAmount) {
        errors.targetAmount = "لطفا مبلغ هدف را وارد نمایید";
      }
      if (!values.weeklySavings) {
        errors.weeklySavings = "لطفا مبلغ پس انداز هفتگی را وارد نمایید";
      }
      if (
        values.targetAmount &&
        Number(values.targetAmount) < Number(values.weeklySavings)
      ) {
        errors.weeklySavings = "مبلغ پس انداز نمی تواند بیشتر از مبلغ هدف باشد";
      }
      if (
        values.weeklySavings &&
        Number(values.weeklySavings) > Number(props.allowance)
      ) {
        errors.weeklySavings =
          "مبلغ پس انداز هفتگی نمی‌تواند بیشتر از مبلغ پول توجیبی باشد.";
      }

      return errors;
    },
    onSubmit: async (values: any) => {
      const data = {
        id: props.data.id,
        title: values.title,
        targetAmount: values.targetAmount,
        targetDate: targetDate,
        weeklySavings: values.weeklySavings,
      };
      try {
        setLoading(true);
        await SavingService.updateTarget(data);
        dispatch(SavingActions.setEditModal(false));
        dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
        setLoading(false);
      } catch {
        setLoading(false);
      }
    },
  });

  const handleStartDate = () => {
    setShowDateModal(false);
  };

  function handleChangeTargetDate(value: string) {
    setTargetDate(value);
    formik.setFieldValue("targetDate", value);
  }

  function handleWeeklyAmountChange(value: string) {
    formik.setFieldValue("weeklySavings", value.replace(/,/g, ""));
    setWeeklyAmount(value);
  }

  function handleTargetAmountChange(value: string) {
    formik.setFieldValue("targetAmount", value.replace(/,/g, ""));
    setTargetAmount(value);
  }

  async function handleFinishTarget() {
    try {
      setFinishTargetLoading(true);
      await SavingService.finishTarget(props.data.id);
      setFinishTargetLoading(false);
      dispatch(SavingActions.setEditModal(false));
      await dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
    } catch {
      setFinishTargetLoading(false);
    }
  }

  return (
    <ScrollView style={styles.content}>
      <Formik
        initialValues={formik.initialValues}
        onSubmit={(values: any) => formik.handleSubmit(values)}
      >
        <ScrollView>
          <View style={styles.titleInputWrapper}>
            <MaterialTextField
              label="عنوان هدف"
              value={formik.values.title}
              onChangeText={(value: string) =>
                formik.setFieldValue("title", value)
              }
              error={formik.errors.title}
            />
          </View>

          <View style={styles.inputWrapper}>
            <FormattedText style={[styles.halfWidth, styles.gray]}>
              مبلغ هدف
            </FormattedText>
            <View style={[styles.halfWidth]}>
              <Input
                value={formatNumber(formik.values.targetAmount)}
                onChangeText={(value: string) =>
                  handleTargetAmountChange(value)
                }
                keyboardType={"number-pad"}
                maxLength={11}
                boxMode
                customStyle={styles.input}
                containerCustomStyle={styles.inputContainer}
                inputCustomStyle={styles.inputInner}
              />
            </View>
            <FormattedText style={[styles.unit]}>ریال</FormattedText>
          </View>
          <FormattedText style={styles.amountHint}>
            {` ${props.childName} مبلغ ${props.data.paidAmount} از ${props.data.targetAmount} ریال را ذخیره کرده است `}
          </FormattedText>
          {formik.errors.targetAmount && (
            <FormattedText style={styles.error}>
              {formik.errors.targetAmount}
            </FormattedText>
          )}
          <View style={styles.inputWrapper}>
            <FormattedText style={[styles.halfWidth, styles.gray]}>
              مبلغ پس انداز هفتگی
            </FormattedText>
            <View style={[styles.halfWidth]}>
              <Input
                value={formatNumber(formik.values.weeklySavings)}
                onChangeText={(value: string) =>
                  handleWeeklyAmountChange(value)
                }
                keyboardType={"number-pad"}
                boxMode
                maxLength={11}
                customStyle={styles.input}
                containerCustomStyle={styles.inputContainer}
                inputCustomStyle={styles.inputInner}
              />
            </View>
            <FormattedText style={[styles.unit]}>ریال</FormattedText>
          </View>
          {formik.errors.weeklySavings && (
            <FormattedText style={styles.error}>
              {formik.errors.weeklySavings}
            </FormattedText>
          )}
          <View style={styles.dateWrapper}>
            <FormattedText style={[styles.halfWidth, styles.gray]}>
              تاریخ رسیدن به هدف
            </FormattedText>
            <TouchableWithoutFeedback
              onPress={
                weeklyAmount && targetAmount
                  ? () => setShowDateModal(false)
                  : () => setShowDateModal(!showDateModal)
              }
            >
              <FormattedText
                style={[styles.halfWidth, styles.startDate]}
                fontFamily="Regular-FaNum"
              >
                {targetDate}
              </FormattedText>
            </TouchableWithoutFeedback>
            <FormattedText style={[styles.unit]}></FormattedText>
          </View>
          <View style={styles.inputWrapper}>
            <Button
              onPress={formik.handleSubmit}
              disabled={!formik.isValid || loading}
              title="ذخیره"
              color={colors.buttonSubmitActive}
              style={styles.submitButton}
              loading={loading}
            />
            <Button
              onPress={handleFinishTarget}
              disabled={finishTargetloading}
              title="اتمام هدف"
              color={colors.buttonSubmitActive}
              style={styles.submitButton}
              loading={finishTargetloading}
            />
          </View>
          <Modal
            isVisible={showDateModal}
            onBackdropPress={() => setShowDateModal(false)}
            style={styles.modal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalSwipeHandle} />
              <DatePicker
                birthDate={(value: any) => handleChangeTargetDate(value)}
              />
              <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Button
                  title="انتخاب"
                  onPress={handleStartDate}
                  color={colors.links}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Formik>
    </ScrollView>
  );
};

export default EditTarget;
