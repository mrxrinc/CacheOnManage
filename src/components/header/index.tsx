import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import BackIcon from "components/icons/back.svg";
import { colors } from "constants/";
import styles from "./styles";

type Props = {
  handleBack?: any;
  staticTitle?: string;
  dynamicTitle?: string;
};
const Header: FC<Props> = ({ staticTitle, dynamicTitle, handleBack }) => {
  return (
    <LinearGradient
      colors={[colors.gradientRight, colors.gradientLeft]}
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

export default Header;
