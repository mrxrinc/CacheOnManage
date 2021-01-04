import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { FormattedText } from "components/format-text";
import Note from "components/icons/note.svg";
import Tick from "components/icons/tick.svg";
import styles from "./styles";
import { mobileBillInquiry } from "utils/api";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../../customType";
import { formatNumber } from "utils/index";
import Button from "components/button";
import { colors } from "constants/index";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/mobileBillPay-stack-navigator";

type Navigation = NavigationProp<StackParamList>;

const MobileNumInquiry = () => {
  const navigation = useNavigation<Navigation>();
  const [active, setActive] = useState("final");
  const [info, setInfo] = useState(null);
  const token = useSelector<RootStateType, any>((state) => state.user.token);
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.mobileTopUp.childPhone
  );
  const operatorName = useSelector<RootStateType, any>(
    (state) => state.mobileTopUp.operatorName
  );
  useEffect(() => {
    const data = {
      mobile: childPhoneNum,
      operator: operatorName,
    };
    mobileBillInquiry(token, data)
      .then((response) => {
        let res = response.data;
        res.midBillTitle = "بدهی میان دوره";
        res.finalBillTitle = "بدهی پایان دوره";
        setInfo(res);
      })
      .catch((err) => {
        console.log("mobileNumInquiry>> err", err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.descriptionBox}>
          <Note width={16} height={16} />
          <FormattedText
            style={styles.descriptionText}
            id="mobileTopUp.paymentDescription"
          />
        </View>
        {info != null && (
          <View>
            <TouchableOpacity
              style={styles.inquiryBox}
              onPress={() => {
                setActive("final");
              }}
            >
              <View style={styles.inquiryPack}>
                <View
                  style={[
                    styles.tickBox,
                    {
                      backgroundColor: active == "final" ? "#43e6c5" : "#fff",
                    },
                  ]}
                >
                  <Tick width={12} height={12} fill="white" />
                </View>
                <FormattedText style={styles.billType}>
                  {info.finalBillTitle}
                </FormattedText>
              </View>
              <View style={styles.amountPack}>
                <FormattedText
                  fontFamily="Regular-FaNum"
                  style={styles.amountText}
                >
                  {formatNumber(info.midAmount)}
                </FormattedText>
                <FormattedText
                  fontFamily="Regular-FaNum"
                  style={[styles.amountPack, { marginLeft: "5%" }]}
                >
                  ریال
                </FormattedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inquiryBox}
              onPress={() => {
                setActive("mid");
              }}
            >
              <View style={styles.inquiryPack}>
                <View
                  style={[
                    styles.tickBox,
                    {
                      backgroundColor: active == "mid" ? "#43e6c5" : "#fff",
                    },
                  ]}
                >
                  <Tick width={12} height={12} fill="white" />
                </View>
                <FormattedText style={styles.billType}>
                  {info.midBillTitle}
                </FormattedText>
              </View>
              <View style={styles.amountPack}>
                <FormattedText
                  fontFamily="Regular-FaNum"
                  style={styles.amountText}
                >
                  {formatNumber(info.finalAmount)}
                </FormattedText>
                <FormattedText
                  fontFamily="Regular-FaNum"
                  style={[styles.amountPack, { marginLeft: "5%" }]}
                >
                  ریال
                </FormattedText>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.button}>
        <Button
          color={colors.buttonOpenActive}
          title="ادامه"
          // disabled={amount == "" ? true : false}
          // onPress={handleBiometricsAction}
          // onPress={() => {}}
          onPress={() =>
            navigation.navigate("billPayment", {
              topUpAmount: 1000,
            })
          }
        />
      </View>
    </View>
  );
};
export default MobileNumInquiry;
