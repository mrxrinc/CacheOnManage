import React from "react";
import { FormattedText } from "components/format-text";
import { Button, View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { formatNumber } from "utils";
import { colors } from "constants/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../customType";
import { useNavigation } from "@react-navigation/native";

import Success from "components/icons/success.svg";

import Error from "components/icons/errorIcon.svg";
import AppIcon from "components/icons/appIcon.svg";
import { PaymentResult } from "types/qrPayment";

interface Props {
  onPress?: () => void;
  data: any[];
}
const PaymentTransactionResult: React.FC<Props> = (props) => {
  const navigation = useNavigation<any>();
  return (
    <>
      <View style={[styles.inquiryResultWrapper]}>
        {/* {error.isError ? <Error /> : <Success />} */}
        <Success />
        <FormattedText
        //   style={{
        //     color: error.isError ? "#ff0000" : "#00015d",
        //     fontSize: 16,
        //   }}
        >
          پرداخت با موفقیت انجام شد.
        </FormattedText>
        {props.data.map((item: any) => {
          return (
            <View style={styles.modalResultRow}>
              <View>
                <FormattedText style={styles.modalResultKeyText}>
                  {item.name}
                </FormattedText>
              </View>
              <View style={styles.modalResultMiddleLine} />
              <View>
                <FormattedText style={styles.modalResultKeyText}>
                  {item.title}
                </FormattedText>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.inquiryModalButtonsWrapper}>
        <TouchableOpacity
          style={{
            flex: 0.99,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#43e6c5",
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("login")}
        >
          <Text>بستن</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "3%",
        }}
      >
        <AppIcon />
      </View>
    </>
  );
};

export default PaymentTransactionResult;
