import React from "react";
import { View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";

type Props = {
  text?: string;
};

export default ({ text }: Props) => {
  return (
    <View style={style.wrapper}>
      <FormattedText style={style.text}>{text}</FormattedText>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.gray600,
  },
});
