import React from "react";
import { View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import { colors, IOS } from "constants/index";
import { withTheme } from "themeCore/themeProvider";

type Props = {
  rowKey: string;
  value?: string;
  enNum?: boolean;
  theme?: any;
};
const KeyValuePair = ({ rowKey, value, enNum, theme }: Props) => {
  return (
    <View style={style.container}>
      <FormattedText
        style={[style.rowKey, { color: theme.setting.keyTextColor }]}
      >
        {rowKey}
      </FormattedText>
      <FormattedText
        style={[style.value, { color: theme.setting.infoText }]}
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
    flex: 1,
  },
  rowKey: {
    fontSize: 12,
    lineHeight: IOS ? 20 : 23,
  },
  value: {
    fontSize: 12,
    flex: 1,
    marginLeft: 15,
    lineHeight: IOS ? 18 : 23,
  },
});
export default withTheme(KeyValuePair);
