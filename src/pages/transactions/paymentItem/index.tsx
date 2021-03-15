import React from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";

const PaymentItem = (props: any) => {
  const { title, detail, isRial } = props;
  return (
    <>
      {detail && (
        <View style={styles.item}>
          <FormattedText style={styles.itemTitle}>{title}</FormattedText>
          <View style={styles.line} />
          <FormattedText style={styles.itemPayment} fontFamily="Regular-FaNum">
            {detail}
            <FormattedText>{isRial && " ریال"}</FormattedText>
          </FormattedText>
        </View>
      )}
    </>
  );
};
export default PaymentItem;
