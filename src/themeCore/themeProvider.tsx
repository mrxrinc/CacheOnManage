import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import THEMES from "./themes.json";

interface IContextProps {
  themeID: any;
  setThemeID: any;
}
const STORAGE_KEY = "THEME_ID";
const ThemeContext = React.createContext({} as IContextProps);

export const ThemeContextProvider = ({ children }: any) => {
  const [themeID, setThemeID] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const storedThemeID = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedThemeID) setThemeID(storedThemeID);
      else setThemeID(THEMES[1].key);
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeID, setThemeID }}>
      {!!themeID ? children : null}
    </ThemeContext.Provider>
  );
};

export function withTheme(Component: any) {
  return (props: any) => {
    const { themeID, setThemeID } = useContext(ThemeContext);

    const getTheme = (themeID: string) =>
      THEMES.find((theme: any) => theme.key === themeID);
    const setTheme = (themeID: string) => {
      AsyncStorage.setItem(STORAGE_KEY, themeID);
      setThemeID(themeID);
    };

    return (
      <Component
        {...props}
        themes={THEMES}
        theme={getTheme(themeID)}
        setTheme={setTheme}
      />
    );
  };
}
