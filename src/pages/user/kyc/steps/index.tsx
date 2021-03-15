import { colors } from "constants/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import StepCircle from "./StepCircle";

const Steps = () => {
  return (
    <View style={styles.container}>
      <StepCircle isWorking title="دریافت مدارک" />
      <View style={styles.line} />
      <StepCircle disable title="احراز هویت" />
      <View style={styles.line} />
      <StepCircle disable title="ساخت حساب کاربری" />
      <View style={styles.line} />
      <StepCircle completed title="بررسی‌ اطلاعات" />
    </View>
  );
};
export default Steps;
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  line: {
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: colors.lightGreyBlue,
    height: 23,
    width: 1,
    marginVertical: 6,
    marginLeft: 10,
  },
});
