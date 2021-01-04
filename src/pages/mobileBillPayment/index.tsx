import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import Rightel from "images/mobile-topup/oprators/rightel.svg";
import Irancell from "images/mobile-topup/oprators/irancell.svg";
import Hamrahaval from "images/mobile-topup/oprators/hamrahaval.svg";
import MobileNumInquiry from "./components/mobileNumInquiry";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../customType";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/mobileTopUp-stack-navigator";
import styles from "./styles";
import { mobileTopUpOperatorName } from "store/MobileTopUp/mobileTopUp.actions";

type Navigation = NavigationProp<StackParamList>;

const MobileBillPayment = () => {
  const navigation = useNavigation<Navigation>();
  const dispatch = useDispatch();
  const operatorName = useSelector<RootStateType, any>(
    (state) => state.mobileTopUp.operatorName
  );
  console.log("operatorName>>", operatorName);
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.mobileTopUp.childPhone
  );

  useEffect(() => {
    if (childPhoneNum.match(/^093/i) || childPhoneNum.match(/^090/i)) {
      dispatch(mobileTopUpOperatorName("IRANCELL"));
    } else if (childPhoneNum.match(/^091/i)) {
      dispatch(mobileTopUpOperatorName("MCI"));
    } else {
      dispatch(mobileTopUpOperatorName("RIGHTEL"));
    }
  }, []);
  return (
    <Layout>
      <View style={styles.container}>
        <Header
          staticTitle="mobileTopUp"
          handleBack={() => navigation.goBack()}
        />
        <View style={styles.pageContainer}>
          <View style={styles.phoneBox}>
            <View style={styles.phonePack}>
              <FormattedText
                id="mobileTopUp.phoneNum"
                style={styles.phoneNumText}
              />

              <View style={styles.phoneNumBox}>
                <FormattedText
                  fontFamily="Regular-FaNum"
                  style={[styles.phoneNum, { marginRight: "4%" }]}
                >
                  {childPhoneNum}
                </FormattedText>
                {operatorName == "IRANCELL" ? (
                  <Irancell width={32} height={32} />
                ) : operatorName == "MCI" ? (
                  <Hamrahaval width={32} height={32} />
                ) : (
                  <Rightel width={32} height={32} />
                )}
              </View>
            </View>
          </View>
          <MobileNumInquiry />
        </View>
      </View>
    </Layout>
  );
};
export default MobileBillPayment;
