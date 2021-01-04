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
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import { StackParamList } from "navigation/home-stack-navigator";
const View = Animated.View;

type Navigation = NavigationProp<StackParamList>;
const Header: FC<HomeHeaderType> = ({
  balance,
  avatar,
  homePage,
  title,
  hasBack,
}) => {
  const navigation = useNavigation<Navigation>();
  return (
    <LinearGradient
      colors={[colors.gradientRight, colors.gradientLeft]}
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
          {balance > 0 && (
            <FormattedText style={styles.balance} fontFamily="Bold-FaNum">
              {formatNumber(balance)}{" "}
              <FormattedText style={styles.currency} id={"home.rial"} />
            </FormattedText>
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

export default Header;
