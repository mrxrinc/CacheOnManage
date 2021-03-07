import React from "react";
import { Text, StyleSheet } from "react-native";
import { withTheme } from "themeCore/themeProvider";
import { selectionFontFamily } from "./selectionFontFamily";
import { selectionFontSize } from "./selectionFontSize";

const FATHER = "FATHER BLU JUNIOR";

const TextApp = (props: any) => {
  const { children, style, theme, fontfamily, fontSize } = props;
  let isFatherTheme = theme.key === FATHER;

  return (
    <Text
      style={[
        styles.text,
        style,
        {
          fontFamily: selectionFontFamily(isFatherTheme, fontfamily),
          fontSize: selectionFontSize(isFatherTheme, fontSize),
        },
      ]}
      {...props}
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
  },
});
