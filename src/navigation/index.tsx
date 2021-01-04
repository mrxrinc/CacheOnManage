import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashNavigator from "./splash-stack-navigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "pages/drawerContent";
import EntryType from "pages/entry-type";
import LoginNavigator from "pages/user";

const Drawer = createDrawerNavigator();
const createAppContainer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="splash"
        drawerContent={(props) => {
          console.log({ props });

          return <DrawerContent {...props} />;
        }}
      >
        <Drawer.Screen
          name="splash"
          component={SplashNavigator}
          // options={{ gestureEnabled: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default createAppContainer;
