import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import Rightel from "images/mobile-topup/oprators/rightel.svg";
import Irancell from "images/mobile-topup/oprators/irancell.svg";
import Hamrahaval from "images/mobile-topup/oprators/hamrahaval.svg";
import Tick from "components/icons/tick.svg";
import styles from "./styles";
import Button from "components/button";
import { colors } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { mobileOperatorName } from "store/QuickAccess/quickAccess.actions";
import { RootStateType } from "../../../../../customType";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "navigation/quick-access";

type Navigation = NavigationProp<StackParamList>;

const MNP = () => {
  const navigation = useNavigation<Navigation>();
  const dispatch = useDispatch();
  const operatorName = useSelector<RootStateType, any>(
    (state) => state.quickAccess.operatorName
  );
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.quickAccess.childPhone
  );
  const rootPage = useSelector<RootStateType, any>(
    (state) => state.quickAccess.rootPage
  );

  useEffect(() => {
    if (childPhoneNum.match(/^093/i) || childPhoneNum.match(/^090/i)) {
      dispatch(mobileOperatorName("IRANCELL"));
    } else if (childPhoneNum.match(/^091/i)) {
      dispatch(mobileOperatorName("MCI"));
    } else {
      dispatch(mobileOperatorName("RIGHTEL"));
    }
  }, []);
  return (
    <View style={styles.container}>
      <FormattedText style={styles.opratorName} id="mobileTopUp.description" />
      <View style={styles.opratorBox}>
        <TouchableOpacity
          style={styles.opratorPack}
          onPress={() => {
            dispatch(mobileOperatorName("MCI"));
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
            dispatch(mobileOperatorName("IRANCELL"));
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
            dispatch(mobileOperatorName("RIGHTEL"));
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
            if (rootPage == "mobileTopUp") {
              navigation.navigate("mobileChargePackage");
            } else if (rootPage == "mobileBillPayment") {
              navigation.navigate("mobileBillInquiry");
            }
          }}
        />
      </View>
    </View>
  );
};
export default MNP;
