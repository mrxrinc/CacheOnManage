import * as React from "react";
import AppNavigator from "./navigation";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
// import { store } from "./redux/store";
import "./utils/localize";
import { codePushify } from "./utils/codepush";
// Redux
import appStore from "./store";

LogBox.ignoreAllLogs();

const globalAny: any = global;
// for inspecting network requests in debugger
globalAny.XMLHttpRequest =
  globalAny.originalXMLHttpRequest || globalAny.XMLHttpRequest;

const App = () => {
  return (
    <Provider store={appStore}>
      <AppNavigator />
    </Provider>
  );
};

export default codePushify(App);
