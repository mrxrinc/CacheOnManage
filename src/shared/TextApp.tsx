import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { withTheme } from "themeCore/themeProvider";
import { selectionFontFamily } from "./selectionFontFamily";
import { selectionFontSize } from "./selectionFontSize";

const FATHER = "FATHER CASH JUNIOR";

const TextApp = (props: any) => {
  const { children, style, theme, fontfamily, fontSize } = props;
  let isFatherTheme = theme.key === FATHER;

  return (
    <Text
      style={[
        styles.text,
        {
          fontFamily: selectionFontFamily(isFatherTheme, fontfamily),
          fontSize: selectionFontSize(isFatherTheme, fontSize),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
export default withTheme(TextApp);

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    paddingVertical: 0,
    marginTop: Platform.OS === "ios" ? 0 : -5,
  },
});
