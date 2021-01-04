import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddChild from "pages/addChild";
import InquiryAddress from "pages/addChild/inquiryAddress";
import Username from "pages/addChild/username";
import Result from "pages/addChild/result";
import Home from "./home-stack-navigator";

export type StackParamList = {
  addChild: undefined;
  inquiryAddress: undefined;
  username: undefined;
  result: undefined;
  home: undefined;
};
const Stack = createStackNavigator<StackParamList>();

const AddChildNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="addChild">
      <Stack.Screen
        name="addChild"
        component={AddChild}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="inquiryAddress"
        component={InquiryAddress}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="username"
        component={Username}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="result"
        component={Result}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AddChildNavigator;
