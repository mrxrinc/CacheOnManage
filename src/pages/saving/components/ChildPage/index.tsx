import React, { FC, useEffect } from "react";
// Utilities
import * as R from "ramda";
// Hooks
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
// Types
import { StateNetwork } from "store/index.reducer";
import { SavingState } from "store/Saving/saving.reducer";
// Common Components
import Button from "components/button";
// Local Components
import SavingInfo from "../SavingInfo/SavingInfo";
import TargetList from "../TargetList";
// UI Frameworks
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// Actions
import SavingActions from "store/Saving/saving.actions";
// Styles
import styles from "./styles";
import { colors } from "constants";

const contentContainerStyle: StyleProp<ViewStyle> = {
  alignItems: "center",
  backgroundColor: "#f4f6fa",
  paddingBottom: 20,
};

const ChildPage = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  // Store
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );

  React.useEffect(() => {
    dispatch(SavingActions.setChildTargets(props.data.targets));
  }, []);

  const filterActiveTargets = React.useMemo(() => {
    if (props.data.targets?.length > 0) {
      return R.filter((target: any) => {
        return target.state === "SAVING";
      })(props.data.targets);
    }
  }, [props.data.targets]);

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
      <ScrollView contentContainerStyle={contentContainerStyle}>
        <SavingInfo data={props.data} />
        <TargetList data={props.data} />
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <Button
          style={styles.button}
          title="تعریف هدف جدید"
          onPress={() => handleAddNewTargetPress(props.data)}
          disabled={
            (filterActiveTargets && filterActiveTargets?.length < 2) ||
            savingStore.childTargets.length === 0
              ? false
              : true
          }
          color={colors.buttonOpenActive}
        />

        <Button
          style={styles.button}
          title="انتقال وجه به هدف"
          onPress={() => handleTransferMoneyToTarget(props.data)}
          disabled={
            filterActiveTargets && filterActiveTargets.length > 0 ? false : true
          }
          color={colors.buttonOpenActive}
        />
      </View>
    </>
  );
};

export default ChildPage;
