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
import { RefreshControl, StyleProp, View, ViewStyle } from "react-native";
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
import AlertController from "components/alertController";
import Skeleton from "components/skeleton/saving";
import { formatNumber } from "utils";

const Saving: FC = ({ theme }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [childName, setChildName] = React.useState<string>("");
  const [childNameInFinishTarget, setChildNameInFinishTarget] = React.useState<
    string
  >("");
  const [childAllowance, setChildAllowance] = React.useState<string>("");
  const [finishTargetId, setFinishTargetId] = React.useState(0);
  const [deleteTargetId, setDeleteTargetId] = React.useState(0);
  const [deleteChildId, setDeleteChildId] = React.useState(0);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);

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

  const handleRefresh = () => {
    dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
  };

  const contentContainerStyle: StyleProp<ViewStyle> = {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 10,
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

  function handleCloseFinishTargetModal() {
    dispatch(SavingActions.setFinishTargetModal(false));
  }
  function handleShowFinishTargetModal(target: TargetsData, childName: string) {
    setFinishTargetId(target.id);
    setChildNameInFinishTarget(childName);
    dispatch(SavingActions.getTargetData(target));
    dispatch(SavingActions.setFinishTargetModal(true));
  }
  function handleFinishTarget() {
    dispatch(SavingActions.finishTarget(finishTargetId, { sagas: true }));
    dispatch(SavingActions.setFinishTargetModal(false));
    dispatch(SavingActions.setEditModal(false));
  }
  function handleShowDeleteModal(targetId: number, childId: number) {
    setShowDeleteModal(true);
    setDeleteTargetId(targetId);
    setDeleteChildId(childId);
  }

  function handleDelete() {
    dispatch(
      SavingActions.deleteTarget(
        // @ts-ignore
        { targetId: deleteTargetId, childId: deleteChildId },
        { sagas: true }
      )
    );
    setShowDeleteModal(false);
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
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={savingStore.loading}
              onRefresh={handleRefresh}
            />
          }
        >
          <SavingInfo data={item.data} />
          <TargetList
            data={item.data}
            onEditTarget={handleEdit}
            onShowFinishTargetModal={handleShowFinishTargetModal}
            onShowDeleteModal={handleShowDeleteModal}
          />
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
        <Skeleton />
      ) : (
        <View style={styles.container}>
          {savingStore.savingList?.length > 0 ? (
            <ScrollableTabView
              style={styles.tabView}
              hasTabbar={isChild ? false : true}
            >
              {savingStore.savingList.map(
                (childData: SavingListData, index: number) => {
                  return (
                    <ChildPage
                      tabLabel={childData.childName}
                      data={childData}
                      i={index}
                      key={index}
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

      <AlertController
        showModal={showDeleteModal}
        setShowModal={() => setShowDeleteModal(false)}
        title="حذف هدف"
        description="آیا از حذف هدف اطمینان دارید؟"
        leftAction={handleDelete}
        leftTitle="بله"
        leftColor={colors.red}
        rightTitle="انصراف"
        rightAction={() => setShowDeleteModal(false)}
      />
      <AlertController
        showModal={savingStore.showFinishTargetModal}
        setShowModal={handleCloseFinishTargetModal}
        title="اتمام هدف"
        description={`با تایید اتمام هدف ${selectedTargetData.title} , مبلغ ${
          selectedTargetData?.paidAmount
            ? formatNumber(selectedTargetData?.paidAmount)
            : "0"
        } ریال از حساب پس انداز ${childNameInFinishTarget} کسر شده و به کارت ${childNameInFinishTarget} منتقل می شود.`}
        rightAction={handleFinishTarget}
        rightTitle="اتمام هدف"
        leftTitle="انصراف"
        leftAction={handleCloseFinishTargetModal}
      />
    </Layout>
  );
};

export default withTheme(Saving);
