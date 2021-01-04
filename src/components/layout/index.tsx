import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { colors } from "constants/index";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <View style={style.outerContainer}>
    <StatusBar backgroundColor={"transparent"} translucent />
    <View style={style.container}>{props.children}</View>
  </View>
);

export default Layout;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  outerContainer: {
    width: "100%",
    height: "100%",
  },
});
