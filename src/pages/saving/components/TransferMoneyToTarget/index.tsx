import React, { FC } from "react";
import * as R from "ramda";
// Hooks
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
// Ui Frameworks
import { Formik } from "formik";
import { Picker } from "@react-native-community/picker";
import { View, Image, ScrollView } from "react-native";
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
import { RootState } from "customType";
import { StateNetwork } from "store/index.reducer";
import { SavingState } from "store/Saving/saving.reducer";
import { SelectedTargetsData } from "types/saving";
// Actions;
import SavingActions from "store/Saving/saving.actions";
// Styles
import style from "./styles";

interface Props {
  navigation: any;
}
const MessagesContext = React.createContext(messages);

const TransferMoneyToTarget: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const translate = React.useContext(MessagesContext);

  const [firstSubmitted, setFirstSubmitted] = React.useState(false);
  const [paidAmount, setPaidAmount] = React.useState(0);
  const [targetAmount, setTargetAmount] = React.useState(0);

  // Store
  const selectedTargetData = useSelector<StateNetwork, SelectedTargetsData>(
    (state) => state.saving.selectedTargetsData
  );
  const profileInfo = useSelector<RootState, any>(
    (state) => state.home.homeData
  );
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );
  const isChild = useSelector<any, any>((state) => state.user.ischild);

  const transactionResults = React.useMemo(() => {
    if (savingStore.transferMoneyToTargetTransactionResult) {
      const result = R.map((key: string) => {
        const isAmount = key === "amount";

        return {
          key: translate[key],
          value: isAmount
            ? formatNumber(
                savingStore.transferMoneyToTargetTransactionResult[key]
              )
            : savingStore.transferMoneyToTargetTransactionResult[key],
          unit: isAmount ? "ریال" : null,
        };
      }, Object.keys(savingStore.transferMoneyToTargetTransactionResult));
      const filteredResult = R.filter(
        (item) =>
          item.key !== translate["description"] &&
          item.key !== translate["success"],
        result
      );

      return [...filteredResult];
    }
  }, [savingStore.transferMoneyToTargetTransactionResult]);

  const filterActiveTargets = React.useMemo(() => {
    if (selectedTargetData.targets?.length > 0) {
      return R.filter((target: any) => {
        return target.state === "SAVING";
      })(selectedTargetData.targets);
    }
  }, [selectedTargetData.targets]);

  const formik = useFormik({
    initialValues: {
      target:
        filterActiveTargets && filterActiveTargets.length > 0
          ? filterActiveTargets[0].id
          : "",
      amount: "",
    },
    validateOnChange: firstSubmitted,
    validateOnBlur: false,
    validate: (values: any) => {
      const errors: any = {};
      setFirstSubmitted(true);
      if (!values.amount) {
        errors.amount = "لطفا مبلغ را وارد نمایید";
      }

      const remainingSaving = targetAmount - paidAmount;
      if (
        values.amount &&
        (remainingSaving || remainingSaving === 0) &&
        values.amount > remainingSaving
      ) {
        errors.amount =
          "مبلغ انتقال نمی‌تواند از مبلغ باقیمانده پس‌انداز بیشتر باشد.";
      }
      return errors;
    },
    onSubmit: (values: any) => {
      const data = {
        from: profileInfo.id,
        to: values.target,
        amount: Number(values.amount),
        description: " ",
      };
      console.log(" onSubmit: ~ data", data);
      dispatch(SavingActions.transferMoneyToTarget(data, { sagas: true }));
    },
  });

  React.useEffect(() => {
    const foundTarget = R.find<any>(
      (target) => target.id === formik.values.target,
      filterActiveTargets
    );
    setPaidAmount(foundTarget.paidAmount);
    setTargetAmount(foundTarget.targetAmount);
  }, [formik.values.target]);

  function handleAmountChange(value: string) {
    formik.setFieldValue("amount", value.replace(/,/g, ""));
  }

  function handleCloseModal() {
    dispatch(SavingActions.transferMoneyToTarget([], { sagas: false }));
    navigation.navigate("saving");
  }
  return (
    <Layout>
      <Header
        staticTitle={"transferMoneyToTarget"}
        handleBack={() => props.navigation.goBack()}
      />
      <>
        <ScrollView style={[style.content]}>
          <Formik
            initialValues={formik.initialValues}
            onSubmit={(values: any) => formik.handleSubmit(values)}
          >
            <>
              <View style={style.rightCol}>
                <FormattedText>از</FormattedText>

                <View style={style.parentFeild}>
                  <Image
                    source={{
                      uri: `data:image/png;base64,${profileInfo.avatar}`,
                    }}
                    style={style.avatar}
                  />
                  <FormattedText style={style.parentText}>
                    {isChild ? profileInfo.name : profileInfo.nickname}
                  </FormattedText>
                </View>

                <FormattedText>به</FormattedText>

                <View style={style.targetFeild}>
                  <Picker
                    selectedValue={formik.values.target}
                    onValueChange={(target) =>
                      formik.setFieldValue("target", target)
                    }
                  >
                    {filterActiveTargets &&
                      filterActiveTargets.map((target: any) => {
                        return (
                          <Picker.Item
                            key={target.id}
                            label={target.title}
                            value={target.id}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>

              <MaterialTextField
                value={formatNumber(formik.values.amount)}
                placeholder={"مبلغ"}
                hasUnit
                keyboardType={"number-pad"}
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
            disabled={!formik.isValid || savingStore.loading}
            loading={savingStore.loading}
            color="#43e6c5"
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
          status={savingStore.transferMoneyToTargetTransactionResult.success}
          description={
            savingStore.transferMoneyToTargetTransactionResult.description
          }
          onClose={handleCloseModal}
        />
      </ActionModalCentered>
    </Layout>
  );
};

export default TransferMoneyToTarget;
