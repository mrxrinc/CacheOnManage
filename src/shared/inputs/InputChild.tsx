import { colors } from "constants/index";
import { bold, largeSize, regular, smallSize } from "global/fontType";
import React, { useState, useRef, forwardRef } from "react";
import { Animated, StyleSheet, TextInput, View } from "react-native";
import { selectionFontFamily } from "shared/selectionFontFamily";
import { selectionFontSize } from "shared/selectionFontSize";
import { withTheme } from "themeCore/themeProvider";
const FATHER = "FATHER BLU JUNIOR";

const InputChild = (props: any) => {
  const { placeholder, inputStyle, isPassword, isError, theme } = props;
  let isFatherTheme = theme.key === FATHER;

  const [isFocus, setIsFocus] = useState(false);
  const [isBorder, setIsBorder] = useState(false);
  const Visible = useRef(new Animated.Value(0)).current;
  const [inputText, setInputText] = useState("");

  const animationIn = () => {
    setIsBorder(true);
    setIsFocus(true);
    Animated.timing(Visible, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const animationOut = () => {
    setIsBorder(false);
    if (inputText === "") {
      setIsFocus(false);
      Animated.timing(Visible, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const onChange = (text: any) => {
    setInputText(text);
  };
  return (
    <View
      style={[
        styles.container,
        isBorder ? styles.active : isError ? styles.error : null,
        inputStyle,
      ]}
    >
      <TextInput
        onChangeText={onChange}
        value={inputText}
        onBlur={animationOut}
        onFocus={animationIn}
        secureTextEntry={isPassword}
        style={[
          styles.input,
          isFocus && inputText !== "" ? styles.activeInput : null,
          {
            fontFamily: selectionFontFamily(isFatherTheme, bold),
            fontSize: selectionFontSize(isFatherTheme, largeSize),
          },
        ]}
        {...props}
      />
      <Animated.Text
        numberOfLines={1}
        onPress={animationIn}
        style={[
          styles.label,
          !isFocus ? styles.activeLabel : null,
          {
            transform: [
              {
                translateY: Visible.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -16],
                }),
              },
            ],
            fontFamily: selectionFontFamily(isFatherTheme, regular),
            fontSize: selectionFontSize(isFatherTheme, smallSize),
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
    </View>
  );
};

export default withTheme(InputChild);
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.brownGrey,
    maxHeight: 52,
    minHeight: 52,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  active: {
    borderColor: colors.warmGrey,
  },
  error: {
    borderColor: "red",
  },
  label: {
    color: "blue",
    flex: 1,
    textAlign: "left",
  },
  activeLabel: {
    color: "white",
    opacity: 0.65,
    marginLeft: 13,
    textAlign: "left",
  },
  input: {
    color: "white",
    opacity: 0.01,
    flex: 1,
    position: "absolute",
    right: 0,
    bottom: 0,
    textAlignVertical: "bottom",
    marginBottom: 8,
    paddingVertical: 0,
    textAlign: "right",
    backgroundColor: "red",
    fontWeight: "normal",
  },
  activeInput: {
    opacity: 1,
    backgroundColor: "red",
  },
});
