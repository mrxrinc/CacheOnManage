import React, { FC, useState } from "react";
import moment from "moment-jalaali";
// Helpers
import { formatNumber, removeCommas } from "utils";
// Hooks
import { Formik } from "formik";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// Actions
import SavingActions from "store/Saving/saving.actions";
// UI Frameworks
import { View, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import { ScrollView } from "react-native-gesture-handler";
// Common Components
import { FormattedText } from "components/format-text";
import Input from "components/input";
import Button from "components/button";
import DatePicker from "components/datePicker";
import MaterialTextField from "components/materialTextfield";
import AlertController from "components/alertController";
// Types
import { EditTargetData, TargetsData } from "types/saving";
import { SavingState } from "store/Saving/saving.reducer";
import { StateNetwork } from "store/index.reducer";
// Constants
import { colors } from "constants/index";
// Styles
import styles from "./styles";

export interface Errors {
  title?: string;
  targetAmount?: string;
  weeklySavings?: string;
  targetDate?: string;
}
interface Props {
  data: TargetsData;
  childName: string;
  allowance: number | string;
}
const EditTarget: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [targetDate, setTargetDate] = useState(props.data.targetDate);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [weeklyAmount, setWeeklyAmount] = useState<string>(
    String(props.data.weeklySavings)
  );
  const [targetAmount, setTargetAmount] = useState<string>(
    String(props.data.targetAmount)
  );
  const [firstSubmitted, setFirstSubmitted] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [changedBy, setChangedBy] = useState<string>();
  const [showFinishTargetModal, setShowFinishTargetModal] = useState<boolean>(
    false
  );
  // Store
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );

  React.useEffect(() => {
    const $targetAmount = Number(targetAmount);
    const $weeklyAmount = Number(weeklyAmount);
    if ($targetAmount >= 1 && $weeklyAmount >= 1 && changedBy !== "field") {
      const week = ($targetAmount / $weeklyAmount) * 7;
      let targetDate = moment().add(week, "days").format("jYYYY/jMM/jDD");
      setTargetDate(targetDate);
      if (moment(targetDate).isValid()) {
        setChangedBy("system");
      }
    }
  }, [targetAmount, weeklyAmount]);

  React.useEffect(() => {
    if (!moment(targetDate).isValid()) return;

    const $targetAmount = Number(targetAmount);
    // این شرط زمانی اجراء میشود که مبلغ هدف پر شده است و همچنین کاربر تاریخ هدف را نیز انتخاب کرده است
    // حال میبایست ما مبلغ پس انداز هفتگی را محاسبه کنیم
    if ($targetAmount && changedBy === "targetDate") {
      const currentDate = moment();
      const $targetDate = moment(targetDate, "jYYYY/jMM/jDD");
      let diff = $targetDate.diff(currentDate, "days");
      diff = diff < 0 ? diff * -1 : diff;
      // محاسبه تعداد هفته ها باتوجه به نسبت تغییر تاریخ فعلی با تاریخ رسیدن به هدف
      const weeks = Math.round(diff / 7);
      const calculateWeeklySavingAmount = Math.round(
        $targetAmount > weeks ? $targetAmount / weeks : weeks / $targetAmount
      );
      if (
        calculateWeeklySavingAmount &&
        !isNaN(calculateWeeklySavingAmount) &&
        calculateWeeklySavingAmount !== Infinity
      ) {
        setChangedBy("field");
        setWeeklyAmount(`${calculateWeeklySavingAmount}`);
        formik.setFieldValue("weeklySavings", calculateWeeklySavingAmount);
      }
    }
  }, [targetDate]);

  const formik = useFormik({
    initialValues: {
      title: props.data.title,
      targetAmount: String(props.data.targetAmount),
      weeklySavings: String(props.data.weeklySavings),
      targetDate: props.data.targetDate,
    },
    validateOnChange: firstSubmitted,
    validateOnBlur: false,
    validate: (values: EditTargetData) => {
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
    onSubmit: (values: EditTargetData) => {
      const data = {
        id: props.data.id,
        title: values.title,
        targetAmount: removeCommas(values.targetAmount),
        targetDate: targetDate,
        weeklySavings: removeCommas(values.weeklySavings),
      };

      if (
        //@ts-ignore
        removeCommas(values.targetAmount) < removeCommas(props.data.paidAmount)
      ) {
        setShowInfoModal(true);
      } else {
        dispatch(
          SavingActions.updateTarget(data as TargetsData, { sagas: true })
        );
        dispatch(SavingActions.setEditModal(false));
      }
    },
  });

  const handleStartDate = () => {
    setShowDateModal(false);
  };

  function handleChangeTargetDate(value: string) {
    if (moment(value).isValid()) {
      setChangedBy("targetDate");
      setTargetDate(value);
      formik.setFieldValue("targetDate", value);
    }
  }

  function handleWeeklyAmountChange(value: string) {
    const amount = value.includes(",")
      ? Number(removeCommas(value))
      : Number(value);
    if (amount <= Number(targetAmount)) {
      setChangedBy("weeklyAmount");
      addCommasToField("weeklySavings", value);
      setWeeklyAmount(`${removeCommas(value)}`);
    }
  }

  function handleTargetAmountChange(value: string) {
    addCommasToField("targetAmount", value);
    setTargetAmount(`${removeCommas(value)}`);
    setChangedBy("system");
  }

  function addCommasToField(field: keyof typeof formik.values, value: string) {
    if (Number(removeCommas(value))) {
      if (value.length > 3) {
        formik.setFieldValue(field, formatNumber(`${removeCommas(value)}`));
      } else {
        formik.setFieldValue(field, value);
      }
    } else {
      formik.setFieldValue(field, "");
    }
  }

  function handleFinishTargetModal() {
    setShowFinishTargetModal(true);
  }

  function handleFinishTarget() {
    dispatch(SavingActions.finishTarget(props.data.id, { sagas: true }));
    setShowFinishTargetModal(false);
    dispatch(SavingActions.setEditModal(false));
  }
  return (
    <Formik
      initialValues={formik.initialValues}
      onSubmit={(values: any) => formik.handleSubmit(values)}
    >
      <View style={styles.container}>
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
                value={formatNumber(String(formik.values.targetAmount))}
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

          <FormattedText style={styles.amountHint} fontFamily="Regular-FaNum">
            {` ${props.childName} مبلغ ${formatNumber(
              String(props.data.paidAmount)
                ? String(props.data.paidAmount)
                : "0"
            )} از ${formatNumber(
              String(props.data.targetAmount)
            )} ریال را ذخیره کرده است `}
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
                editable={!!formik.values.targetAmount}
                value={formatNumber(String(formik.values.weeklySavings))}
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
              onPress={() =>
                formik.values.targetAmount && setShowDateModal(!showDateModal)
              }
            >
              <View style={styles.targetDateBox}>
                <FormattedText
                  style={[styles.halfWidth, styles.targetDate]}
                  fontFamily="Regular-FaNum"
                >
                  {targetDate}
                </FormattedText>
              </View>
            </TouchableWithoutFeedback>
            <FormattedText style={[styles.unit]}></FormattedText>
          </View>
        </ScrollView>
        <View style={styles.inputWrapper}>
          <Button
            onPress={formik.handleSubmit}
            disabled={!formik.isValid || savingStore.loading}
            title="ذخیره"
            color="#43e6c5"
            style={styles.submitButton}
            loading={savingStore.loading}
          />
          <Button
            onPress={handleFinishTargetModal}
            title="اتمام هدف"
            color={colors.buttonSubmitActive}
            style={styles.submitButton}
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
        <AlertController
          showModal={showFinishTargetModal}
          setShowModal={() => setShowFinishTargetModal(false)}
          title="اتمام هدف"
          description={`با تایید اتمام هدف ${props.data.title} , مبلغ ${
            props.data.paidAmount
              ? formatNumber(String(props.data.paidAmount))
              : "0"
          } ریال از حساب پس انداز شما کسر شده و به کارت شما منتقل می شود.`}
          rightAction={handleFinishTarget}
          rightTitle="اتمام هدف"
          leftTitle="انصراف"
          leftAction={() => setShowFinishTargetModal(false)}
        />

        <AlertController
          showModal={showInfoModal}
          setShowModal={() => setShowInfoModal(false)}
          title="ویرایش هدف پس انداز"
          description={`شما تا حالا ${formatNumber(
            String(props.data.paidAmount)
          )} ریال پس انداز کرده اید. مبلغ جدید هدف نمی تواند از این مقدار کمتر باشد.`}
          middleAction={() => setShowInfoModal(false)}
          middleTitle="متوجه شدم"
        />
      </View>
    </Formik>
  );
};

export default EditTarget;
