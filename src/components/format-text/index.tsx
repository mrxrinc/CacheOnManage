import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import messages from "../../utils/fa";
import { withTheme } from "themeCore/themeProvider";

const MessagesContext = React.createContext(messages);

const FormattedText = withTheme(
  ({
    style,
    id,
    fontFamily,
    theme,
    ...props
  }: {
    style: any;
    id?: string;
    fontFamily?: string;
    theme: any;
  }) => {
    const _messages = React.useContext(MessagesContext);
    const Bold =
      theme.key == "FATHER BLU JUNIOR"
        ? "IRANYekanMobile-Bold"
        : "IRANSansMobile-Bold";
    const Light =
      theme.key == "FATHER BLU JUNIOR"
        ? "IRANYekanMobile"
        : "IRANSansMobile-Light";

    const Medium =
      theme.key == "FATHER BLU JUNIOR"
        ? "IRANYekanMobile-Medium"
        : "IRANSansMobile-Medium";

    const RegularFaNum =
      theme.key == "FATHER BLU JUNIOR"
        ? "IRANYekanMobileFaNum"
        : "IRANSansMobileFaNum";

    const BoldFaNum =
      theme.key == "FATHER BLU JUNIOR"
        ? "IRANYekanMobileFaNum-Bold"
        : "IRANSansFaNum-Bold";

    const Regular =
      theme.key == "FATHER BLU JUNIOR" ? "IRANYekanMobile" : "IRANSansMobile";

    const setFont = {
      fontFamily:
        fontFamily == "Bold"
          ? Bold
          : fontFamily == "Light"
          ? Light
          : fontFamily == "Medium"
          ? Medium
          : fontFamily == "Regular-FaNum"
          ? RegularFaNum
          : fontFamily == "Bold-FaNum"
          ? BoldFaNum
          : Regular,
    };
    if (id) {
      return (
        <Text style={[styles.persian, style, setFont]} {...props}>
          {_messages[id]}
        </Text>
      );
    } else {
      return <Text style={[styles.persian, style, setFont]} {...props} />;
    }
  }
);

export { FormattedText };

const styles = StyleSheet.create({
  persian: {
    textAlign: "left",
    paddingTop: Platform.OS === "ios" ? 7 : 2,
  },
});
