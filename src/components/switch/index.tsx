import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { colors } from "constants/index";
const Clickable = Animated.createAnimatedComponent(TouchableOpacity);

type Props = {
  onChange: (state: boolean) => void;
  activeColor: any;
};

export default ({ onChange, activeColor }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const movement = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    handleAnimation();
  }, [active]);

  function handleChecked() {
    setActive(!active);
    onChange(!active);
    handleAnimation();
  }

  function handleAnimation() {
    if (active) {
      Animated.timing(movement, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(movement, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  }

  return (
    <Clickable
      activeOpacity={0.8}
      style={[
        style.container,
        {
          backgroundColor: active
            ? activeColor ?? colors.switch
            : colors.gray650,
        },
      ]}
      onPress={() => handleChecked()}
    >
      <Animated.View
        style={[
          style.handle,
          {
            transform: [
              {
                translateX: movement.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -15],
                }),
              },
            ],
          },
        ]}
      />
    </Clickable>
  );
};

const style = StyleSheet.create({
  container: {
    width: 40,
    height: 25,
    borderRadius: 25,
    paddingHorizontal: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  handle: {
    width: 21,
    height: 21,
    borderRadius: 30,
    backgroundColor: colors.white,
    transform: [{ translateX: 0 }],
  },
});
