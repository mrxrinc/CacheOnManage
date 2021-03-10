import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "components/header";
import Layout from "components/layout";
import style from "./style";
import { RootState } from "../../../customType";
import { useSelector } from "react-redux";
import ScrollableTabView from "components/scrollableTabView";
import Father from "./tabPages/father";
import Child from "./tabPages/child";
import { getSettingData } from "utils/api";
import { colors } from "constants/index";
import Skeleton from "components/skeleton/setting";

export default (props: any) => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [settingData, setSettingData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetData();
  }, []);

  async function handleGetData(dynamicToken?: string) {
    setLoading(true);
    try {
      const { data } = await getSettingData(dynamicToken || token);
      setSettingData(data);
    } catch (err) {
      console.warn(err.response);
    } finally {
      setLoading(false);
    }
  }

  function handleUpdateData(data: any) {
    // needs some refinement!
    if (!!data && typeof data !== "string") {
      setSettingData(null);
      setSettingData(data);
    } else if (!!data && typeof data === "string") {
      handleGetData(data);
    }
  }

  return (
    <Layout>
      <Header
        staticTitle={"setting"}
        handleBack={() => props.navigation.goBack()}
      />
      {loading ? (
        <Skeleton />
      ) : (
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
                  settingData={settingData}
                  handleUpdateData={handleUpdateData}
                />
              ))}
            </ScrollableTabView>
          )}
        </View>
      )}
    </Layout>
  );
};
