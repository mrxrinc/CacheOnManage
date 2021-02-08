import React, { useState } from "react";
import * as R from "ramda";
// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
// Utils
import { numberToWords } from "utils/formaters/numberToWords";
import { formatNumber } from "utils";
import messages from "utils/fa";
// UI Frameworks
import { View } from "react-native";
// Common Components
import { FormattedText } from "components/format-text";
import Button from "components/button";
import Layout from "components/layout";
import Header from "components/header";
import SigninModal from "components/signinModal";
import PaymentTransactionResult from "components/PaymentTransactionResult";
import ActionModalCentered from "components/modal/actionModalCentered";
// Actions
import QRPaymentActions from "store/QRPayment/qrPayment.actions";
// Types
import { QRPaymentState } from "store/QRPayment/qrPayment.reducer";
import { StateNetwork } from "store/index.reducer";
// Styles
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { QrPayment } from "types/qrPayment";

interface Props {
  barcode: string;
  navigation: any;
  route: any;
}

const MessagesContext = React.createContext(messages);
export interface PaymentResultData {
  key: string;
  value: string | number;
}

const ConfirmQRPayment: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showSigninModal, setShowSigninModal] = useState<boolean>(false);
  const qrStore = useSelector<StateNetwork, QRPaymentState>(
    (state) => state.qrPayment
  );
  const translate = React.useContext(MessagesContext);
  const { amount } = props.route.params.data;

  const transactionResults = React.useMemo(() => {
    const transactionMainKeys = [
      {
        key: "عملیات",
        value: "پرداخت با qr",
      },
    ];
    const result = R.map((key: string) => {
      return { key: translate[key], value: qrStore.paymentResult?.data[key] };
    }, Object.keys(qrStore.paymentResult.data));

    return [...transactionMainKeys, ...result];
  }, [qrStore.paymentResult]);

  const handlePayment = () => {
    const data = {
      qrGuidId: qrStore.qrData.qrGuid,
      terminalId: qrStore.qrData.termID,
      amount: amount,
    };
    setShowSigninModal(false);
    dispatch(QRPaymentActions.setQrPayment(data, { sagas: true }));
  };

  const handleConfirmPayment = () => {
    AsyncStorage.getItem("token").then((token: any) => {
      if (!token) {
        setShowSigninModal(true);
        return;
      }
      handlePayment();
    });
  };

  function handleCloseQrPayment() {
    dispatch(QRPaymentActions.setQrPayment([] as any));
    navigation.navigate("login");
  }

  return (
    <Layout>
      <Header
        staticTitle={"confirmPayment"}
        handleBack={() => props.navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.confirmBox}>
          <FormattedText style={styles.paymentTitle}>
            تایید پرداخت
          </FormattedText>
          <FormattedText style={styles.blueBox}>
            {qrStore.qrData.merchantName}
          </FormattedText>
          <FormattedText fontFamily="Regular-FaNum">
            {formatNumber(amount)} ریال{" "}
          </FormattedText>
          <FormattedText>{numberToWords(amount / 10)} تومان</FormattedText>
          <View style={styles.btnWrapper}>
            <View style={styles.submitButton}>
              <Button
                onPress={handleConfirmPayment}
                title="پرداخت"
                color="#43e6c5"
                loading={qrStore.loading}
                disabled={qrStore.loading ? true : false}
              />
            </View>
            <View style={styles.editButton}>
              <Button
                onPress={() => props.navigation.goBack()}
                title="ویرایش"
                color="#00afff"
              />
            </View>
          </View>
        </View>
        <ActionModalCentered
          showModal={
            !R.isEmpty(transactionResults) && transactionResults.length > 1
          }
          setShowModal={handleCloseQrPayment}
          onBackdropPress={handleCloseQrPayment}
        >
          <PaymentTransactionResult
            data={transactionResults}
            hasError={qrStore.paymentResult.hasError}
            onClose={handleCloseQrPayment}
          />
        </ActionModalCentered>
      </View>
      <SigninModal
        showModal={showSigninModal}
        setShowModal={setShowSigninModal}
        handleSignIn={handlePayment}
      />
    </Layout>
  );
};

export default ConfirmQRPayment;
