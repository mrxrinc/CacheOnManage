import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import Earning from "pages/earning";
import Earning from "pages/earning";
import AddNewTask from "pages/earning/addNewTask";
import confirmTask from "pages/earning/confirmTask";

export type StackParamList = {
  earning: undefined;
  addNewTask: undefined;
  confirmTask: undefined;
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
    <Stack.Navigator initialRouteName="earning">
      <Stack.Screen
        name="earning"
        component={Earning}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="addNewTask"
        component={AddNewTask}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="confirmTask"
        component={confirmTask}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
export default EaringNvigator;
