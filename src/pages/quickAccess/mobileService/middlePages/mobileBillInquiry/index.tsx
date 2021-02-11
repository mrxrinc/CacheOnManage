import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FormattedText } from "components/format-text";
import Note from "components/icons/note.svg";
import Tick from "components/icons/tick.svg";
import styles from "./styles";
import { mobileBillInquiry } from "utils/api";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../../../customType";
import { formatNumber } from "utils/index";
import Button from "components/button";
import { colors } from "constants/index";
import { useNavigation } from "@react-navigation/core";
import Layout from "components/layout";
import Header from "components/header";
import MobileInfo from "../../mobileInfo";

const MobileBillInquiry = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const token = useSelector<RootStateType, any>((state) => state.user.token);
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.quickAccess.childPhone
  );
  const operatorName = useSelector<RootStateType, any>(
    (state) => state.quickAccess.operatorName
  );
  const rootPage = useSelector<RootStateType, any>(
    (state) => state.quickAccess.rootPage
  );

  useEffect(() => {
    const data = {
      mobile: childPhoneNum,
      operator: operatorName,
    };
    console.log("mobileBillInquiry>> data", data);
    mobileBillInquiry(token, data)
      .then((response) => {
        console.log("mobileBillInquiry>> response", response);
        let res = response.data;
        res.midBillTitle = "بدهی میان دوره";
        res.finalBillTitle = "بدهی پایان دوره";
        setInfo(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <Header staticTitle={rootPage} handleBack={() => navigation.goBack()} />
        <MobileInfo />
        <View>
          <View style={{ height: "60%" }}>
            {info != null ? (
              <View>
                <TouchableOpacity
                  style={styles.inquiryBox}
                  disabled={info.finalAmount == null}
                  onPress={() => {
                    setActive("final");
                    const finalData = {
                      amount: info.finalAmount,
                      billId: info.finalBillId,
                      paymentId: info.finalPayId,
                      title: info.finalBillTitle,
                    };
                    setData(finalData);
                  }}
                >
                  <View style={styles.inquiryPack}>
                    <View
                      style={[
                        styles.tickBox,
                        {
                          backgroundColor:
                            active == "final" ? "#43e6c5" : "#fff",
                        },
                      ]}
                    >
                      <Tick width={12} height={12} fill="white" />
                    </View>
                    <FormattedText
                      style={[
                        styles.billType,
                        { color: info.finalAmount == null && "#515c6f" },
                      ]}
                    >
                      {info.finalBillTitle}
                    </FormattedText>
                  </View>
                  <View style={styles.amountPack}>
                    <FormattedText
                      fontFamily="Regular-FaNum"
                      style={[
                        styles.amountText,
                        {
                          color:
                            info.finalAmount == null ? "#515c6f" : "#00015d",
                        },
                      ]}
                    >
                      {info.finalAmount ? formatNumber(info.finalAmount) : "0"}
                    </FormattedText>
                    <FormattedText
                      fontFamily="Regular-FaNum"
                      style={[
                        styles.amountPack,
                        {
                          marginLeft: "5%",
                          color: info.finalAmount == null && "#515c6f",
                        },
                      ]}
                    >
                      ریال
                    </FormattedText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inquiryBox}
                  disabled={info.midAmount == null}
                  onPress={() => {
                    setActive("mid");
                    const finalData = {
                      amount: info.midAmount,
                      billId: info.midBillId,
                      paymentId: info.midPayId,
                      title: info.midBillTitle,
                    };
                    setData(finalData);
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
                    <FormattedText
                      style={[
                        styles.billType,
                        { color: info.midAmount == null && "#515c6f" },
                      ]}
                    >
                      {info.midBillTitle}
                    </FormattedText>
                  </View>
                  <View style={styles.amountPack}>
                    <FormattedText
                      fontFamily="Regular-FaNum"
                      style={[
                        styles.amountText,
                        {
                          color: info.midAmount == null ? "#515c6f" : "#00015d",
                        },
                      ]}
                    >
                      {info.midAmount != null
                        ? formatNumber(info.midAmount)
                        : "0"}
                    </FormattedText>
                    <FormattedText
                      fontFamily="Regular-FaNum"
                      style={[
                        styles.amountPack,
                        {
                          marginLeft: "5%",
                          color: info.midAmount == null && "#515c6f",
                        },
                      ]}
                    >
                      ریال
                    </FormattedText>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ width: "90%" }}>
                {error != "" ? (
                  <FormattedText style={{ color: "#e40046" }}>
                    {error}
                  </FormattedText>
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </View>
            )}
          </View>
        </View>
        <View style={styles.button}>
          <Button
            color={colors.buttonOpenActive}
            title="ادامه"
            disabled={active == "" ? true : false}
            onPress={() => {
              navigation.navigate("quickAccessPayment", { data });
            }}
          />
        </View>
      </View>
    </Layout>
  );
};
export default MobileBillInquiry;
