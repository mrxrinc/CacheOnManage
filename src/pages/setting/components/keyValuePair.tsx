import React from "react";
import { View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import { colors, IOS } from "constants/index";

type Props = {
  rowKey: string;
  value?: string;
  enNum?: boolean;
};
export default ({ rowKey, value, enNum }: Props) => {
  return (
    <View style={style.container}>
      <FormattedText style={style.rowKey}>{rowKey}</FormattedText>
      <FormattedText
        style={style.value}
        fontFamily={enNum ? "Regular" : "Regular-FaNum"}
      >
        {value}
      </FormattedText>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 30,
    alignItems: "center",
    paddingRight: 10,
  },
  rowKey: {
    fontSize: 12,
    color: colors.gray500,
    lineHeight: IOS ? 20 : 23,
  },
  value: {
    fontSize: 12,
    color: colors.gray300,
    marginLeft: 15,
    lineHeight: IOS ? 18 : 23,
  },
});
