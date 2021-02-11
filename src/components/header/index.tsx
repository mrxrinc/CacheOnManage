import React, { FC } from "react";
import { View, TouchableOpacity, StatusBar } from "react-native";
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
      colors={[theme.header.BlueGradient_Right, theme.header.BlueGradient_Left]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <StatusBar
        animated
        translucent={true}
        hidden={false}
        barStyle={"dark-content"}
      />
      <View style={styles.statusBar} />
      <View style={[styles.navbar]}>
        {handleBack && (
          <TouchableOpacity style={styles.backWrapper} onPress={handleBack}>
            <BackIcon fill={theme.header.contentColor} width={20} height={20} />
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
