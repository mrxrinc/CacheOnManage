import React, { FC, useEffect } from "react";
// Hooks
import { useSelector, useDispatch } from "react-redux";
// Types
import { StateNetwork } from "store/index.reducer";
import { SavingState } from "store/Saving/saving.reducer";
import { SavingListData } from "types/saving";
// Common Components
import Layout from "components/layout";
import MainHeader from "components/mainHeader";
import ScrollableTabView from "components/scrollableTabView";
// Local Components
import ChildPage from "./components/ChildPage";
// UI Frameworks
import { ActivityIndicator, View } from "react-native";
// Actions
import SavingActions from "store/Saving/saving.actions";
// Styles
import styles from "./styles";
import { colors } from "constants/index";

const Saving: FC = () => {
  const dispatch = useDispatch();
  const isChild = useSelector<StateNetwork, boolean>(
    (state) => state.user.ischild
  );
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
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
        <View style={styles.loading}>
          <ActivityIndicator color={colors.gray600} size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          {savingStore.savingList?.length > 0 ? (
            <ScrollableTabView
              style={{ backgroundColor: "#f4f6fa" }}
              hasTabbar={isChild ? false : true}
              page={selectedTab}
              onChangeTab={handleChangeTab}
            >
              {savingStore.savingList.map(
                (childData: SavingListData, i: number) => {
                  return (
                    <ChildPage
                      tabLabel={childData.childName}
                      data={childData}
                      i={i}
                      key={i}
                    />
                  );
                }
              )}
            </ScrollableTabView>
          ) : null}
        </View>
      )}
    </Layout>
  );
};

export default Saving;
