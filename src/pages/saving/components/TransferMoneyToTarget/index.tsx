import React, { FC } from "react";
import * as R from "ramda";
// Hooks
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
// Ui Frameworks
import { Formik } from "formik";
import { View, ScrollView, TouchableOpacity } from "react-native";
// Common Components
import Header from "components/header";
import MaterialTextField from "components/materialTextfield";
import { FormattedText } from "components/format-text";
import Layout from "components/layout";
import Button from "components/button";
import ActionModalCentered from "components/modal/actionModalCentered";
import PaymentTransactionResult from "components/PaymentTransactionResult";
// Utils
import { formatNumber } from "utils";
import messages from "utils/fa";
// Types
import { StateNetwork } from "store/index.reducer";
import { SavingState } from "store/Saving/saving.reducer";
import { SelectedTargetsData } from "types/saving";
// Actions;
import SavingActions from "store/Saving/saving.actions";
// Images
import Tick from "components/icons/tick.svg";
// Styles
import style from "./styles";
import { colors } from "constants/index";

interface Props {
  navigation: any;
}

interface Errors {
  amount?: string;
  target?: string;
}

interface TransferValues {
  amount: string;
  from?: string;
  to?: string;
  description?: string;
  target: string;
}
const MessagesContext = React.createContext(messages);

const TransferMoneyToTarget: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const translate = React.useContext(MessagesContext);

  const [firstSubmitted, setFirstSubmitted] = React.useState(false);
  const [paidAmount, setPaidAmount] = React.useState(0);
  const [targetAmount, setTargetAmount] = React.useState(0);
  const [checkedTarget, setCheckedTarget] = React.useState("");

  // Store
  const selectedTargetData = useSelector<StateNetwork, SelectedTargetsData>(
    (state) => state.saving.selectedTargetsData
  );

  const profileInfo = useSelector<any, any>((state) => state.home.homeData);
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );
  const isChild = useSelector<any, boolean>((state) => state.user.ischild);

  const transactionResults = React.useMemo(() => {
    if (savingStore.transferMoneyToTargetTransactionResult?.data) {
      const result = R.map((key: string) => {
        const isAmount = key === "amount";

        return {
          key: translate[key],
          value: isAmount
            ? formatNumber(
                savingStore.transferMoneyToTargetTransactionResult.data[key]
              )
            : savingStore.transferMoneyToTargetTransactionResult.data[key],
          unit: isAmount ? "ریال" : null,
        };
      }, Object.keys(savingStore.transferMoneyToTargetTransactionResult.data));

      return result;
    }
  }, [savingStore.transferMoneyToTargetTransactionResult.data]);

  const filterActiveTargets = React.useMemo(() => {
    if (selectedTargetData.targets?.length > 0) {
      return R.filter((target: any) => {
        return target.state === "SAVING";
      })(selectedTargetData.targets);
    }
  }, [selectedTargetData.targets]);

  const formik = useFormik({
    initialValues: {
      target: "",
      amount: "",
    },
    validateOnChange: firstSubmitted,
    validateOnBlur: false,
    validate: (values) => {
      const errors: Errors = {};
      setFirstSubmitted(true);
      if (!values.amount) {
        errors.amount = "لطفا مبلغ را وارد نمایید";
      }

      const remainingSaving = targetAmount - paidAmount;
      if (
        values.amount &&
        (remainingSaving || remainingSaving === 0) &&
        Number(values.amount) > remainingSaving
      ) {
        errors.amount =
          "مبلغ انتقال نمی‌تواند از مبلغ باقیمانده پس‌انداز بیشتر باشد.";
      }
      if (!values.target) {
        errors.target = "لطفا هدف را انتخاب کنید.";
      }
      return errors;
    },
    onSubmit: (values: TransferValues) => {
      const data = {
        from: profileInfo.id,
        to: checkedTarget,
        amount: Number(values.amount),
        description: " ",
      };
      dispatch(SavingActions.transferMoneyToTarget(data, { sagas: true }));
      formik.resetForm();
    },
  });

  React.useEffect(() => {
    formik.resetForm();
  }, []);

  React.useEffect(() => {
    if (checkedTarget && filterActiveTargets) {
      const foundTarget = R.find<any>(
        (target) => target.id === checkedTarget,
        filterActiveTargets
      );
      setPaidAmount(foundTarget?.paidAmount);
      setTargetAmount(foundTarget?.targetAmount);
    }
  }, [checkedTarget]);

  function handleAmountChange(value: string) {
    formik.setFieldValue("amount", value.replace(/,/g, ""));
  }

  function handleCloseModal() {
    dispatch(
      SavingActions.transferMoneyToTarget({ data: {} }, { sagas: false })
    );
    formik.resetForm();

    navigation.navigate("saving");
  }

  function handleCheckedTarget(id: string) {
    formik.setFieldValue("target", id);
    setCheckedTarget(id);
  }

  return (
    <Layout>
      <Header
        staticTitle={"transferMoneyToTarget"}
        handleBack={() => props.navigation.goBack()}
      />
      <>
        <ScrollView contentContainerStyle={[style.content]}>
          <Formik
            initialValues={formik.initialValues}
            onSubmit={(values: any) => formik.handleSubmit(values)}
          >
            <>
              <View>
                <FormattedText style={{ marginBottom: 30 }}>
                  {!isChild
                    ? `لطفا برای انتقال وجه یکی از اهداف ${selectedTargetData.childName} را انتخاب نمایید.`
                    : "لطفا برای انتقال وجه یکی از اهدافتان را انتخاب نمایید."}
                </FormattedText>
                <View style={style.radioBtnBox}>
                  {filterActiveTargets?.length !== 0
                    ? filterActiveTargets?.map((target: any, index: number) => {
                        return (
                          <View key={index}>
                            {checkedTarget === target.id ? (
                              <TouchableOpacity style={style.activityButton}>
                                <View
                                  style={[
                                    formik.errors.target
                                      ? { borderColor: "red" }
                                      : {
                                          borderColor:
                                            colors.buttonSubmitActive,
                                        },
                                    style.radioBtn,
                                    style.radioGreenBg,
                                  ]}
                                >
                                  <Tick width={14} height={14} fill={"white"} />
                                </View>

                                <FormattedText style={style.activityText}>
                                  {target.title}
                                </FormattedText>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  handleCheckedTarget(target.id);
                                }}
                                style={style.activityButton}
                              >
                                <View
                                  style={[
                                    style.radioBtn,
                                    style.radioWhiteBg,
                                    formik.errors.target
                                      ? { borderColor: colors.red }
                                      : {
                                          borderColor:
                                            colors.buttonSubmitActive,
                                        },
                                  ]}
                                />

                                <FormattedText style={style.activityText}>
                                  {target.title}
                                </FormattedText>
                              </TouchableOpacity>
                            )}
                          </View>
                        );
                      })
                    : null}
                </View>
              </View>

              <MaterialTextField
                value={formatNumber(formik.values.amount)}
                label="مبلغ"
                hasUnit
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={(value: string) => handleAmountChange(value)}
                error={formik.errors.amount}
              />
            </>
          </Formik>
        </ScrollView>
        <View style={style.submitButtonWrapper}>
          <Button
            title=" انتقال وجه به هدف"
            style={style.submitButton}
            onPress={formik.handleSubmit}
            disabled={
              !formik.isValid ||
              !formik.values.amount ||
              !formik.values.target ||
              savingStore.loading
            }
            loading={savingStore.loading}
            color={colors.buttonSubmitActive}
          />
        </View>
      </>

      <ActionModalCentered
        showModal={!R.isEmpty(transactionResults)}
        setShowModal={handleCloseModal}
        onBackdropPress={handleCloseModal}
        title="رسید تراکنش"
      >
        <PaymentTransactionResult
          data={transactionResults}
          hasError={savingStore.transferMoneyToTargetTransactionResult.hasError}
          onClose={handleCloseModal}
        />
      </ActionModalCentered>
    </Layout>
  );
};

export default TransferMoneyToTarget;
