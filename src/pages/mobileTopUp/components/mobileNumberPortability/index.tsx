import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { FormattedText } from "components/format-text";
import Rightel from "images/mobile-topup/oprators/rightel.svg";
import Irancell from "images/mobile-topup/oprators/irancell.svg";
import Hamrahaval from "images/mobile-topup/oprators/hamrahaval.svg";
import Tick from "components/icons/tick.svg";
import styles from "./styles";
import Button from "components/button";
import { colors } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import {
  mobileTopUpPageName,
  mobileTopUpOperatorName,
} from "store/MobileTopUp/mobileTopUp.actions";

const MNP = (childPhone: any) => {
  const dispatch = useDispatch();
  const operatorName = useSelector((state) => state.mobileTopUp.operatorName);

  useEffect(() => {
    const childPhoneNum = childPhone.childPhone;
    if (childPhoneNum.match(/^093/i) || childPhoneNum.match(/^090/i)) {
      dispatch(mobileTopUpOperatorName("IRANCELL"));
    } else if (childPhoneNum.match(/^091/i)) {
      dispatch(mobileTopUpOperatorName("MCI"));
    } else {
      dispatch(mobileTopUpOperatorName("RIGHTEL"));
    }
  }, []);
  return (
    <View style={styles.container}>
      <FormattedText style={styles.opratorName} id="mobileTopUp.description" />
      <View style={styles.opratorBox}>
        <TouchableOpacity
          style={styles.opratorPack}
          onPress={() => {
            dispatch(mobileTopUpOperatorName("MCI"));
          }}
        >
          <View style={styles.oprator}>
            <Hamrahaval width={56} height={56} />
            <FormattedText
              style={styles.opratorName}
              id="mobileTopUp.hamrahaval"
            />
          </View>
          <View
            style={[
              styles.tickBox,
              { backgroundColor: operatorName == "MCI" ? "#43e6c5" : "#fff" },
            ]}
          >
            <Tick width={15} height={15} fill="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opratorPack}
          onPress={() => {
            dispatch(mobileTopUpOperatorName("IRANCELL"));
          }}
        >
          <View style={styles.oprator}>
            <Irancell width={56} height={56} />
            <FormattedText
              style={styles.opratorName}
              id="mobileTopUp.irancell"
            />
          </View>
          <View
            style={[
              styles.tickBox,
              {
                backgroundColor:
                  operatorName == "IRANCELL" ? "#43e6c5" : "#fff",
              },
            ]}
          >
            <Tick width={15} height={15} fill="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opratorPack}
          onPress={() => {
            dispatch(mobileTopUpOperatorName("RIGHTEL"));
          }}
        >
          <View style={styles.oprator}>
            <Rightel width={56} height={56} />
            <FormattedText
              style={styles.opratorName}
              id="mobileTopUp.rightel"
            />
          </View>
          <View
            style={[
              styles.tickBox,
              {
                backgroundColor: operatorName == "RIGHTEL" ? "#43e6c5" : "#fff",
              },
            ]}
          >
            <Tick width={15} height={15} fill="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <Button
          color={colors.buttonOpenActive}
          title="ادامه"
          onPress={() => {
            dispatch(mobileTopUpPageName("chargePkg"));
          }}
        />
      </View>
    </View>
  );
};
export default MNP;
