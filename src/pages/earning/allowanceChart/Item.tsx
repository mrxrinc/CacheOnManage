import React from "react";
import { View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import { colors } from "constants/index";

const Item = (props: any) => {
  const { title, amount, bubbleColor } = props;

  return (
    <View style={styles.detailContent}>
      <View
        style={[
          styles.circleVector,
          {
            backgroundColor: bubbleColor,
          },
        ]}
      />
      <FormattedText style={styles.detailText}>{title}</FormattedText>
      <FormattedText fontFamily="Regular-FaNum" style={styles.detailAmountText}>
        {formatNumber(amount) || 0} ریال
      </FormattedText>
    </View>
  );
};
export default Item;
const styles = StyleSheet.create({
  detailContent: {
    width: "100%",
    paddingVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    paddingVertical: 3,
    color: colors.gray250,
    marginLeft: 4,
    flex: 1,
  },
  circleVector: {
    width: 16,
    height: 16,
    borderRadius: 30,
  },
  detailAmountText: {
    color: colors.gray550,
    fontSize: 14,
  },
});
