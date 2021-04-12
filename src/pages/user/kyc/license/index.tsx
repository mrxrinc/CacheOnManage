import { colors } from "constants/index";
import { fontFamily, fontSize } from "global";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Switch from "components/switch";
import Steps from "../steps";
import Button from "components/button";

const License = () => {
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const toggleSwitch = (value: boolean) => {
    setSwitchValue(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          مراحل زیر را ادامه دهید تا حساب شما ایجاد شود.
        </Text>
        <Steps />
      </View>
      <View>
        <View style={styles.switch}>
          <Switch
            activeColor={colors.cacheonmanageBtnOpenActive}
            onChange={toggleSwitch}
          />
          <Text style={styles.roles}>
            <Text style={styles.accept}>پذیرش</Text> قوانین و مقررات
          </Text>
        </View>
        <Button
          style={{ borderRadius: 10, marginTop: 25 }}
          color={colors.cacheonmanageBtnOpenActive}
          title="ادامه"
        />
      </View>
    </View>
  );
};
export default License;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.yekanNormal,
    color: colors.eggplant,
    textAlign: "left",
    marginTop: 18,
  },
  switch: {
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  roles: {
    color: colors.blue,
    fontSize: fontSize.small,
    fontFamily: fontFamily.yekanNormal,
  },
  accept: {
    color: colors.gray250,
  },
});
