import React from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import Rightel from "images/mobile-topup/oprators/rightel.svg";
import Irancell from "images/mobile-topup/oprators/irancell.svg";
import Hamrahaval from "images/mobile-topup/oprators/hamrahaval.svg";
import styles from "./styles";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../../customType";

const mobileInfo = () => {
  const operatorName = useSelector<RootStateType, any>(
    (state) => state.quickAccess.operatorName
  );
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.quickAccess.childPhone
  );
  return (
    <View style={styles.phoneBox}>
      <View style={styles.phonePack}>
        <FormattedText id="mobileTopUp.phoneNum" style={styles.phoneNumText} />

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
  );
};
export default mobileInfo;
