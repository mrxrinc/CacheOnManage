import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "constants/index";
import styles from "./styles";

type Props = {
  tabbar?: boolean;
  children?: any;
};

export default (props: Props) => (
  <LinearGradient
    colors={[colors.gradientRight, colors.gradientLeft]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradient}
  >
    <View style={styles.container}>{props.children}</View>
  </LinearGradient>
);
