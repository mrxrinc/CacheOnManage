import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "constants/index";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import NoteIcon from "components/icons/note.svg";

const EarningBox = (props: any) => {
  const { amount, factorCheck, onChangeText, onLayout } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FormattedText id="earning" style={styles.earningText} />
        <View style={styles.earningTextInputBox}>
          <TextInput
            style={styles.TextInput}
            returnKeyType="done"
            keyboardType="numeric"
            maxLength={11}
            underlineColorAndroid={"transparent"}
            onChangeText={onChangeText}
            onLayout={onLayout}
            value={formatNumber(amount)}
          />
          <FormattedText id="home.rial" style={styles.unitText} />
        </View>
      </View>
      <View style={styles.factorWrapper}>
        <NoteIcon />
        <FormattedText
          style={[
            styles.factorText,
            {
              color: !amount || factorCheck ? colors.title : colors.red,
            },
          ]}
        >
          ضریبی از ۵،۰۰۰ ریال
        </FormattedText>
      </View>
    </View>
  );
};

export default EarningBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  earningText: {
    color: colors.gray250,
    fontSize: 20,
  },
  earningTextInputBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  TextInput: {
    backgroundColor: colors.gray900,
    height: 45,
    fontSize: 20,
    color: "black",
    width: 149,
    borderRadius: 10,
    textAlign: "center",
    paddingBottom: 4,
    lineHeight: 31,
    fontFamily: "IRANSansMobileFaNum",
  },
  unitText: {
    color: colors.title,
    fontSize: 16,
    marginLeft: 6,
  },
  factorWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  factorText: {
    fontSize: 12,
    color: colors.title,
    paddingTop: 0,
  },
});
