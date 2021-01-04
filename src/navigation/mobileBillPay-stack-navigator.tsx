import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import mobileBillPayment from "pages/mobileBillPayment";
import BillPayment from "pages/mobileBillPayment/components/mobileBillPayment";

export type StackParamList = {
  mobileBillPayment: undefined;
  billPayment: undefined;
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
    <Stack.Navigator initialRouteName="mobileBillPayment">
      <Stack.Screen
        name="mobileBillPayment"
        component={mobileBillPayment}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="billPayment"
        component={BillPayment}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
export default EaringNvigator;
