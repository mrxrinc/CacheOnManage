import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SelectCarrier,
  Packages,
  Confirmation,
  Result,
} from "pages/internetPackages";

export type StackParamList = {
  selectCarrier: undefined;
  packages: undefined;
  confirmation: undefined;
  result: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const InternetPackages = ({
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
    <Stack.Navigator initialRouteName="selectCarrier">
      <Stack.Screen
        name="selectCarrier"
        component={SelectCarrier}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="packages"
        component={Packages}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="confirmation"
        component={Confirmation}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="result"
        component={Result}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
export default InternetPackages;
