import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "components/header";
import Layout from "components/layout";
import style from "./style";
import { RootState } from "../../../customType";
import { useDispatch, useSelector } from "react-redux";
import ScrollableTabView from "components/scrollableTabView";
import Father from "./tabPages/father";
import Child from "./tabPages/child";
import { getSettingData } from "utils/api";
import { colors } from "constants/index";

export default (props: any) => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [settingData, setSettingData] = useState<any | null>(null);

  useEffect(() => {
    handleGetData();
  }, []);

  async function handleGetData(dynamicToken?: string) {
    try {
      const { status, statusText, data } = await getSettingData(
        dynamicToken || token
      );
      if (status === 200) {
        setSettingData(data);
        logger("SETTING DATA:", data);
      } else {
        console.warn(" Status is not 200!", status, statusText);
      }
    } catch (err) {
      console.warn(err.response);
    }
  }

  function handleUpdateData(data: any) {
    // needs some refinement!
    if (!!data && typeof data !== "string") {
      setSettingData(null);
      setSettingData(data);
    } else if (!!data && typeof data === "string") {
      logger("INSIDE ELSE : ");
      handleGetData(data);
    }
    console.log({ data });
  }

  return (
    <Layout>
      <Header
        staticTitle={"setting"}
        handleBack={() => props.navigation.goBack()}
      />
      <View style={style.content}>
        {settingData && (
          <ScrollableTabView tabbarBG={colors.gray900} hasTabbar>
            <Father
              tabLabel={settingData.nickname}
              fatherData={settingData}
              handleUpdateData={handleUpdateData}
            />
            {settingData.children.map((child: any) => (
              <Child
                tabLabel={child.nickname}
                key={child.username}
                childData={child}
                handleUpdateData={handleUpdateData}
              />
            ))}
          </ScrollableTabView>
        )}
      </View>
    </Layout>
  );
};
