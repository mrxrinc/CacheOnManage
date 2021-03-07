import { colors } from "constants/index";
import { bold, largeSize } from "global/fontType";
import React, { useState, forwardRef } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { selectionFontFamily } from "shared/selectionFontFamily";
import { selectionFontSize } from "shared/selectionFontSize";
import { withTheme } from "themeCore/themeProvider";
const FATHER = "FATHER BLU JUNIOR";

const InputFather = forwardRef((props: any, ref) => {
  const {
    style,
    theme,
    fontfamily,
    fontSize,
    leftComponent,
    isBordered,
    placeholder,
  } = props;
  let isFatherTheme = theme.key === FATHER;

  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[styles.container, isFocus && isBordered && styles.bordered]}>
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
          style,
        ]}
        placeholder={placeholder}
        {...props}
      />
      {leftComponent}
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
    // borderWidth: 2,
    borderColor: colors.paleGrey,
  },
  input: {
    padding: 0,
    height: 52,
    flex: 1,
    textAlign: "right",
  },
  bordered: {
    borderColor: colors.blujrBtnOpenActive,
  },
});
