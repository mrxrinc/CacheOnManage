import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import Input from "components/input";
import { FormattedText } from "components/format-text";
import { Formik, useFormik } from "formik";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "customType";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "utils";
import * as R from "ramda";
import Shop from "images/shop.svg";
import Button from "components/button";
import { colors } from "constants/index";
import MaterialTextfield from "components/materialTextfield";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  guId: string;
}

export interface Errors {
  amount?: string;
}
export interface PayValues {
  amount?: string;
}

const PayAmount: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const qrStore = useSelector<RootState, any>(
    (state) => state.qrPayment.qrData
  );
  const [firstSubmitted, setFirstSubmitted] = React.useState(false);

  // const formik = useFormik({
  //   initialValues: {
  //     amount: "",
  //   },
  //   validateOnChange: firstSubmitted,
  //   validateOnBlur: false,
  //   validate: (values: PayValues) => {
  //     const errors: Errors = {};
  //     setFirstSubmitted(true);
  //     if (!values.amount) {
  //       errors.amount = "لطفا مبلغ را وارد نمایید";
  //     }
  //     if (Number(values.amount) > 500000000) {
  //       errors.amount = "حداکثر مبلغ مجاز برای پرداخت 50 میلیون تومان می باشد";
  //     }

  //     return errors;
  //   },
  //   onSubmit: (values: PayValues) => {
  //     const data = {
  //       qrGuidId: props.guId,
  //       amount: values.amount,
  //     };
  //     navigation.navigate("confirmQRPayment", { data });
  //   },
  // });
  const formik = useFormik({
    initialValues: {
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
      if (Number(values.amount) > 500000000) {
        errors.amount = "حداکثر مبلغ مجاز برای پرداخت 50 میلیون تومان می باشد";
      }

      return errors;
    },
    onSubmit: (values: PayValues) => {
      const data = {
        qrGuidId: props.guId,
        amount: values.amount,
      };
      navigation.navigate("confirmQRPayment", { data });
    },
  });

  function handleChangeText(value: string) {
    formik.setFieldValue("amount", value.replace(/,/g, ""));
  }

  return (
    <>
      <ScrollView style={styles.content}>
        <View style={styles.wrapper}>
          <View style={styles.icon}>
            <Shop height={60} width={60} />
          </View>
          <View>
            <FormattedText>{qrStore.merchantName}</FormattedText>
            <FormattedText>{qrStore.termID}</FormattedText>
          </View>
        </View>
        <FormattedText style={styles.title}>
          لطفا مبلغ خرید را وارد کنید.
        </FormattedText>

        <Formik
          initialValues={formik.initialValues}
          onSubmit={(values: any) => formik.handleSubmit(values)}
        >
          <>
            <View>
              <MaterialTextfield
                label="مبلغ"
                value={formatNumber(formik.values.amount)}
                onChangeText={(value: string) => handleChangeText(value)}
                error={formik.errors.amount}
                maxLength={11}
                hasUnit
                keyboardType={"number-pad"}
              />
            </View>
          </>
        </Formik>
      </ScrollView>
      <Button
        title="تایید"
        onPress={formik.handleSubmit}
        loading={qrStore.loading}
        disabled={!formik.isValid || qrStore.loading}
        color={colors.buttonSubmitActive}
      />
    </>
  );
};

export default PayAmount;
