import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import messages from "../../utils/fa";

const MessagesContext = React.createContext(messages);

type Props = {
  id?: string;
  fontFamily?: string;
  style?: any;
};

const FormattedText: React.FC<Props> = ({
  style,
  id,
  fontFamily,
  ...props
}) => {
  const _messages = React.useContext(MessagesContext);
  const setFont = {
    fontFamily:
      fontFamily == "Bold"
        ? "IRANSansMobile-Bold"
        : fontFamily == "Black"
        ? "IRANSansMobile-Black"
        : fontFamily == "Light"
        ? "IRANSansMobile-Light"
        : fontFamily == "Medium"
        ? "IRANSansMobile-Medium"
        : fontFamily == "UltraLight"
        ? "IRANSansMobile-UltraLight"
        : fontFamily == "Regular-FaNum"
        ? "IRANSansFaNum"
        : fontFamily == "Bold-FaNum"
        ? "IRANSansFaNum-Bold"
        : "IRANSansMobile",
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
};

export { FormattedText };

const styles = StyleSheet.create({
  persian: {
    textAlign: "left",
    paddingTop: Platform.OS === "ios" ? 7 : 2,
  },
});
