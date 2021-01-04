import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginNavigator from "pages/user";
import EntryType from "pages/entry-type";
import MainNavigator from "./main-tab-navigator";
import AddChildNavigator from "./add-child-navigator";
import InvoiceNavigator from "pages/Invoice";
import QRPayment from "pages/QRPayment";
import ConfirmQRPayment from "pages/QRPayment/components/ConfirmQRPayment";
import MobileTopUp from "./mobileTopUp-stack-navigator";
import InternetPackages from "./internetPackages-stack-navigator";
import MobileBillPayment from "./mobileBillPay-stack-navigator";
import QuickAccess from "navigation/quick-access";

export type StackParamList = {
  login: undefined;
  entryType: undefined;
  main: undefined;
  addChild: undefined;
  invoice: undefined;
  topUp: undefined;
  QRPayment: undefined;
  confirmQRPayment: undefined;
  mobileTopUp: undefined;
  internetPackages: undefined;
  mobileBillPayment: undefined;
  quickAccess: undefined;
};

const Stack = createStackNavigator<StackParamList>();
const EntryTypeNavigator = () => (
  <Stack.Navigator initialRouteName="entryType">
    <Stack.Screen
      name="entryType"
      component={EntryType}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="login"
      component={LoginNavigator}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="main"
      component={MainNavigator}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="mobileTopUp"
      component={MobileTopUp}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="internetPackages"
      component={InternetPackages}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="mobileBillPayment"
      component={MobileBillPayment}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="addChild"
      component={AddChildNavigator}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="invoice"
      component={InvoiceNavigator}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="QRPayment"
      component={QRPayment}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="confirmQRPayment"
      component={ConfirmQRPayment}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="quickAccess"
      component={QuickAccess}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

export default EntryTypeNavigator;
