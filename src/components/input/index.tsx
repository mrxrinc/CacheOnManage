import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import { colors, IOS } from "constants/index";
import { InputType } from "constants/types";

export default ({
  title,
  value,
  placeholder,
  onChangeText,
  customStyle,
  hasUnit,
  maxLength,
  keyboardType,
  titleColor,
  containerCustomStyle,
  inputCustomStyle,
  boxMode,
  ...rest
}: any) => {
  return (
    <View style={[style.container, containerCustomStyle]}>
      <FormattedText style={style.title} titleColor={titleColor} id={title} />
      <View
        style={[
          style.inputWrapper,
          customStyle,
          !boxMode && { backgroundColor: "transparent" },
          !boxMode && IOS && {},
        ]}
      >
        <TextInput
          style={[style.input, inputCustomStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          underlineColorAndroid={boxMode ? "transparent" : colors.gray600}
          keyboardType={keyboardType}
          {...rest}
        />
      </View>
      {hasUnit && <FormattedText id={"home.rial"} style={style.unit} />}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 75,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 14,
    color: colors.gray500,
    textAlign: "right",
    paddingRight: 5,
    marginBottom: 3,
  },
  inputWrapper: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.gray900,
    borderColor: colors.gray500,
  },
  input: {
    height: 45,
    textAlign: "center",
    fontSize: 16,
    textAlignVertical: "center",
    fontFamily: "IRANSansMobileFaNum",
    color: colors.gray300,
  },
  unit: {
    color: colors.gray500,
    fontSize: 14,
    paddingRight: 2,
    position: "absolute",
    right: 13,
    bottom: 15,
  },
});
