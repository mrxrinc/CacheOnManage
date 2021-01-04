import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Setting from "pages/setting";

export type StackParamList = {
  setting: undefined;
};
const Stack = createStackNavigator<StackParamList>();

const SettingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="setting">
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
