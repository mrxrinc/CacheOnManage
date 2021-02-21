import React, { FC, useEffect } from "react";
// Hooks
import { useSelector, useDispatch } from "react-redux";
// Utilities
import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
// Types
import { StateNetwork } from "store/index.reducer";
import { SavingState } from "store/Saving/saving.reducer";
import { SavingListData, TargetsData } from "types/saving";
// Common Components
import Button from "components/button";
import Layout from "components/layout";
import MainHeader from "components/mainHeader";
import ScrollableTabView from "components/scrollableTabView";
import ActionModalBottom from "components/modal/actionModalBottom";
// UI Frameworks
import {
  RefreshControl,
  StyleProp,
  View,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// Local components
import TargetList from "./components/TargetList";
import SavingInfo from "./components/SavingInfo";
import EditTarget from "./components/EditTarget";
// Actions
import SavingActions from "store/Saving/saving.actions";
// Constants
import { colors } from "constants/index";
// Styles
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

const Saving: FC = ({ theme }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const [childName, setChildName] = React.useState<string>("");
  const [childAllowance, setChildAllowance] = React.useState<string>("");

  // Store
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );
  const isChild = useSelector<StateNetwork, boolean>(
    (state) => state.user.ischild
  );
  const { showEditModal } = useSelector<StateNetwork, any>(
    (state) => state.saving
  );
  const selectedTargetData = useSelector<StateNetwork, any>(
    (state) => state.saving.selectedTargetData
  );
  useEffect(() => {
    dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
  }, []);

  function handleChangeTab(selectedTabId: number) {
    setSelectedTab(selectedTabId);
  }

  const handleRefresh = () => {
    dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
  };

  const contentContainerStyle: StyleProp<ViewStyle> = {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 70,
  };
  function handleCloseModal() {
    dispatch(SavingActions.setEditModal(false));
  }

  function handleAddNewTargetPress(data: any) {
    dispatch(SavingActions.getTargetData(data));
    navigation.navigate("addNewTarget");
  }

  function handleTransferMoneyToTarget(data: any) {
    dispatch(SavingActions.getTargetData(data));
    navigation.navigate("transferMoneyToTarget");
  }

  function handleEdit(target: TargetsData, data: any) {
    setChildName(data.childName);
    setChildAllowance(data.allowance);
    dispatch(SavingActions.setEditModal(true));
    dispatch(SavingActions.getTargetData(target));
  }

  const ChildPage = (item: any) => {
    const filterActiveTargets: TargetsData[] =
      item.data.targets?.length > 0
        ? R.filter((target: TargetsData) => {
            return target.state === "SAVING";
          })(item.data.targets)
        : ([] as any);

    return (
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={contentContainerStyle}
          refreshControl={
            <RefreshControl
              refreshing={savingStore.loading}
              onRefresh={handleRefresh}
            />
          }
        >
          <SavingInfo data={item.data} />
          <TargetList data={item.data} onEditTarget={handleEdit} />
        </ScrollView>
        <View style={styles.buttonsWrapper}>
          <View style={styles.buttonBox}>
            <Button
              title="تعریف هدف جدید"
              onPress={() => handleAddNewTargetPress(item.data)}
              disabled={filterActiveTargets?.length >= 2 ? true : false}
              color={theme.ButtonBlueColor}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="انتقال وجه به هدف"
              onPress={() => handleTransferMoneyToTarget(item.data)}
              disabled={filterActiveTargets?.length > 0 ? false : true}
              color={theme.ButtonBlueColor}
            />
          </View>
        </View>
      </View>
    );
  };

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
                (childData: SavingListData, index: number) => {
                  return (
                    <ChildPage
                      tabLabel={childData.childName}
                      data={childData}
                      key={index}
                      onRefresh={handleRefresh}
                    />
                  );
                }
              )}
            </ScrollableTabView>
          ) : null}
        </View>
      )}

      <ActionModalBottom
        showModal={showEditModal}
        onBackdropPress={handleCloseModal}
        setShowModal={handleCloseModal}
        style={styles.modal}
        title="ویرایش هدف پس انداز"
      >
        <EditTarget
          data={selectedTargetData}
          allowance={childAllowance}
          childName={childName}
        />
      </ActionModalBottom>
    </Layout>
  );
};

export default withTheme(Saving);
