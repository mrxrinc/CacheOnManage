import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import BackIcon from "components/icons/back.svg";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

type Props = {
  handleBack?: any;
  staticTitle?: string;
  dynamicTitle?: string;
  theme: any;
};
const Header: FC<Props> = ({
  staticTitle,
  dynamicTitle,
  handleBack,
  theme,
}) => {
  return (
    <LinearGradient
      colors={[theme.BlueGradient_Right, theme.BlueGradient_Left]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.statusBar} />
      <View style={[styles.navbar]}>
        {handleBack && (
          <TouchableOpacity style={styles.backWrapper} onPress={handleBack}>
            <BackIcon />
          </TouchableOpacity>
        )}
        <View style={styles.titleWrapper}>
          {dynamicTitle ? (
            <FormattedText style={styles.title}>{dynamicTitle}</FormattedText>
          ) : (
            <FormattedText style={styles.title} id={staticTitle} />
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default withTheme(Header);
