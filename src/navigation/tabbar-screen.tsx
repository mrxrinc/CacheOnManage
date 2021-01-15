import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../customType";
import { FormattedText } from "components/format-text";
import Home from "pages/home";
import ChildHome from "pages/home/child";
import Earning from "pages/earning";
import Saving from "pages/saving";
import More from "pages/more";
import Card from "pages/card";
import curve from "images/curve.png";
import EarningSvg from "images/tabbar/earning.svg";
import MoreSvg from "images/tabbar/more.svg";
import SavingSvg from "images/tabbar/saving.svg";
import CardsSvg from "images/tabbar/cards.svg";
import HomeSvg from "images/tabbar/home.svg";

const SIZE = {
  nano: 16,
  tiny: 24,
  small: 32,
  medium: 48,
  large: 65,
  huge: 80,
};

export type TabParamList = {
  saving: undefined;
  home: undefined;
  cards: undefined;
  earning: undefined;
  more: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const fullWidth = Dimensions.get("window").width;

const TabBar = ({
  state,
  navigation,
  descriptors,
}: {
  state: any;
  navigation: any;
  descriptors: any;
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.tabbarContainer}>
      <View style={styles.tabbarBox}>
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const iconColor = focused ? "#8387fc" : "#01065d";
          return (
            <View key={index}>
              <TouchableOpacity
                style={[styles.tabbarButton, { bottom: index == 2 ? 20 : 0 }]}
                key={index}
                onPress={() => navigation.navigate(route.name)}
              >
                <View style={[styles.imgBox]}>
                  {index != 2 ? (
                    <View>
                      {route.name == "saving" ? (
                        <SavingSvg
                          width={SIZE.small}
                          height={SIZE.small}
                          fill={iconColor}
                        />
                      ) : route.name == "earning" ? (
                        <EarningSvg
                          width={SIZE.small}
                          height={SIZE.small}
                          fill={iconColor}
                        />
                      ) : route.name == "cards" ? (
                        <CardsSvg
                          width={SIZE.small}
                          height={SIZE.small}
                          fill={iconColor}
                        />
                      ) : (
                        <MoreSvg
                          width={SIZE.small}
                          height={SIZE.small}
                          fill={iconColor}
                        />
                      )}
                    </View>
                  ) : (
                    <View style={styles.homeBox}>
                      <Image source={curve} style={styles.curve} />
                      <HomeSvg
                        width={62}
                        height={62}
                        style={{ position: "absolute" }}
                        fill={focused ? "#8387fc" : "#01065d"}
                      />
                    </View>
                  )}
                  <FormattedText
                    id={route.name}
                    style={[
                      styles.tabbarLable,
                      { color: iconColor, bottom: index == 2 ? 10 : 0 },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const TabNavigator = () => {
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  return (
    <Tab.Navigator initialRouteName="home" tabBar={TabBar}>
      <Tab.Screen name="saving" component={Saving} />
      <Tab.Screen name="earning" component={Earning} />
      <Tab.Screen name="home" component={isChild ? ChildHome : Home} />
      <Tab.Screen name="cards" component={Card} />
      <Tab.Screen name="more" component={More} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "9.8%",
    width: fullWidth,
    backgroundColor: "white",
  },
  tabbarBox: {
    flexDirection: "row",
    backgroundColor: "white",
    width: fullWidth,
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imgBox: {
    height: 70,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  curve: {
    width: 120,
    height: 90,
    marginBottom: 20,
  },
  tabbarLable: {
    fontSize: 10,
  },
  tabbarButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  homeBox: { justifyContent: "center", alignItems: "center" },
});

export default TabNavigator;
