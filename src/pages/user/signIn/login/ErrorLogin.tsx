import React from "react";
import { StyleSheet, View } from "react-native";
import { width } from "constants/index";
import { FormattedText } from "components/format-text";

const ErrorLogin = (props: any) => {
  const { error, theme } = props;

  return (
    <View style={styles.errorBox}>
      {error.isError && (
        <FormattedText
          style={[styles.errorText, { color: theme.warningColor }]}
        >
          {error.errorText}
        </FormattedText>
      )}
    </View>
  );
};
export default ErrorLogin;

const styles = StyleSheet.create({
  errorBox: {
    width: width * 0.89,
    justifyContent: "flex-start",
    marginBottom: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  errorText: {
    fontSize: 12,
    marginRight: "10%",
    width: width,
  },
});
