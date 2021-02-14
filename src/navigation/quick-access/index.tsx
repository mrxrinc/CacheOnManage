import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MNP from "pages/quickAccess";
import MobileChargePackage from "pages/quickAccess/mobileService/middlePages/mobileChargePackage";
import { RootStateType } from "../../../customType";
import { useSelector } from "react-redux";
import MobileBillInquiry from "pages/quickAccess/mobileService/middlePages/mobileBillInquiry";
import QuickAccessPayment from "pages/quickAccess/mobileService/payment";
import paymentTransactionResult from "pages/quickAccess/paymentTransactionResult/";

export type StackParamList = {
  mnp: undefined;
  mobileChargePackage: undefined;
  mobileBillInquiry: undefined;
  quickAccessPayment: undefined;
  paymentTransactionResult: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const QuickAccessNavigator = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  });

  const rootPage = useSelector<RootStateType, any>(
    (state) => state.quickAccess.rootPage
  );

  return (
    <Stack.Navigator initialRouteName={rootPage}>
      <Stack.Screen
        name="mnp"
        component={MNP}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="mobileChargePackage"
        component={MobileChargePackage}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="mobileBillInquiry"
        component={MobileBillInquiry}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="quickAccessPayment"
        component={QuickAccessPayment}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="paymentTransactionResult"
        component={paymentTransactionResult}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default QuickAccessNavigator;
