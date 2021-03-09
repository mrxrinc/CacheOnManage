import React, { useState, forwardRef } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import PasswordVisibleIcon from "components/icons/passwordVisible.svg";
import { bold, faNum, largeSize, miniSize } from "global/fontType";
import { selectionFontFamily } from "shared/selectionFontFamily";
import { selectionFontSize } from "shared/selectionFontSize";
import { withTheme } from "themeCore/themeProvider";
import PasswordIcon from "components/icons/password.svg";
import { customAnim } from "global/Animations";
import { colors } from "constants/index";

const FATHER = "FATHER BLU JUNIOR";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InputFather = forwardRef((props: any, ref) => {
  const {
    inputStyle,
    containerStyle,
    theme,
    leftComponent,
    isBordered,
    label,
    isPassword,
    isError,
    errorMsg,
    errorStyle,
  } = props;
  let isFatherTheme = theme.key === FATHER;

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);

  LayoutAnimation.configureNext(customAnim);

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
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          isFocus && isBordered && styles.bordered,
          isError && isBordered && styles.errorBorder,
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
          placeholder={label}
          secureTextEntry={isPassword && isSecure}
          {...props}
        />
        {isPassword ? passwordVisible() : leftComponent}
      </View>
      {isError && (
        <Text
          style={[
            styles.errorMsg,
            {
              fontFamily: selectionFontFamily(isFatherTheme, miniSize),
              fontSize: selectionFontSize(isFatherTheme, faNum),
            },
            errorStyle,
          ]}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
});
export default withTheme(InputFather);

const styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.paleGrey,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderColor: colors.paleGrey,
    height: 52,
    borderWidth: 2,
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
  errorMsg: {
    color: colors.yellowOrange,
    textAlign: "left",
    marginBottom: 5,
    marginLeft: 3,
    marginTop: -5,
  },
  errorBorder: {
    borderColor: colors.red,
  },
});
