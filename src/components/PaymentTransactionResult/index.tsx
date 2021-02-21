import React from "react";
import { FormattedText } from "components/format-text";
import { View } from "react-native";
import styles from "./styles";
import Success from "components/icons/success.svg";
import Error from "components/icons/errorIcon.svg";
import AppIcon from "components/icons/appIcon.svg";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";

interface Props {
  onPress?: () => void;
  data: any;
  hasError?: boolean;
  onClose: () => void;
  theme: any;
}
const PaymentTransactionResult: React.FC<Props> = (props) => {
  const { theme } = props;
  return (
    <>
      <View style={[styles.inquiryResultWrapper]}>
        {props.hasError ? <Error /> : <Success />}

        <FormattedText
          style={{
            color: props.hasError ? theme.ButtonRedColor : theme.titleColor,
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          {props.hasError ? "پرداخت ناموفق" : "پرداخت موفق"}
        </FormattedText>
        {props.data.map((item: any) => {
          return (
            <View style={styles.modalResultRow}>
              <View style={styles.modalResultKey}>
                <FormattedText style={styles.modalResultKeyText}>
                  {item.key}
                </FormattedText>
              </View>
              <View style={styles.modalResultMiddleLine} />
              <View style={styles.modalResultVal}>
                <FormattedText
                  style={styles.modalResultKeyText}
                  fontFamily="Regular-FaNum"
                >
                  {item.value}
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
          color={theme.ButtonGreenColor}
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

export default withTheme(PaymentTransactionResult);
