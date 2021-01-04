import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Saving from "pages/saving";
import AddNewTarget from "pages/saving/components/AddNewTarget";
import TransferMoneyToTarget from "pages/saving/components/TransferMoneyToTarget";

export type StackParamList = {
  saving: undefined;
  addNewTarget: undefined;
  transferMoneyToTarget: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const SavingNavigator = ({
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
    <Stack.Navigator
      screenOptions={() => ({
        animationEnabled: false,
        headerTransparent: true,
      })}
    >
      <Stack.Screen
        name="saving"
        component={Saving}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="addNewTarget"
        component={AddNewTarget}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="transferMoneyToTarget"
        component={TransferMoneyToTarget}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
export default SavingNavigator;
