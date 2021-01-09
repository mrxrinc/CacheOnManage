import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { FormattedText } from "components/format-text";
import HomeNavigator from "./home-stack-navigator";
import CardNavigator from "./card-stack-navigator";
import MoreNavigator from "./more-stack-navigator";
import EarningNavigator from "./earing-stack-navigator";
import { Icon } from "images";
import curve from "images/curve.png";
import SavingNavigator from "./saving-stack-navigator";

export type TabParamList = {
  home: undefined;
  cards: undefined;
  magic: undefined;
  pig: undefined;
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
          console.log({ route });
          return (
            <View key={index}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: index == 2 ? 20 : 0,
                }}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: route.name }],
                  });
                }}
              >
                <View style={[styles.imgBox]}>
                  {index != 2 ? (
                    <Icon
                      name={route.name + (focused ? "Active" : "")}
                      size="small"
                    />
                  ) : (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Image
                        source={curve}
                        style={{
                          width: 110,
                          height: 80,
                          marginBottom: 12,
                          // borderWidth: 1,
                        }}
                      />
                      <Icon
                        name={route.name}
                        size="large"
                        style={{
                          position: "absolute",
                          width: 58,
                          height: 58,
                        }}
                      />
                    </View>
                  )}
                  <FormattedText
                    id={route.name}
                    style={{
                      fontSize: 10,
                      color: focused ? "#8387fc" : "#01065d",
                      bottom: index == 2 ? 10 : 0,
                    }}
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
  return (
    <Tab.Navigator initialRouteName="home" tabBar={TabBar}>
      <Tab.Screen name="pig" component={SavingNavigator} />
      <Tab.Screen name="magic" component={EarningNavigator} />
      <Tab.Screen name="home" component={HomeNavigator} />
      <Tab.Screen name="cards" component={CardNavigator} />
      <Tab.Screen name="more" component={MoreNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 71,
    width: fullWidth,
    // backgroundColor: "white",
  },
  tabbarBox: {
    flexDirection: "row",
    backgroundColor: "white",
    width: fullWidth,
    // paddingTop: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imgBox: {
    height: 70,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabNavigator;
