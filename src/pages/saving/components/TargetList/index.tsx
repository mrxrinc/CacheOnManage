import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { colors } from "constants/index";
// Hooks
import { useDispatch, useSelector } from "react-redux";
// Helpers & Utils
import { formatNumber } from "utils";
// Images
import Edit from "components/icons/editIcon.svg";
import Delete from "components/icons/trashIcon.svg";
// UI Frameworks
import LinearGradient from "react-native-linear-gradient";
// Common Components
import { FormattedText } from "components/format-text";
import AlertController from "components/alertController";
import Button from "components/button";
// Types
import { SavingState } from "store/Saving/saving.reducer";
import { StateNetwork } from "store/index.reducer";
import { SavingListData, TargetsData } from "types/saving";
// Actions
import SavingActions from "store/Saving/saving.actions";
// Styles
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

interface Props {
  data: SavingListData;
  onEditTarget: (target: any, data: any) => void;
  theme: any;
}
const TargetList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const theme = props.theme;
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showFinishTargetModal, setShowFinishTargetModal] = useState<boolean>(
    false
  );
  const [deleteId, setDeleteId] = useState(0);
  const [finishTargetId, setFinishTargetId] = useState(0);
  const selectedTargetData = useSelector<StateNetwork, any>(
    (state) => state.saving.selectedTargetData
  );

  // Store
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );
  const isChild = useSelector<any, boolean>((state) => state.user.ischild);

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
    dispatch(SavingActions.getTargetData(target));
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
        props.data.targets.map((target: TargetsData, index: number) => {
          const targetPercent =
            Math.round(
              (Number(target.paidAmount) / Number(target.targetAmount) +
                Number.EPSILON) *
                100
            ) + "%";

          return (
            <View style={styles.targetBox} key={index}>
              <View style={styles.row}>
                <FormattedText
                  style={[styles.targetTitle, { color: theme.titleColor }]}
                >
                  {target.title}
                </FormattedText>

                {target.state === "DONE" || target.state === "CANCELED" ? (
                  <Delete
                    width={18}
                    height={18}
                    fill={theme.ButtonRedColor}
                    onPress={() => handleShowDeleteModal(target.id)}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.editBox}
                    onPress={() => props.onEditTarget(target, props.data)}
                  >
                    <Edit width={18} height={18} fill={theme.ButtonBlueColor} />
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <View style={styles.row}>
                  <View style={[styles.halfWidth]}>
                    <FormattedText
                      style={{ fontSize: 12, color: colors.text }}
                      fontFamily="Regular-FaNum"
                    >
                      هدف: {formatNumber(String(target.targetAmount))} ریال
                    </FormattedText>
                  </View>
                  <View style={[styles.halfWidth, styles.row]}>
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
                          color: colors.text,
                        }}
                      >
                        {target.paidAmount
                          ? formatNumber(String(target.paidAmount)) + " ریال "
                          : "0 ریال"}
                      </FormattedText>
                    </View>
                  </View>
                </View>
                <View style={styles.progressBarGray}>
                  <LinearGradient
                    colors={[theme.BlueGradient_Right, theme.BlueGradient_Left]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      height: 10,
                      width: targetPercent,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={[styles.row, { alignItems: "center" }]}>
                  {targetPercent !== "100%" &&
                  target.state !== "Done" &&
                  target.state !== "CANCELED" ? (
                    <FormattedText
                      style={styles.targetInfo}
                      fontFamily="Regular-FaNum"
                    >
                      پس انداز هفتگی :{" "}
                      {formatNumber(String(target.weeklySavings))} ریال
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

export default withTheme(TargetList);
