import React, { useState, forwardRef, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { bold, largeSize } from "global/fontType";
import { selectionFontFamily } from "shared/selectionFontFamily";
import { selectionFontSize } from "shared/selectionFontSize";
import { withTheme } from "themeCore/themeProvider";
import { customAnim } from "global/Animations";
import { colors } from "constants/index";
import ShowPassword from "./ShowPassword";
import TextApp from "shared/TextApp";

const FATHER = "FATHER CASH JUNIOR";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
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
    value,
  } = props;

  let isFatherTheme = theme.key === FATHER;

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  LayoutAnimation.configureNext(customAnim);
  useEffect(() => {
    LayoutAnimation.configureNext(customAnim);
    setHasError(isError);
  }, [isError]);

  return (
    <View>
      <View
        style={[
          styles.content,
          isFocus && isBordered && styles.bordered,
          isError && isBordered && styles.errorBorder,
          containerStyle,
        ]}
      >
        <TextInput
          value={value}
          selectionColor={colors.cacheonmanageBtnOpenActive}
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
        {isPassword ? (
          <ShowPassword
            onShow={() => setIsSecure(false)}
            onHide={() => setIsSecure(true)}
            isSecure={isSecure}
          />
        ) : (
          leftComponent
        )}
      </View>
      {hasError && (
        <TextApp style={[styles.errorMsg, errorStyle]}>{errorMsg}</TextApp>
      )}
    </View>
  );
});
export default withTheme(InputFather);

const styles = StyleSheet.create({
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
    borderColor: colors.cacheonmanageBtnOpenActive,
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
