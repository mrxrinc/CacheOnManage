import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "pages/home";
import ChildHome from "pages/home/child";
import TransferMoney from "pages/TransferMoney";
import CashDeposit from "pages/cashDeposit";
import Setting from "pages/setting";
import Spent from "pages/spent";

export type StackParamList = {
  feed: undefined;
  home: undefined;
  empty: undefined;
  transferMoney: undefined;
  cashDeposit: undefined;
  setting: undefined;
  childHome: undefined;
  spent: undefined;
};
const Stack = createStackNavigator<StackParamList>();

const HomeNavigator = ({ navigation, route }: any) => {
  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  });
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={({ route, navigation }) => ({
        animationEnabled: false,
        headerTransparent: true,
      })}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="childHome"
        component={ChildHome}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="cashDeposit"
        component={CashDeposit}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={TransferMoney}
        name="transferMoney"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Setting}
        name="setting"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Spent}
        name="spent"
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
