import React, { useState, useEffect, cloneElement } from "react";
import { View, StatusBar, StyleSheet, Keyboard } from "react-native";
import { colors } from "constants/index";

type Props = {
  children: React.ReactElement;
  keyboard?: (T: boolean) => void;
};

const Layout: React.FC<Props> = (props) => {
  const keyboard = props?.keyboard;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <View style={style.outerContainer}>
      <StatusBar backgroundColor={"transparent"} translucent />
      <View style={style.container}>
        {cloneElement(props.children, {
          keyboard: keyboard ? keyboard(isKeyboardVisible) : null,
        })}
      </View>
    </View>
  );
};

export default Layout;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  outerContainer: {
    width: "100%",
    height: "100%",
  },
});
