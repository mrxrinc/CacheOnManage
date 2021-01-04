import React from "react";
import { FormattedText } from "components/format-text";
import { View } from "react-native";
import styles from "./styles";
import Success from "components/icons/success.svg";
import Error from "components/icons/errorIcon.svg";
import AppIcon from "components/icons/appIcon.svg";
import Button from "components/button";

interface Props {
  onPress?: () => void;
  data: any;
  status: boolean;
  description: string;
  onClose: () => void;
}
const PaymentTransactionResult: React.FC<Props> = (props) => {
  return (
    <>
      <View style={[styles.inquiryResultWrapper]}>
        {props.status ? <Success /> : <Error />}

        <FormattedText
          style={{
            color: props.status ? "#00015d" : "#ff0000",
            fontSize: 16,
          }}
        >
          {props.description}
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
        <Button
          title="بستن"
          style={styles.closeButton}
          onPress={props.onClose}
        />
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
