import { colors } from "constants/index";
import { regular, smallSize } from "global/fontType";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  View,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { selectionFontFamily } from "shared/selectionFontFamily";
import { selectionFontSize } from "shared/selectionFontSize";
import { withTheme } from "themeCore/themeProvider";
import TextApp from "shared/TextApp";
import { customAnim } from "global/Animations";
import ShowPassword from "./ShowPassword";

const FATHER = "FATHER BLU JUNIOR";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
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
    errorStyle,
    errorMsg,
  } = props;
  let isFatherTheme = theme.key === FATHER;

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const Visible = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<any>(null);

  const animationIn = (isFocus: boolean) => {
    setIsFocus(true);
    if (isFocus) {
      inputRef.current.focus();
    }
    Animated.timing(Visible, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (value) {
      animationIn(false);
    }
  }, [value]);

  useEffect(() => {
    LayoutAnimation.configureNext(customAnim);
    setHasError(isError);
  }, [isError]);

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

  return (
    <View>
      <View
        style={[styles.container, isFocus && styles.active, containerStyle]}
      >
        <TextInput
          value={value}
          onBlur={animationOut}
          onFocus={() => animationIn(true)}
          secureTextEntry={isPassword && isSecure}
          style={[
            styles.input,
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
                    outputRange: [10, -16],
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
        {isPassword ? (
          <ShowPassword
            onShow={() => setIsSecure(false)}
            onHide={() => setIsSecure(true)}
            isSecure={isSecure}
          />
        ) : (
          leftComponent
        )}
      </View>
      {hasError && (
        <TextApp style={[styles.errorMsg, errorStyle]}>{errorMsg}</TextApp>
      )}
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
    borderBottomColor: colors.warmGrey,
  },
  label: {
    color: colors.brownGrey,
    flex: 1,
    textAlign: "left",
  },
  activeLabel: {
    color: colors.warmGrey,
    textAlign: "left",
  },
  input: {
    color: colors.gray250,
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
  errorMsg: {
    color: colors.buttonDestructivePressed,
    textAlign: "left",
    marginBottom: 5,
    marginLeft: 3,
    marginTop: -5,
  },
});
