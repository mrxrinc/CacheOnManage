import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createSwitchNavigator } from "@react-navigation/compat";
import { createStackNavigator } from "@react-navigation/stack";
import SplashNavigator from "pages/splash";
import EntryType from "pages/entry-type";
import LoginNavigator from "pages/user";
import TabStack from "./tabbar-screen";
import DrawerContent from "pages/drawerContent";
//home
import Home from "pages/home";
import ChildHome from "pages/home/child";
import TransferMoney from "pages/TransferMoney";
import CashDeposit from "pages/cashDeposit";
import Setting from "pages/setting";
import Spent from "pages/spent";
//more
import More from "pages/more";
//splash
import Intro from "pages/intro";
//earning
import Earning from "pages/earning";
import confirmTask from "pages/earning/confirmTask";
//saving
import Saving from "pages/saving";
import AddNewTarget from "pages/saving/components/AddNewTarget";
import TransferMoneyToTarget from "pages/saving/components/TransferMoneyToTarget";
//cards
import Card from "pages/card";
import { DefineCard, ConfirmCard } from "pages/orderCard";
//landing
import InvoiceNavigator from "pages/Invoice";
import QRPayment from "pages/QRPayment";
import ConfirmQRPayment from "pages/QRPayment/components/ConfirmQRPayment";
//add child
import AddChild from "pages/addChild";
import InquiryAddress from "pages/addChild/inquiryAddress";
import Username from "pages/addChild/username";
import Result from "pages/addChild/result";
//internet package
import {
  SelectCarrier,
  Packages,
  Confirmation,
  TransactionResult,
} from "pages/internetPackages";
//quick access
import QuickAccess from "navigation/quick-access";
import Total from "pages/transactions/total";
import DetailItem from "pages/transactions/detailItem";
import SpendParent from "pages/spend-parent";
import AddNewTask from "pages/earning/addNewTask";
import FetchData from "pages/user/signIn/login/FetchData";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="drawerScreen"
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      <Stack.Screen name="drawerScreen" component={DrawerStack} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="childHome" component={ChildHome} />
      <Stack.Screen name="cashDeposit" component={CashDeposit} />
      <Stack.Screen name="transferMoney" component={TransferMoney} />
      <Stack.Screen name="setting" component={Setting} />
      <Stack.Screen name="spent" component={Spent} />
      <Stack.Screen name="more" component={More} />
      <Stack.Screen name="earning" component={Earning} />
      <Stack.Screen name="addNewTask" component={AddNewTask} />
      <Stack.Screen name="confirmTask" component={confirmTask} />
      <Stack.Screen name="saving" component={Saving} />
      <Stack.Screen name="addNewTarget" component={AddNewTarget} />
      <Stack.Screen
        name="transferMoneyToTarget"
        component={TransferMoneyToTarget}
      />
      <Stack.Screen name="card" component={Card} />
      <Stack.Screen name="defineCard" component={DefineCard} />
      <Stack.Screen name="confirmCard" component={ConfirmCard} />
      <Stack.Screen name="invoice" component={InvoiceNavigator} />
      <Stack.Screen name="QRPayment" component={QRPayment} />
      <Stack.Screen name="confirmQRPayment" component={ConfirmQRPayment} />
      <Stack.Screen name="addChild" component={AddChild} />
      <Stack.Screen name="inquiryAddress" component={InquiryAddress} />
      <Stack.Screen name="username" component={Username} />
      <Stack.Screen name="result" component={Result} />
      <Stack.Screen name="selectCarrier" component={SelectCarrier} />
      <Stack.Screen name="packages" component={Packages} />
      <Stack.Screen name="confirmation" component={Confirmation} />
      <Stack.Screen name="transactionResult" component={TransactionResult} />
      <Stack.Screen name="quickAccess" component={QuickAccess} />
      <Stack.Screen name="spendParent" component={SpendParent} />
      <Stack.Screen name="totalTransactions" component={Total} />
      <Stack.Screen name="detailItem" component={DetailItem} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="entryType"
      screenOptions={{ gestureEnabled: true, headerShown: false }}
    >
      {/* test total transaction */}
      {/* <Stack.Screen name="total" component={Total} />
      <Stack.Screen name="detailItem" component={DetailItem} /> */}
      {/* <Stack.Screen name="login" component={Login} /> */}
      <Stack.Screen name="entryType" component={EntryType} />
      <Stack.Screen name="login" component={LoginNavigator} />
      <Stack.Screen name="fetchData" component={FetchData} />
      <Stack.Screen name="intro" component={Intro} />
      <Stack.Screen name="quickAccess" component={QuickAccess} />
      <Stack.Screen name="QRPayment" component={QRPayment} />
      <Stack.Screen name="confirmQRPayment" component={ConfirmQRPayment} />
      <Stack.Screen name="selectCarrier" component={SelectCarrier} />
      <Stack.Screen name="packages" component={Packages} />
      <Stack.Screen name="confirmation" component={Confirmation} />
      <Stack.Screen name="transactionResult" component={TransactionResult} />
    </Stack.Navigator>
  );
}
function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={AppStack}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="TabScreens"
      drawerContent={(props) => {
        return <DrawerContent {...props} />;
      }}
    >
      <Drawer.Screen name="TabScreens" component={TabStack} />
    </Drawer.Navigator>
  );
}
const Root = createSwitchNavigator(
  {
    splash: SplashNavigator,
    auth: AuthStack,
    app: RootStackScreen,
  },
  {
    backBehavior: "none",
  }
);
export default Root;
