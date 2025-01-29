import React from "react";
import { StyleSheet, View } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { colors } from "constants/index";
import TabBar from "./tabbar";
import { withTheme } from "themeCore/themeProvider";

const ScrollableTabViewComp = (props: any) => {
  return (
    <ScrollableTabView
      style={style.container}
      {...props}
      renderTabBar={() =>
        props.hasTabbar ? (
          <TabBar
            textStyle={{
              fontFamily:
                props.theme.key === "FATHER CASH JUNIOR"
                  ? "IRANYekanMobileFaNum"
                  : "IRANSansMobileFaNum",
              fontWeight: "100",
            }}
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

export default withTheme(ScrollableTabViewComp);
