import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "constants/index";
import FanButton from "../fanButton";
import { FormattedText } from "components/format-text";
import { useDispatch } from "react-redux";
import { signUpStepChanged } from "redux/actions/User";

const FooterLogin = (props: any) => {
  const { childPhoneNum, navigation, isChild, theme, bljTheme } = props;
  const dispatch = useDispatch();

  return (
    <View style={styles.noRegister}>
      {isChild && !!childPhoneNum && (
        <FanButton theme={theme} navigation={navigation} />
      )}
      {/* {!isChild && (
        <FormattedText
          // onPress={() =>
          //   bljTheme ? dispatch(signUpStepChanged("license")) : null
          // }
          style={[styles.registerText, { color: theme.registerText }]}
        >
          قبلا ثبت‌نام نکرده‌اید؟
        </FormattedText>
      )} */}
    </View>
  );
};
export default FooterLogin;

const styles = StyleSheet.create({
  noRegister: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  registerText: { alignSelf: "center", fontSize: 16, color: colors.links },
});
