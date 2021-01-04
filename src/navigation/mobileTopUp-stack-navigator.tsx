import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MobileTopUp from "pages/mobileTopUp";
import VerifyPayment from "pages/mobileTopUp/components/verifyTopUpPayment";

export type StackParamList = {
  mobileTopUp: undefined;
  verifyPayment: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const EaringNvigator = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  });
  return (
    <Stack.Navigator initialRouteName="mobileTopUp">
      <Stack.Screen
        name="mobileTopUp"
        component={MobileTopUp}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="verifyPayment"
        component={VerifyPayment}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
export default EaringNvigator;
