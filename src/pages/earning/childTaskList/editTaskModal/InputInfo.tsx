import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import Close from "components/icons/close.svg";
import { colors } from "constants/index";
import NoteIcon from "components/icons/note.svg";

const InputInfo = (props: any) => {
  const { value, amount, onChangeText, taskName, factorCheck } = props;
  let colorLogic = !amount || factorCheck ? colors.brownishGrey : colors.red;

  return (
    <View>
      <View style={styles.content}>
        <FormattedText style={styles.earningText}>
          درآمد حاصل از {taskName}
        </FormattedText>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            keyboardType="numeric"
            maxLength={11}
            underlineColorAndroid={"transparent"}
            onChangeText={onChangeText}
            value={value}
          />
          <FormattedText
            fontFamily="RegularFaNum"
            id="home.rial"
            style={styles.rial}
          />
        </View>
      </View>
      <View style={styles.factorWrapper}>
        <NoteIcon />
        <FormattedText
          fontFamily="RegularFaNum"
          style={[
            styles.factorText,
            {
              color: colorLogic,
            },
          ]}
        >
          ضریبی ۵،۰۰۰ ریال
        </FormattedText>
      </View>
    </View>
  );
};
export default InputInfo;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: colors.gray900,
    height: 30,
    fontSize: 18,
    color: colors.eggplant,
    width: 100,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "IRANSansMobileFaNum",
    paddingVertical: 0,
  },
  rial: {
    marginLeft: 6,
    color: colors.eggplant,
    fontSize: 14,
  },
  factorText: {
    fontSize: 14,
    color: colors.brownishGrey,
    marginTop: -2,
    marginLeft: 3,
  },
  factorWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  earningText: {
    color: colors.brownishGrey,
    fontSize: 16,
    flex: 1,
  },
});
