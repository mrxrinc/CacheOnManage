import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "pages/home";
import Card from "pages/card";

export type StackParamList = {
  feed: undefined;
  home: undefined;
  card: undefined;
};
const Stack = createStackNavigator<StackParamList>();

const HomeNavigator = ({
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
      initialRouteName="card"
      screenOptions={({ route, navigation }) => ({
        animationEnabled: false,
        headerTransparent: true,
      })}
    >
      <Stack.Screen
        name="card"
        component={Card}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
