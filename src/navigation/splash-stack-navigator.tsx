import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "pages/splash";
import EntryType from "./entryType-stack-navigator";
import Earning from "./earing-stack-navigator";
import Saving from "pages/saving";
import Intro from "pages/intro";
import SettingNavigator from "./setting-navigator";

export type StackParamList = {
  splash: undefined;
  entryType: undefined;
  setting: undefined;
  earning: undefined;
  saving: undefined;
  internetPackages: undefined;
  intro: undefined;
  login: undefined;
};

const Stack = createStackNavigator<StackParamList>();
const SplashNavigator = () => (
  <Stack.Navigator initialRouteName="splash">
    <Stack.Screen
      name="splash"
      component={SplashScreen}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="entryType"
      component={EntryType}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="intro"
      component={Intro}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="saving"
      component={Saving}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="earning"
      component={Earning}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="setting"
      component={SettingNavigator}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

export default SplashNavigator;
