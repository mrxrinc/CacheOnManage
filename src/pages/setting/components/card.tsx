import React, { ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "constants/index";
import { FormattedText } from "components/format-text";

type Props = {
  title: string;
  children?: ReactElement;
};
export default ({ title, children }: Props) => {
  return (
    <View style={style.container}>
      <FormattedText style={style.title}>{title}</FormattedText>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 7,
    padding: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 16,
    color: colors.gray300,
    textAlign: "left",
  },
});
