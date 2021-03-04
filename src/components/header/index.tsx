import React, { FC } from "react";
import { View, TouchableOpacity, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import BackIcon from "components/icons/back.svg";
import Close from "components/icons/close.svg";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

type Props = {
  handleBack?: any;
  handleClose?: any;
  staticTitle?: string;
  dynamicTitle?: string;
  hasClose?: boolean;
  isKyc?: boolean;
  theme: any;
};
const Header: FC<Props> = ({
  staticTitle,
  dynamicTitle,
  hasClose,
  handleClose,
  handleBack,
  theme,
  isKyc,
}) => {
  return (
    <LinearGradient
      colors={[theme.header.BlueGradient_Right, theme.header.BlueGradient_Left]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={isKyc ? styles.containerKyc : styles.container}
    >
      {!isKyc && <View style={styles.statusBar} />}
      <StatusBar
        animated
        translucent={isKyc ? false : true}
        hidden={false}
        barStyle={theme.statusBarContent}
      />
      <View style={[styles.navbar]}>
        {handleBack && (
          <TouchableOpacity style={styles.backWrapper} onPress={handleBack}>
            <BackIcon fill={theme.header.contentColor} width={20} height={20} />
          </TouchableOpacity>
        )}
        {hasClose && (
          <TouchableOpacity
            style={[styles.backWrapper, styles.close]}
            onPress={handleClose}
          >
            <Close fill={theme.header.contentColor} width={20} height={20} />
          </TouchableOpacity>
        )}
        <View style={styles.titleWrapper}>
          {dynamicTitle ? (
            <FormattedText
              style={[styles.title, { color: theme.header.contentColor }]}
            >
              {dynamicTitle}
            </FormattedText>
          ) : (
            <FormattedText
              style={[styles.title, { color: theme.header.contentColor }]}
              id={staticTitle}
            />
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default withTheme(Header);
