import React, { FC, useState } from "react";
import { colors } from "constants/index";
// Hooks
import { useDispatch, useSelector } from "react-redux";
// Helpers & Utils
import { formatNumber } from "utils";
// Images
import Edit from "images/edit.svg";
import Delete from "images/trash.svg";
// UI Frameworks
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ActionModalBottom from "components/modal/actionModalBottom";
import { ScrollView } from "react-native-gesture-handler";
// Common Components
import { FormattedText } from "components/format-text";
import AlertController from "components/alertController";
import Button from "components/button";
// Local components
import EditTarget from "../EditTarget";
// Types
import { SavingState } from "store/Saving/saving.reducer";
import { RootState } from "customType";
import { StateNetwork } from "store/index.reducer";
// Actions
import SavingActions from "store/Saving/saving.actions";
// Styles
import styles from "./styles";
import gStyles from "theme";

interface TargetsData {
  targets: any;
}
interface Props {
  data: TargetsData;
}
const TargetList: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const isChild = useSelector<RootState, boolean>(
    (state) => state.user.ischild
  );

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showFinishTargetModal, setShowFinishTargetModal] = useState<boolean>(
    false
  );
  const [deleteId, setDeleteId] = useState(0);
  const [finishTargetId, setFinishTargetId] = useState(0);

  const selectedTargetData = useSelector<StateNetwork, any>(
    (state) => state.saving.selectedTargetsData
  );
  const { showEditModal } = useSelector<StateNetwork, any>(
    (state) => state.saving
  );

  // Store
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );

  function handleEdit(target: any) {
    dispatch(SavingActions.setEditModal(true));
    dispatch(SavingActions.getTargetsData(target));
  }

  function handleCloseModal() {
    dispatch(SavingActions.setEditModal(false));
  }

  function handleShowDeleteModal(id: number) {
    setShowDeleteModal(true);
    setDeleteId(id);
  }

  function handleDelete() {
    setShowFinishTargetModal(false);
    dispatch(
      SavingActions.deleteTarget(
        // @ts-ignore
        { targetId: deleteId, childId: props.data.childId },
        { sagas: true }
      )
    );
    setShowDeleteModal(false);
  }

  function handleShowFinishModal(target: any) {
    dispatch(SavingActions.getTargetsData(target));
    setShowFinishTargetModal(true);
    setFinishTargetId(target.id);
  }

  function handleFinishTarget() {
    dispatch(SavingActions.finishTarget(finishTargetId, { sagas: true }));
    setShowFinishTargetModal(false);
    dispatch(SavingActions.setEditModal(false));
  }

  return (
    <View>
      {props.data.targets.length > 0 ? (
        props.data.targets.map((target: any, index: number) => {
          const targetPercent =
            Math.round(
              (target.paidAmount / target.targetAmount + Number.EPSILON) * 100
            ) + "%";

          return (
            <View style={styles.targetBox} key={index}>
              <View style={gStyles.row}>
                <FormattedText style={styles.targetTitle}>
                  {target.title}
                </FormattedText>

                {target.state === "DONE" || target.state === "CANCELED" ? (
                  <Delete
                    height={24}
                    width={24}
                    onPress={() => handleShowDeleteModal(target.id)}
                  />
                ) : (
                  <Edit
                    height={24}
                    width={24}
                    onPress={() => handleEdit(target)}
                  />
                )}
              </View>
              <View>
                <View style={gStyles.row}>
                  <View style={[styles.halfWidth]}>
                    <FormattedText
                      style={{ fontSize: 12, color: "#515c6f" }}
                      fontFamily="Regular-FaNum"
                    >
                      هدف: {formatNumber(target.targetAmount)} ریال
                    </FormattedText>
                  </View>
                  <View style={[gStyles.row, styles.halfWidth]}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        width: "100%",
                      }}
                    >
                      <FormattedText
                        style={{ color: "#999", fontSize: 12 }}
                        fontFamily="Regular-FaNum"
                      >
                        {targetPercent}
                      </FormattedText>

                      <FormattedText
                        fontFamily="Regular-FaNum"
                        style={{
                          marginLeft: "4%",
                          fontSize: 12,
                          color: "#515c6f",
                        }}
                      >
                        {target.paidAmount
                          ? formatNumber(target.paidAmount) + " ریال "
                          : "0 ریال"}
                      </FormattedText>
                    </View>
                  </View>
                </View>
                <View style={styles.progressBarGray}>
                  <LinearGradient
                    colors={["#bb6aff", "#397fff"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      height: 10,
                      width: targetPercent,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={[gStyles.row, { alignItems: "center" }]}>
                  {targetPercent !== "100%" &&
                  target.state !== "Done" &&
                  target.state !== "CANCELED" ? (
                    <FormattedText
                      style={styles.targetInfo}
                      fontFamily="Regular-FaNum"
                    >
                      پس انداز هفتگی : {formatNumber(target.weeklySavings)} ریال
                    </FormattedText>
                  ) : (
                    <FormattedText style={styles.targetInfo}>
                      {isChild
                        ? target.state === "DONE" ||
                          target.state === "SAVING" ||
                          target.state === "COMPLETED"
                          ? "شمابه هدفت رسیدی!"
                          : target.state === "CANCELED"
                          ? "شما به هدفت خاتمه دادی"
                          : ""
                        : target.state === "DONE" ||
                          target.state === "SAVING" ||
                          target.state === "COMPLETED"
                        ? props.data.childName + " " + "به هدفش رسید!"
                        : target.state === "CANCELED"
                        ? props.data.childName + " " + "به هدفش خاتمه داد!"
                        : ""}
                    </FormattedText>
                  )}
                  {(targetPercent === "100%" && target.state === "SAVING") ||
                  target.state === "COMPLETED" ? (
                    <Button
                      style={styles.button}
                      titleStyle={{ color: colors.white }}
                      onPress={() => handleShowFinishModal(target)}
                      title="اتمام هدف"
                      loading={savingStore.loading}
                    />
                  ) : (
                    <FormattedText style={styles.targetInfo}>
                      تا {target.targetDate}
                    </FormattedText>
                  )}
                </View>
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
                  showModal={showFinishTargetModal}
                  setShowModal={() => setShowFinishTargetModal(false)}
                  title="اتمام هدف"
                  description={`با تایید اتمام هدف ${
                    selectedTargetData.title
                  } , مبلغ ${
                    selectedTargetData?.paidAmount
                      ? formatNumber(selectedTargetData?.paidAmount)
                      : "0"
                  } ریال از حساب پس انداز شما کسر شده و به کارت شما منتقل می شود.`}
                  rightAction={handleFinishTarget}
                  rightTitle="اتمام هدف"
                  leftTitle="انصراف"
                  leftAction={() => setShowFinishTargetModal(false)}
                />

                <ActionModalBottom
                  showModal={showEditModal}
                  onBackdropPress={handleCloseModal}
                  setShowModal={handleCloseModal}
                  style={styles.modal}
                  title="ویرایش هدف پس انداز"
                >
                  <EditTarget
                    data={selectedTargetData}
                    onCloseModal={handleCloseModal}
                    allowance={props.data.allowance}
                    childName={props.data.childName}
                  />
                </ActionModalBottom>
              </View>
            </View>
          );
        })
      ) : (
        <View>
          <FormattedText style={styles.noTarget}>
            هیچ هدفی تعریف نشده است
          </FormattedText>
        </View>
      )}
    </View>
  );
};

export default TargetList;
