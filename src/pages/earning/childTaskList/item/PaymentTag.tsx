import React from "react";
import { StyleSheet, View } from "react-native";
import { FormattedText } from "components/format-text";
import { colors, IOS } from "constants/index";

const PaymentTag = (props: any) => {
  const { status, theme } = props;
  return (
    <View
      style={[
        styles.paymentTag,
        {
          backgroundColor: status ? theme.ButtonGreenColor : colors.gray600,
        },
      ]}
    >
      <FormattedText
        style={styles.paymentTagText}
        id={status ? "earning.paid" : "earning.unpaid"}
      />
      <View style={styles.paymentTagTriangle} />
      <View
        style={[styles.paymentTagTriangle, styles.paymentTagTriangleSecondary]}
      />
    </View>
  );
};

export default PaymentTag;

const styles = StyleSheet.create({
  paymentTag: {
    width: 72,
    height: 24,
    justifyContent: "center",
    paddingLeft: 7,
    top: -7,
    left: 0,
    overflow: "hidden",
    marginLeft: -24,
    marginRight: -24,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
  },
  paymentTagText: {
    fontSize: 12,
    color: colors.white,
    lineHeight: IOS ? 7 : 10,
  },
  paymentTagTriangle: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    position: "absolute",
    right: -12,
    top: 12,
    transform: [{ rotate: "45deg" }],
  },
  paymentTagTriangleSecondary: {
    top: -12,
  },
});
