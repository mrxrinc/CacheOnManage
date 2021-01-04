import React, { FC, useState } from "react";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import Layout from "components/layout";
import Header from "components/header";
import { FormattedText } from "components/format-text";
import Input from "components/input";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/button";
import DatePicker from "components/datePicker";
import { colors } from "constants/index";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/core";
import { RootState } from "../../../../../customType";
import styles from "./styles";
import { removeCommas, formatNumber } from "utils";
import SavingService from "services/http/endpoints/saving";
import { AddTarget } from "types/saving";
import SavingActions from "store/Saving/saving.actions";
import { StateNetwork } from "store/index.reducer";
import { SavingState } from "store/Saving/saving.reducer";
import MaterialTextField from "components/materialTextfield";
import moment from "moment-jalaali";

export interface Errors {
  title?: string;
  targetAmount?: string;
  weeklySavings?: string;
  targetDate?: string;
}

const AddNewTarget: FC = (props: any) => {
  const targetDateRef = React.useRef();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [targetDate, setTargetDate] = useState<string>("");
  const [weeklyAmount, setWeeklyAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [firstSubmitted, setFirstSubmitted] = React.useState(false);

  const selectedTargetData = useSelector<StateNetwork, SavingState>(
    (state) => state.saving.selectedTargetsData
  );
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  React.useEffect(() => {
    console.log("weeklyAmount useeffect");
    if (targetAmount && weeklyAmount) {
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

  React.useEffect(() => {
    console.log("targetDate useeffect");
    setWeeklyAmount("");
    if (targetAmount && targetDate) {
      const targetDateSplit = targetDate.split("/").map((i) => Number(i));
      const currentDate = moment(new Date())
        .utc()
        .format("jYYYY/jMM/jDD")
        .split("/")
        .map((i) => Number(i));

      const currentAndTargetDateDiff = moment(
        targetDateSplit,
        "jYYYY/jMM/jDD"
      ).diff(moment(currentDate, "jYYYY/jMM/jDD"), "days");
      const week = currentAndTargetDateDiff / 7;
      const weeklyAmount = Math.floor(
        Number(removeCommas(targetAmount)) / Math.floor(week)
      ).toString();
      if (weeklyAmount > targetAmount) {
        setWeeklyAmount("");
      }
      formik.setFieldValue("weeklySavings", weeklyAmount);
    }
  }, [targetAmount, targetDate]);

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
    onSubmit: async (values: any) => {
      const data = {
        childId: selectedTargetData.childId,
        title: values.title,
        targetAmount: values.targetAmount,
        targetDate: targetDate,
        weeklySavings: values.weeklySavings,
      };
      console.log("onSubmit: ~ data", data);
      try {
        setLoading(true);
        await SavingService.addTarget(data);
        navigation.navigate("saving");
        dispatch(SavingActions.setSavingsDataList(null, { sagas: true }));
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
                    value={formatNumber(formik.values.targetAmount)}
                    onChangeText={(value: string) =>
                      handleTargetAmountChange(value)
                    }
                    keyboardType={"number-pad"}
                    maxLength={11}
                    boxMode
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
                    value={formatNumber(formik.values.weeklySavings)}
                    onChangeText={(value: string) =>
                      handleWeeklyAmountChange(value)
                    }
                    keyboardType={"number-pad"}
                    boxMode
                    maxLength={11}
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
                  onPress={() => setShowDateModal(!showDateModal)}
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
            </ScrollView>

            <Button
              onPress={formik.handleSubmit}
              disabled={!formik.isValid || loading}
              title="تعریف هدف جدید"
              color={colors.buttonSubmitActive}
            />
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
          </>
        </Formik>
      </ScrollView>
    </Layout>
  );
};

export default AddNewTarget;
