import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import Rightel from "images/mobile-topup/oprators/rightel.svg";
import Irancell from "images/mobile-topup/oprators/irancell.svg";
import Hamrahaval from "images/mobile-topup/oprators/hamrahaval.svg";
import MNP from "./components/mobileNumberPortability";
import SelectChargePackage from "./components/selectChargePackage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../customType";
import { mobileTopUpPageName } from "store/MobileTopUp/mobileTopUp.actions";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/mobileTopUp-stack-navigator";
import styles from "./styles";

type Navigation = NavigationProp<StackParamList>;

const MobileTopUp = () => {
  const navigation = useNavigation<Navigation>();
  const dispatch = useDispatch();
  const pageName = useSelector((state) => state.mobileTopUp.pageName);
  const operatorName = useSelector((state) => state.mobileTopUp.operatorName);
  const childPhoneNum = useSelector((state) => state.mobileTopUp.childPhone);
  const [value, setValue] = useState("");

  return (
    <Layout>
      <View style={styles.container}>
        <Header
          staticTitle="mobileTopUp"
          handleBack={() => {
            if (pageName == "MNP") {
              navigation.goBack();
            } else {
              dispatch(mobileTopUpPageName("MNP"));
            }
          }}
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
          {pageName == "MNP" ? (
            <MNP childPhone={childPhoneNum} />
          ) : (
            <SelectChargePackage />
          )}
        </View>
      </View>
    </Layout>
  );
};
export default MobileTopUp;
