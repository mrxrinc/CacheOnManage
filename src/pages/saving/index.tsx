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
import Button from "components/button";
import MainHeader from "components/mainHeader";
import ScrollableTabView from "components/scrollableTabView";
// Local Components
import SavingInfo from "./components/SavingInfo/SavingInfo";
import TargetList from "./components/TargetList";
// UI Frameworks
import { ActivityIndicator, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// Actions
import SavingActions from "store/Saving/saving.actions";
// Styles
import styles from "./styles";
import { colors } from "constants";

type Navigation = NavigationProp<StackParamList>;

const Saving: FC = () => {
  const dispatch = useDispatch();
  const isChild = useSelector<any, any>((state) => state.user.ischild);
  const navigation = useNavigation<Navigation>();

  const [targetsList, setTargetsList] = React.useState([]);

  // Store
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );

  const filterActiveTargets = React.useMemo(() => {
    if (targetsList?.length > 0) {
      return R.filter((target: any) => {
        return target.state === "SAVING";
      })(targetsList);
    }
  }, [targetsList]);

  useEffect(() => {
    dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
  }, []);

  function onAddNewTargetPress(data: any) {
    dispatch(SavingActions.getTargetsData(data));
    navigation.navigate("addNewTarget");
  }

  function handleTransferMoneyToTarget(data: any) {
    dispatch(SavingActions.getTargetsData(data));
    navigation.navigate("transferMoneyToTarget");
  }
  function handleTargetsData(target: any) {
    dispatch(SavingActions.getTargetsData(target));
  }
  const ChildPage = (item: any) => {
    setTargetsList(item.data.targets);
    return (
      <>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: "#f4f6fa",
            paddingBottom: 20,
          }}
        >
          <SavingInfo data={item.data} />
          <TargetList data={item.data} />
        </ScrollView>
        <View style={styles.buttonsWrapper}>
          <Button
            style={styles.button}
            title="تعریف هدف جدید"
            onPress={() => onAddNewTargetPress(item.data)}
            disabled={
              (filterActiveTargets && filterActiveTargets?.length < 2) ||
              targetsList.length === 0
                ? false
                : true
            }
            color={colors.buttonOpenActive}
          />

          <Button
            style={styles.button}
            title="انتقال وجه به هدف"
            onPress={() => handleTransferMoneyToTarget(item.data)}
            disabled={
              filterActiveTargets && filterActiveTargets.length > 0
                ? false
                : true
            }
            color={colors.buttonOpenActive}
          />
        </View>
      </>
    );
  };
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
            >
              {savingStore.savingList.map((info: any, i: any) => {
                return (
                  <ChildPage
                    tabLabel={info.childName}
                    data={info}
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
