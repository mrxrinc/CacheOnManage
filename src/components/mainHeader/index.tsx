import React, { FC } from "react";
import { Image, Animated, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import { HomeHeaderType } from "constants/types";
import MenuIcon from "components/icons/menu.svg";
import { colors } from "constants/index";
import styles from "./styles";
import BackIcon from "components/icons/back.svg";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import { withTheme } from "themeCore/themeProvider";

const View = Animated.View;

const Header: FC<HomeHeaderType> = ({
  theme,
  balance,
  avatar,
  homePage,
  title,
  hasBack,
}) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[theme.BlueGradient_Right, theme.BlueGradient_Left]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {hasBack ? (
        <TouchableOpacity
          style={styles.backWrapper}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.menuWrapper}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <MenuIcon width={20} height={20} fill={colors.white} />
        </TouchableOpacity>
      )}
      {title !== undefined && title.length > 0 && (
        <FormattedText style={styles.title} fontFamily="Bold-FaNum">
          {title}
        </FormattedText>
      )}
      {homePage && (
        <View style={[styles.cashAvatarWrapper]}>
          {/* TODO: there is a warning (balance is string & cant use ">" ) */}
          {Number(balance) > 0 && (
            <View style={styles.amountWrapper}>
              <FormattedText style={styles.balance} fontFamily="Bold-FaNum">
                {formatNumber(balance)}
              </FormattedText>
              <FormattedText
                style={styles.currency}
                id={"home.rial"}
                fontFamily="Bold-FaNum"
              />
            </View>
          )}
          <Image
            source={{ uri: `data:image/png;base64,${avatar}` }}
            style={styles.avatar}
          />
        </View>
      )}
    </LinearGradient>
  );
};

export default withTheme(Header);
