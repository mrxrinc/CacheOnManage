import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import Checkbox from "components/checkbox";
import { checkBothCases, checkHasNumber } from "utils/validators";

export default ({ password, handleValidatePassword, customStyle }: any) => {
  useEffect(() => {
    password = password.trim();
    console.log("password > 7 ", password.length > 7);
    console.log("both cases ", checkBothCases(password));
    console.log("has capital ", checkHasNumber(password));
    if (
      password.length > 7 &&
      checkBothCases(password) &&
      checkHasNumber(password)
    ) {
      handleValidatePassword(true);
    } else {
      handleValidatePassword(false);
    }
  }, [password]);

  return (
    <View style={customStyle}>
      <View style={style.validatorRow}>
        <Checkbox
          color={colors.buttonSubmitActive}
          disabled
          showActive={password.length > 7}
        />
        <FormattedText style={style.validatorText}>
          حداقل 8 کاراکتر
        </FormattedText>
      </View>
      <View style={style.validatorRow}>
        <Checkbox
          color={colors.buttonSubmitActive}
          disabled
          showActive={checkBothCases(password)}
        />
        <FormattedText style={style.validatorText}>
          استفاده از حروف بزرگ و کوچک
        </FormattedText>
      </View>
      <View style={style.validatorRow}>
        <Checkbox
          color={colors.buttonSubmitActive}
          disabled
          showActive={checkHasNumber(password)}
        />
        <FormattedText style={style.validatorText}>
          استفاده از اعداد
        </FormattedText>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  validatorRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  validatorText: {
    color: colors.title,
    marginLeft: 10,
  },
});
