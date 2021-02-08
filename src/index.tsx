import * as React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import AppNavigator from "./navigation";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./themeCore/themeProvider";
// import { store } from "./redux/store";
import "./utils/localize";
import { codePushify } from "./utils/codepush";
// Redux
import appStore from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "navigation/rootNavigation";

LogBox.ignoreAllLogs();

const globalAny: any = global;
// for inspecting network requests in debugger
globalAny.XMLHttpRequest =
  globalAny.originalXMLHttpRequest || globalAny.XMLHttpRequest;

const App = () => {
  React.useEffect(() => {
    return () => {
      AsyncStorage.removeItem("token");
    };
  }, []);

  return (
    <Provider store={appStore}>
      <NavigationContainer ref={navigationRef}>
        <ThemeContextProvider>
          <AppNavigator />
        </ThemeContextProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default codePushify(App);
