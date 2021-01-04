import React, { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../customType";
import * as Keychain from "react-native-keychain";
import * as R from "ramda";
import styles from "./styles";
import { FormattedText } from "components/format-text";
import Layout from "components/layout";
import Header from "components/header";
import QRPaymentActions from "store/QRPayment/qrPayment.actions";
import { login } from "utils/api";
import { validateUserName } from "utils/validators";
import ActionModalCentered from "components/modal/actionModalCentered";
import {
  setLocalData,
  getLocalData,
  removeLocalData,
} from "utils/localStorage";
import PaymentTransactionResult from "components/PaymentTransactionResult";
import { formatNumber } from "utils";
import { QRPaymentState } from "store/QRPayment/qrPayment.reducer";
import { StateNetwork } from "store/index.reducer";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { numberToWords } from "utils/formaters/numberToWords";

interface Props {
  barcode: string;
}

interface IError {
  errorText: string;
  isError: boolean;
}
export interface PaymentResultData {
  key: string;
  value: string | number;
}

const ConfirmQRPayment: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [qrPaymentInfo, setQrPaymentInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [showInquiryResponseModal, setShowInquiryResponseModal] = useState<
    boolean
  >(false);
  const [error, setError] = useState<IError>({
    errorText: "",
    isError: false,
  });
  const [
    biometricType,
    setBiometricType,
  ] = useState<Keychain.BIOMETRY_TYPE | null>(null);

  const qrStore = useSelector<StateNetwork, QRPaymentState>(
    (state) => state.qrPayment
  );
  console.log("Debug ~ file: index.tsx ~ line 66 ~ qrStore", qrStore);
  const isChild = useSelector<RootState, boolean>(
    (state) => state.user.ischild
  );

  const { amount } = props.route.params.data;

  const transactionResults = React.useMemo(() => {
    const transactionMainKeys = [
      {
        name: "عملیات",
        title: "پرداخت با qr",
      },
    ];
    const result = R.map((key: string) => {
      return { name: key, title: qrStore.paymentResult[key] };
    }, Object.keys(qrStore.paymentResult));

    const filteredResult = R.filter(
      (item) => item.name !== "description" && item.name !== "success",
      result
    );
    return [...transactionMainKeys, ...filteredResult];
  }, [qrStore.paymentResult]);

  const handleTouch = async (username: string, password: string) => {
    setLoading(true);
    const data = {
      qrGuidId: qrStore.qrData.qrGuid,
      terminalId: qrStore.qrData.termID,
      amount: amount,
    };
    if (validateUserName(username)) {
      login(username, password, isChild)
        .then((response: any) => {
          if (response.status == 200) {
            const token = response.data.access_token;
            console.log("topUp response is0:", token);
            if (biometricType) {
              (async () => {
                const checkWasAssigened = await getLocalData("biometrics");
                console.log({ checkWasAssigened });
                if (!checkWasAssigened) {
                  setShowBiometricModal(true);
                } else {
                }
              })();
            } else {
              dispatch(QRPaymentActions.setQrPayment(data, { sagas: true }));
              setShowInquiryResponseModal(true);
            }
          } else {
            setError({
              errorText: "نام کاربری یا کلمه عبور اشتباه است",
              isError: true,
            });
          }
        })
        .catch((err) => {
          console.warn("SIGNIN ERROR: ", err.response);
          setLoading(false);
          setError({ errorText: err.response.data.message, isError: true });
        });
    }
  };
  const handleBiometricsAction = async () => {
    try {
      // Retrieve the credentials
      const options = {
        service: "MoneyApp",
        accessControl: "BIOMETRY_ANY_OR_DEVICE_PASSCODE",
        authenticationPrompt: {
          title: "ورود با اثر انگشت",
          description: "لطفا انگشت خود را بر روی حسگر گوشی قرار دهید",
          cancel: "انصراف",
        },
      };
      const credentials = await Keychain.getGenericPassword(options as any);
      if (credentials) {
        console.log(
          "Credentials successfully loaded for user " +
            credentials.username +
            " " +
            credentials.password
        );
        setUsername(credentials.username);
        setPassword(credentials.password);
        handleTouch(credentials.username, credentials.password);
      } else {
        console.warn("No credentials stored");
        setError({
          errorText: "اثر انگشت شما ثبت نشده است",
          isError: true,
        });
      }
    } catch (error) {
      console.warn("Keychain couldn't be accessed!", error);
      setError({
        errorText: "شناسایی اثر انگشت با مشکل روبرو شد",
        isError: true,
      });
    }
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
          <FormattedText>{formatNumber(amount)} ریال </FormattedText>
          <FormattedText>{numberToWords(amount)} تومان</FormattedText>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={[styles.submitButton]}
              onPress={handleBiometricsAction}
            >
              {!qrStore.loading && (
                <FormattedText id={"pay"} style={styles.submitButtonTitle} />
              )}
              {qrStore.loading && <ActivityIndicator />}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton]}
              onPress={() => props.navigation.goBack()}
            >
              {!qrStore.loading && (
                <FormattedText id={"edit"} style={styles.submitButtonTitle} />
              )}
            </TouchableOpacity>
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
            status={qrStore.paymentResult.success}
            description={qrStore.paymentResult.description}
            onClose={handleCloseQrPayment}
          />
        </ActionModalCentered>
      </View>
    </Layout>
  );
};

export default ConfirmQRPayment;
