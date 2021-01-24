import React, { FC, useState } from "react";
import { removeCommas, formatNumber } from "utils";
// Hooks
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
// API
import SavingService from "services/http/endpoints/saving";
// Actions
import SavingActions from "store/Saving/saving.actions";
// UI Frameworks
import { Formik } from "formik";
import { View, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import moment from "moment-jalaali";
import { ScrollView } from "react-native-gesture-handler";
// Common Components
import Input from "components/input";
import Layout from "components/layout";
import Header from "components/header";
import { FormattedText } from "components/format-text";
import Button from "components/button";
import MaterialTextField from "components/materialTextfield";
import DatePicker from "components/datePicker";
// Constants
import { colors } from "constants/index";
// Types
import { RootState } from "../../../../../customType";
import { AddTarget, SelectedTargetsData } from "types/saving";
import { StateNetwork } from "store/index.reducer";
// Styles
import styles from "./styles";
export interface Errors {
  title?: string;
  targetAmount?: string;
  weeklySavings?: string;
  targetDate?: string;
}

interface Props {
  navigation: any;
}

const AddNewTarget: FC<Props> = (props) => {
  const targetDateRef = React.useRef();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [targetDate, setTargetDate] = useState<string>("");
  const [weeklyAmount, setWeeklyAmount] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [firstSubmitted, setFirstSubmitted] = React.useState(false);
  const [changedBy, setChangedBy] = React.useState<string>();

  const selectedTargetData = useSelector<StateNetwork, SelectedTargetsData>(
    (state) => state.saving.selectedTargetsData
  );
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

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
    // این شرط زمانی اجراء میشود که مبلغ هدف پر شده است و همچنین کاربر تاریخ هدف را نیز انتخاب است
    // حال میبایست ما مبلغ پس اندازه هفتگی را محاسبه کنیم
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
      title: "",
      targetAmount: "",
      weeklySavings: "",
      targetDate: "",
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
        Number(values.weeklySavings) > Number(selectedTargetData?.allowance)
      ) {
        errors.weeklySavings =
          "مبلغ پس انداز هفتگی نمی‌تواند بیشتر از مبلغ پول توجیبی باشد.";
      }

      return errors;
    },
    onSubmit: (values: AddTarget) => {
      const data = {
        childId: selectedTargetData.childId,
        title: values.title,
        targetAmount: removeCommas(values.targetAmount),
        targetDate: targetDate,
        weeklySavings: removeCommas(values.weeklySavings),
      };
      dispatch(SavingActions.addTarget(data as AddTarget, { sagas: true }));
      navigation.navigate("saving");
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

  return (
    <Layout>
      <Header
        staticTitle={"addNewTarget"}
        handleBack={() => props.navigation.goBack()}
      />
      <ScrollView contentContainerStyle={[styles.container]}>
        <FormattedText style={styles.targetDesc}>
          تعریف هدف پس انداز برای{" "}
          {isChild ? "شما" : selectedTargetData.childName}
        </FormattedText>
        <Formik
          initialValues={formik.initialValues}
          onSubmit={(values: any) => formik.handleSubmit(values)}
        >
          <>
            <ScrollView>
              <View style={styles.titleInputWrapper}>
                <MaterialTextField
                  label="عنوان هدف"
                  value={formik.values.title}
                  onChangeText={(value: string) =>
                    formik.setFieldValue("title", value)
                  }
                  style={styles.titleInput}
                  error={formik.errors.title}
                />
              </View>
              <View style={styles.inputWrapper}>
                <FormattedText style={[styles.halfWidth, styles.gray]}>
                  مبلغ هدف
                </FormattedText>
                <View style={[styles.halfWidth]}>
                  <Input
                    value={formik.values.targetAmount}
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
                <View style={styles.targetDateBox}>
                  <DatePicker
                    noIcon
                    light
                    defaultValue={targetDate}
                    active={formik.values.targetAmount}
                    handleChosenDate={(val: string) => {
                      handleChangeTargetDate(val);
                      setShowDateModal(false);
                    }}
                  />
                </View>
                <FormattedText style={[styles.unit]}></FormattedText>
              </View>
            </ScrollView>

            <View style={{ marginTop: 20 }}>
              <Button
                onPress={formik.handleSubmit}
                disabled={!formik.isValid || loading}
                title="تعریف هدف جدید"
                color={colors.buttonSubmitActive}
              />
            </View>
          </>
        </Formik>
      </ScrollView>
    </Layout>
  );
};

export default AddNewTarget;
