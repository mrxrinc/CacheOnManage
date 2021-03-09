import { colors } from "constants/index";
import { bold, largeSize, regular, smallSize } from "global/fontType";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  View,
  Platform,
  UIManager,
} from "react-native";
import { selectionFontFamily } from "shared/selectionFontFamily";
import { selectionFontSize } from "shared/selectionFontSize";
import { withTheme } from "themeCore/themeProvider";
import PasswordVisibleIcon from "components/icons/passwordVisible.svg";
import PasswordIcon from "components/icons/password.svg";

const FATHER = "FATHER BLU JUNIOR";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InputChild = (props: any) => {
  const {
    inputStyle,
    label,
    containerStyle,
    isPassword,
    isError,
    leftComponent,
    theme,
    value,
  } = props;
  let isFatherTheme = theme.key === FATHER;

  const [isFocus, setIsFocus] = useState(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const Visible = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<any>(null);

  const passwordVisible = () => {
    return isSecure ? (
      <PasswordIcon width={22} height={22} onPress={() => setIsSecure(false)} />
    ) : (
      <PasswordVisibleIcon
        width={22}
        height={22}
        onPress={() => setIsSecure(true)}
      />
    );
  };

  const animationIn = () => {
    setIsFocus(true);
    inputRef.current.focus();
    Animated.timing(Visible, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    console.warn(value);
    if (value !== "") {
      animationIn;
    }
  }, []);

  const animationOut = () => {
    if (value === "") {
      setIsFocus(false);
      inputRef.current.blur();
      Animated.timing(Visible, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  console.log(props);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        value={value}
        onBlur={animationOut}
        onFocus={animationIn}
        secureTextEntry={isPassword && isSecure}
        style={[
          styles.input,
          isFocus && value !== "" ? styles.activeInput : null,
          {
            fontFamily: selectionFontFamily(isFatherTheme, regular),
            fontSize: selectionFontSize(isFatherTheme, smallSize),
          },
          inputStyle,
        ]}
        ref={inputRef}
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
                  outputRange: [0, -20],
                }),
              },
            ],
            fontFamily: selectionFontFamily(isFatherTheme, regular),
            fontSize: selectionFontSize(isFatherTheme, smallSize),
          },
        ]}
      >
        {label}
      </Animated.Text>
      {isPassword ? passwordVisible() : leftComponent}
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
    color: colors.warmGrey,
    flex: 1,
    textAlign: "left",
  },
  activeLabel: {
    color: colors.warmGrey,
    textAlign: "left",
  },
  input: {
    color: colors.gray250,
    opacity: 0,
    position: "absolute",
    flex: 1,
    right: 0,
    left: 0,
    bottom: 0,
    textAlignVertical: "bottom",
    marginBottom: 8,
    paddingVertical: 0,
    textAlign: "right",
    fontWeight: "normal",
  },
  activeInput: {
    opacity: 1,
  },
});
