import React, { useState, useEffect, cloneElement } from "react";
import { View, StatusBar, StyleSheet, Keyboard } from "react-native";
import { colors } from "constants/index";

type Props = {
  children: Element | Element[];
  keyboard?: (T: boolean) => void;
};

const Layout: React.FC<Props> = (props) => {
  const keyboard = props?.keyboard;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (keyboard) {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }
  }, []);

  return (
    <View style={style.globalContainer}>
      <StatusBar backgroundColor={"transparent"} translucent />
      <View style={style.container}>
        {cloneElement(<>{props.children}</>, {
          keyboard: keyboard ? keyboard(isKeyboardVisible) : null,
        })}
      </View>
    </View>
  );
};

export default Layout;

const style = StyleSheet.create({
  globalContainer: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
