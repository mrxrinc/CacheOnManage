import React from "react";
// UI Frameworks
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// Common Components
import { FormattedText } from "components/format-text";
import MaterialTextField from "components/materialTextfield";
import Button from "components/button";
// Hooks
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// Actions
import QRPaymentActions from "store/QRPayment/qrPayment.actions";
// Types
import { StateNetwork } from "store/index.reducer";
import { QRPaymentState } from "store/QRPayment/qrPayment.reducer";
// Styles
import styles from "./styles";

interface Props {
  payAmount: () => void;
}
interface Errors {
  qrGuid?: string;
}
const ByHandPayment: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const qrStore = useSelector<StateNetwork, QRPaymentState>(
    (state) => state.qrPayment
  );

  const formik = useFormik({
    initialValues: {
      qrGuid: "",
    },
    validateOnBlur: false,
    validate: (values) => {
      const errors: Errors = {};

      if (!values.qrGuid) {
        errors.qrGuid = "لطفا شماره پذیرنده را وارد نمایید.";
      }

      return errors;
    },
    onSubmit: (values) => {
      const data = {
        qrGuidId: values.qrGuid,
      };
      dispatch(QRPaymentActions.getQrInquiry(data as any, { sagas: true }));
      if (
        qrStore.qrData.qrGuidId &&
        values.qrGuid === qrStore.qrData.qrGuidId
      ) {
        props.payAmount();
      } else {
        formik.setFieldError("qrGuid", "شماره پذیرنده صحیح نمی باشد");
      }
    },
  });

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container]}>
        <FormattedText style={styles.title}>
          لطفا شماره پذیرنده را وارد کنید.
        </FormattedText>

        <Formik
          initialValues={formik.initialValues}
          onSubmit={(values: any) => formik.handleSubmit(values)}
        >
          <View>
            <View>
              <MaterialTextField
                label="شماره پذیرنده"
                value={formik.values.qrGuid}
                onChangeText={(value: string) =>
                  formik.setFieldValue("qrGuid", value)
                }
                error={formik.errors.qrGuid}
              />
            </View>
            <FormattedText style={{ color: "#00015d", fontSize: 13 }}>
              شماره پذیرنده را از فروشنده بخواهید.
            </FormattedText>
          </View>
        </Formik>
      </ScrollView>
      <View style={styles.continueBtn}>
        <Button
          onPress={formik.handleSubmit}
          disabled={!formik.isValid}
          title="ادامه"
          color="#00afff"
          loading={qrStore.loading}
        />
      </View>
    </>
  );
};

export default ByHandPayment;
