import React, { useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { FormattedText } from "components/format-text";
import Layout from "components/layout";
import Header from "components/header";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import Rightel from "images/mobile-topup/oprators/rightel.svg";
import Irancell from "images/mobile-topup/oprators/irancell.svg";
import Hamrahaval from "images/mobile-topup/oprators/hamrahaval.svg";
import { RootState, RootStateType } from "../../../../../customType";
import { formatNumber } from "utils/index";
import { numberToWords } from "utils/formaters/numberToWords";
import { colors } from "constants/index";
import Button from "components/button";
import SigninModal from "components/signinModal";
import {
  setMobileBillPayment,
  setMobileTopUpPayment,
} from "store/QuickAccess/quickAccess.actions";
import ActionModalCentered from "components/modal/actionModalCentered";
import * as R from "ramda";
import PaymentTransactionResult from "components/PaymentTransactionResult";
import messages from "utils/fa";

const MessagesContext = React.createContext(messages);

const Payment = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginToken = useSelector<RootState, any>((state) => state.user.token);
  const [loading, setLoading] = useState(false);
  const data = props.route.params?.data;
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.quickAccess.childPhone
  );
  const operatorName = useSelector<RootStateType, any>(
    (state) => state.quickAccess.operatorName
  );
  const quickAccessStore = useSelector<any, any>((state) => state.quickAccess);

  const [showSigninModal, setShowSigninModal] = useState<boolean>(false);
  const rootPage = useSelector<RootStateType, any>(
    (state) => state.quickAccess.rootPage
  );
  const [
    showInquiryResponseModal,
    setShowInquiryResponseModal,
  ] = useState<boolean>(false);
  const translate = React.useContext(MessagesContext);

  const amount = data.amount + "";
  const handlePayment = () => {
    if (data.type == "mobileTopUp") {
      const mobileTopUpData = {
        mobile: childPhoneNum,
        operator: operatorName,
        amount: data.amount,
      };
      setShowSigninModal(false);
      setLoading(false);
      dispatch(setMobileTopUpPayment(mobileTopUpData, { sagas: true }));
      setShowInquiryResponseModal(true);
      // navigation.navigate("paymentTransactionResult");
    } else {
      delete data.title;
      setShowSigninModal(false);
      setLoading(false);
      dispatch(setMobileBillPayment(data, { sagas: true }));
      // navigation.navigate("paymentTransactionResult");
    }
  };

  const transactionResults = React.useMemo(() => {
    const transactionMainKeys = [
      {
        key: "عملیات",
        value: "خرید شارژ موبایل",
      },
    ];
    const result = R.map((key: string) => {
      return {
        key: translate[key],
        value: quickAccessStore.paymentResult.data[key],
      };
    }, Object.keys(quickAccessStore.paymentResult.data));

    return [...transactionMainKeys, ...result];
  }, [quickAccessStore.paymentResult.data]);

  const handleConfirmPayment = () => {
    setLoading(true);
    AsyncStorage.getItem("token").then((token: any) => {
      if (!token) {
        setLoading(false);
        setShowSigninModal(true);
        return;
      }
      handlePayment();
    });
  };
  function handleCloseQrPayment() {
    dispatch(setMobileTopUpPayment({ data: {} } as any));
    dispatch(setMobileBillPayment({ data: {} } as any));
    if (loginToken == "") {
      navigation.reset({
        index: 0,
        routes: [{ name: "auth" }],
      });
    } else {
      navigation.navigate("homeTab");
    }
  }
  return (
    <Layout>
      <View style={styles.container}>
        <Header staticTitle={rootPage} handleBack={() => navigation.goBack()} />
        <View style={[styles.pageContainer]}>
          <View>
            <FormattedText fontFamily="Bold" style={styles.blueText}>
              تائید پرداخت
            </FormattedText>
          </View>
          <View style={styles.mobileInfo}>
            <View style={styles.mobileInfoBox}>
              <View>
                <FormattedText style={{ color: "#515c6f", fontSize: 14 }}>
                  {data.title ? data.title : "خرید شارژ موبایل"}
                </FormattedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormattedText fontFamily="Regular-FaNum">
                  {childPhoneNum}
                </FormattedText>
                {operatorName == "IRANCELL" ? (
                  <Irancell
                    width={32}
                    height={32}
                    style={{ marginLeft: "3%" }}
                  />
                ) : operatorName == "MCI" ? (
                  <Hamrahaval
                    width={32}
                    height={32}
                    style={{ marginLeft: "3%" }}
                  />
                ) : (
                  <Rightel
                    width={32}
                    height={32}
                    style={{ marginLeft: "3%" }}
                  />
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormattedText style={{ color: "#515c6f", fontSize: 16 }}>
              مبلغ بدون احتساب مالیات بر ارزش افزوده
            </FormattedText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormattedText fontFamily="Regular-FaNum" style={styles.blueText}>
                {formatNumber(amount)}
              </FormattedText>
              <FormattedText
                fontFamily="Regular-FaNum"
                style={[styles.blueText, { marginLeft: "2%" }]}
              >
                ریال
              </FormattedText>
            </View>
            <FormattedText fontFamily="Light" style={styles.blueText}>
              {numberToWords(amount.slice(0, -1))} تومان
            </FormattedText>
          </View>
          <View>
            <View style={styles.buttonBox}>
              <View style={styles.payment}>
                <Button
                  color={colors.buttonSubmitActive}
                  loading={loading}
                  title="پرداخت"
                  onPress={handleConfirmPayment}
                />
              </View>
              <View style={styles.edit}>
                <Button
                  color={colors.blue}
                  title="ویرایش"
                  onPress={() => {
                    if (data.type == "mobileTopUp") {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "mobileChargePackage" }],
                      });
                    } else {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "mobileBillInquiry" }],
                      });
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <SigninModal
          showModal={showSigninModal}
          setShowModal={setShowSigninModal}
          handleSignIn={handlePayment}
        />
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
          hasError={quickAccessStore.paymentResult.hasError}
          onClose={handleCloseQrPayment}
        />
      </ActionModalCentered>
    </Layout>
  );
};
export default Payment;
