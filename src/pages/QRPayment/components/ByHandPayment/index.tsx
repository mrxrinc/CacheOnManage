import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { FormattedText } from "components/format-text";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "customType";
import QRPaymentActions from "store/QRPayment/qrPayment.actions";
import MaterialTextField from "components/materialTextfield";
import Button from "components/button";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  payAmount: () => void;
}
interface Errors {
  qrGuid?: string;
}
const ByHandPayment: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const qrStore = useSelector<RootState, any>((state) => state.qrPayment);

  const formik = useFormik({
    initialValues: {
      qrGuid: "",
    },
    validateOnBlur: false,
    validate: (values) => {
      const errors: Errors = {};

      if (!values.qrGuid) {
        errors.qrGuid = ".لطفا شماره پذیرنده را وارد نمایید";
      }

      return errors;
    },
    onSubmit: (values) => {
      const data = {
        qrGuidId: values.qrGuid,
      };
      dispatch(QRPaymentActions.getQrInquiry(data as any, { sagas: true }));
      props.payAmount();
    },
  });

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <>
        <FormattedText style={styles.title}>
          لطفا شماره پذیرنده را وارد کنید.
        </FormattedText>

        <Formik
          initialValues={formik.initialValues}
          onSubmit={(values: any) => formik.handleSubmit(values)}
        >
          <ScrollView>
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
          </ScrollView>
        </Formik>
      </>
      <View style={{ marginTop: 100 }}>
        <Button
          onPress={formik.handleSubmit}
          disabled={!formik.isValid}
          title="ادامه"
          color="#00afff"
        />
      </View>
    </ScrollView>
  );
};

export default ByHandPayment;
