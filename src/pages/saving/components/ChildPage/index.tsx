import React from "react";
// Utilities
import * as R from "ramda";
// Hooks
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
// Types
import { StateNetwork } from "store/index.reducer";
import { SavingState } from "store/Saving/saving.reducer";
import { SavingListData, TargetsData } from "types/saving";
// Common Components
import Button from "components/button";
// Local Components
import SavingInfo from "../SavingInfo";
import TargetList from "../TargetList";
// UI Frameworks
import { RefreshControl, StyleProp, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// Actions
import SavingActions from "store/Saving/saving.actions";
// Styles
import styles from "./styles";
import { colors } from "constants/index";

interface Props {
  data: SavingListData;
  onRefresh: () => void;
}
const contentContainerStyle: StyleProp<ViewStyle> = {
  alignItems: "center",
  backgroundColor: "#f4f6fa",
  paddingBottom: 70,
};

const ChildPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  // Store
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );

  React.useEffect(() => {
    dispatch(SavingActions.setChildTargets(props.data.targets));
  }, []);

  const filterActiveTargets: TargetsData[] =
    props.data.targets?.length > 0
      ? R.filter((target: TargetsData) => {
          return target.state === "SAVING";
        })(props.data.targets)
      : ([] as any);

  function handleAddNewTargetPress(data: any) {
    dispatch(SavingActions.getTargetsData(data));
    navigation.navigate("addNewTarget");
  }

  function handleTransferMoneyToTarget(data: any) {
    dispatch(SavingActions.getTargetsData(data));
    navigation.navigate("transferMoneyToTarget");
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        refreshControl={
          <RefreshControl
            refreshing={savingStore.loading}
            onRefresh={props.onRefresh}
          />
        }
      >
        <SavingInfo data={props.data} />
        <TargetList data={props.data} />
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonBox}>
          <Button
            title="تعریف هدف جدید"
            onPress={() => handleAddNewTargetPress(props.data)}
            disabled={filterActiveTargets?.length >= 2 ? true : false}
            color={colors.buttonOpenActive}
          />
        </View>
        <View style={styles.buttonBox}>
          <Button
            title="انتقال وجه به هدف"
            onPress={() => handleTransferMoneyToTarget(props.data)}
            disabled={filterActiveTargets?.length > 0 ? false : true}
            color={colors.buttonOpenActive}
          />
        </View>
      </View>
    </>
  );
};

export default ChildPage;
