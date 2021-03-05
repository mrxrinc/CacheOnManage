import React from "react";
// UI Frameworks
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// Utils
import { formatNumber } from "utils";
import { FormattedText } from "components/format-text";
import Button from "components/button";
import MaterialTextfield from "components/materialTextfield";
// Hooks
import { useNavigation } from "@react-navigation/native";
import { Formik, useFormik } from "formik";
import { useSelector } from "react-redux";
// Types
import { QRPaymentState } from "store/QRPayment/qrPayment.reducer";
import { StateNetwork } from "store/index.reducer";
// images
import { colors } from "constants/index";
import Shop from "images/shop.svg";
// Styles
import styles from "./styles";

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
  const qrStore = useSelector<StateNetwork, QRPaymentState>(
    (state) => state.qrPayment.qrData
  );
  const [firstSubmitted, setFirstSubmitted] = React.useState(false);

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
      if (Number(values.amount) === 0) {
        errors.amount = "مبلغ وارد شده معتبر نمی باشد.";
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
    formik.setFieldValue(
      "amount",
      value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")
    );
  }

  return (
    <>
      <ScrollView style={[styles.content, styles.container]}>
        <View style={styles.wrapper}>
          <View style={styles.icon}>
            <Shop height={60} width={60} />
          </View>
          <View style={styles.storeDetailBox}>
            <FormattedText>{qrStore.merchantName}</FormattedText>
            <FormattedText fontFamily="Regular-FaNum">
              {qrStore.termID}
            </FormattedText>
          </View>
        </View>
        <FormattedText style={styles.title}>
          لطفا مبلغ خرید را وارد کنید.
        </FormattedText>

        <Formik
          initialValues={formik.initialValues}
          onSubmit={(values: any) => formik.handleSubmit(values)}
        >
          <View style={styles.content}>
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
          </View>
        </Formik>
      </ScrollView>
      <View style={styles.confirmBtn}>
        <Button
          title="تایید"
          onPress={formik.handleSubmit}
          loading={qrStore.loading}
          disabled={!formik.isValid || qrStore.loading}
          color={colors.buttonSubmitActive}
        />
      </View>
    </>
  );
};

export default PayAmount;
