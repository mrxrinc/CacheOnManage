import * as React from "react";
import AppNavigator from "./navigation";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./themeCore/themeProvider";
// import { store } from "./redux/store";
import "./utils/localize";
import { codePushify } from "./utils/codepush";
// Redux
import appStore from "./store";

const globalAny: any = global;
// for inspecting network requests in debugger
globalAny.XMLHttpRequest =
  globalAny.originalXMLHttpRequest || globalAny.XMLHttpRequest;

const App = () => {
  return (
    <Provider store={appStore}>
      <ThemeContextProvider>
        <AppNavigator />
      </ThemeContextProvider>
    </Provider>
  );
};

export default codePushify(App);
