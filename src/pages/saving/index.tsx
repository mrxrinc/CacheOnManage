import React, { FC, useEffect } from "react";
// Utilities
import * as R from "ramda";
// Hooks
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigation, NavigationProp } from "@react-navigation/core";
// Types
import { StackParamList } from "navigation/saving-stack-navigator";
import { StateNetwork } from "store/index.reducer";
import { SavingState } from "store/Saving/saving.reducer";
// Common Components
import Layout from "components/layout";
import MainHeader from "components/mainHeader";
import ScrollableTabView from "components/scrollableTabView";

// UI Frameworks
import { ActivityIndicator, View } from "react-native";
// Actions
import SavingActions from "store/Saving/saving.actions";
// Styles
import styles from "./styles";
import ChildPage from "./components/ChildPage";

type Navigation = NavigationProp<StackParamList>;

const Saving: FC = () => {
  const dispatch = useDispatch();
  const isChild = useSelector<StateNetwork, boolean>(
    (state) => state.user.ischild
  );
  const navigation = useNavigation<Navigation>();

  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const [targetsList, setTargetsList] = React.useState([]);

  // Store
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );

  useEffect(() => {
    dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
  }, []);

  function handleChangeTab(selectedTabId: number) {
    setSelectedTab(selectedTabId);
  }

  return (
    <Layout>
      <MainHeader title={"پس انداز"} />
      {savingStore.loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          {savingStore.savingList?.length > 0 ? (
            <ScrollableTabView
              style={{ backgroundColor: "#f4f6fa" }}
              hasTabbar={isChild ? false : true}
              page={selectedTab}
              onChangeTab={handleChangeTab}
            >
              {savingStore.savingList.map((childData: any, i: number) => {
                return (
                  <ChildPage
                    tabLabel={childData.childName}
                    data={childData}
                    i={i}
                    key={i}
                  />
                );
              })}
            </ScrollableTabView>
          ) : null}
        </View>
      )}
    </Layout>
  );
};

export default Saving;
