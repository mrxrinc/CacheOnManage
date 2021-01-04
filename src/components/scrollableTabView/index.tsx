import React from "react";
import { StyleSheet, View } from "react-native";
import ScrollableTabView, {
  DefaultTabBar,
} from "react-native-scrollable-tab-view";
import { colors } from "constants/index";
import TabBar from "./tabbar";

export default (props: any) => {
  return (
    <ScrollableTabView
      style={style.container}
      {...props}
      renderTabBar={() =>
        props.hasTabbar ? (
          <TabBar
            textStyle={{ fontFamily: "IRANSansMobileFaNum", fontWeight: "100" }}
            backgroundColor={props.tabbarBG || "white"}
          />
        ) : (
          <View />
        )
      }
    >
      {props.children}
    </ScrollableTabView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
