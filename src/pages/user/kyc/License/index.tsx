import { colors } from "constants/index";
import { fontFamily, fontSize } from "global";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const License = () => {
  return (
    <>
      <Text style={styles.title}>
        مراحل زیر را ادامه دهید تا حساب شما ایجاد شود.
      </Text>
    </>
  );
};
export default License;

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.yekanNormal,
    color: colors.eggplant,
    textAlign: "left",
    marginTop: 18,
  },
});
