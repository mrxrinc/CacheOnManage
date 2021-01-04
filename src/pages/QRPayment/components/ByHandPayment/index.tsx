import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import Input from "components/input";
import { FormattedText } from "components/format-text";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "customType";
import QRPaymentActions from "store/QRPayment/qrPayment.actions";

interface Props {
  payAmount: () => void;
}
const ByHandPayment: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const qrStore = useSelector<RootState, any>((state) => state.qrPayment);

  const formik = useFormik({
    initialValues: {
      qrGuid: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      const data = {
        qrGuidId: values.qrGuid,
      };
      dispatch(QRPaymentActions.getQrInquiry(data as any, { sagas: true }));
      props.payAmount();
    },
  });

  const validationSchema = Yup.object().shape({
    qrGuid: Yup.string().required("لطفا شماره پذیرنده را وارد نمایید"),
  });

  return (
    <View style={styles.content}>
      <FormattedText style={styles.title}>
        لطفا شماره پذیرنده را وارد کنید.
      </FormattedText>

      <Formik
        initialValues={formik.initialValues}
        onSubmit={(values: any) => formik.handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <>
          <View>
            <Input
              //style={styles.titleInput}
              placeholder={"شماره پذیرنده"}
              selectTextOnFocus
              value={formik.values.qrGuid}
              onChangeText={(value: string) =>
                formik.setFieldValue("qrGuid", value)
              }
            />
          </View>
          <FormattedText> شماره پذیرنده را از فروشنده بخواهید</FormattedText>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!formik.isValid || qrStore.loading) && styles.disabledButton,
            ]}
            onPress={(values: any) => formik.handleSubmit(values)}
            disabled={!formik.isValid || qrStore.loading}
          >
            {!qrStore.loading && (
              <FormattedText id={"continue"} style={styles.submitButtonTitle} />
            )}
            {qrStore.loading && <ActivityIndicator />}
          </TouchableOpacity>
        </>
      </Formik>
    </View>
  );
};

export default ByHandPayment;
