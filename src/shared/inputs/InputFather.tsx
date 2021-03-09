import { colors } from "constants/index";
import { bold, largeSize } from "global/fontType";
import React, { useState, forwardRef } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { selectionFontFamily } from "shared/selectionFontFamily";
import { selectionFontSize } from "shared/selectionFontSize";
import { withTheme } from "themeCore/themeProvider";
import PasswordIcon from "components/icons/password.svg";
import PasswordVisibleIcon from "components/icons/passwordVisible.svg";

const FATHER = "FATHER BLU JUNIOR";

const InputFather = forwardRef((props: any, ref) => {
  const {
    inputStyle,
    containerStyle,
    theme,
    leftComponent,
    isBordered,
    placeholder,
    isPassword,
  } = props;
  let isFatherTheme = theme.key === FATHER;

  const [isFocus, setIsFocus] = useState(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);

  const passwordVisible = () => {
    return isSecure ? (
      <PasswordIcon width={22} height={22} onPress={() => setIsSecure(false)} />
    ) : (
      <PasswordVisibleIcon
        width={22}
        height={22}
        onPress={() => setIsSecure(true)}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        isFocus && isBordered && styles.bordered,
        containerStyle,
      ]}
    >
      <TextInput
        selectionColor={colors.blujrBtnOpenActive}
        placeholderTextColor={colors.lightGreyBlue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        ref={ref}
        style={[
          styles.input,
          {
            fontFamily: selectionFontFamily(isFatherTheme, bold),
            fontSize: selectionFontSize(isFatherTheme, largeSize),
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        secureTextEntry={isPassword && isSecure}
        {...props}
      />
      {isPassword ? passwordVisible() : leftComponent}
    </View>
  );
});
export default withTheme(InputFather);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.paleGrey,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderColor: colors.paleGrey,
    height: 52,
  },
  input: {
    padding: 0,
    flex: 1,
    textAlign: "right",
    fontWeight: "normal",
  },
  bordered: {
    borderColor: colors.blujrBtnOpenActive,
    borderWidth: 2,
  },
  password: { color: colors.gray650 },
});
