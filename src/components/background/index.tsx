import React, { FC } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "constants/index";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

type Props = {
  props: any;
  theme: any;
};

const Backgrand: FC<Props> = (props) => {
  const theme = props.theme;
  return (
    <LinearGradient
      colors={[theme.BlueGradient_Right, theme.BlueGradient_Left]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.container}>{props.children}</View>
    </LinearGradient>
  );
};

export default withTheme(Backgrand);
