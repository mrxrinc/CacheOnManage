import React, { FC } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import LinearGradient from "react-native-linear-gradient";
import MenuIcon from "components/icons/menu.svg";
import { colors } from "constants/index";
import styles from "./styles";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import { StackParamList } from "navigation/home-stack-navigator";
const View = Animated.View;

type Props = {
  name?: string;
};

type Navigation = NavigationProp<StackParamList>;
export default ({ name }: Props) => {
  const navigation = useNavigation<Navigation>();
  return (
    <LinearGradient
      colors={[colors.gradientRight, colors.gradientLeft]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.menuWrapper}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <MenuIcon width={20} height={20} fill={colors.white} />
      </TouchableOpacity>

      <View style={[styles.childTitleWrapper]}>
        <FormattedText style={styles.childTitle}>سلام {name}!</FormattedText>
      </View>
    </LinearGradient>
  );
};
