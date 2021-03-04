import React from "react";
import { View, TouchableOpacity } from "react-native";
import { colors } from "constants/index";
import Button from "components/button";
import { FormattedText } from "components/format-text";
import ItemStatus from "./ItemStatus";
import { formatNumber, jalaliDate } from "utils";
import StarRating from "react-native-star-rating";
import Trash from "components/icons/trashIcon.svg";
import Edit from "components/icons/editIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../customType";
import styles from "./styles";

const Item = (props: any) => {
  const { theme, item, status, onDone, onDelete, onEdit, onToDo } = props;
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  const handleTaskRecurringType = (status: string) => {
    if (status === "ONE_OFF") return "یک‌بار";
    else if (status === "WEEKLY") return "هفتگی";
    return;
  };

  const handleRecurringTitle = (status: string) => {
    switch (status) {
      case "FAILED":
        return "تاریخ رد:";
      case "DONE":
        return "تاریخ انجام:";
      case "TODO":
        return "تاریخ ایجاد:";
      case "ACCEPT":
        return "تاریخ تائید:";
      case "PAID":
        return "تاریخ تائید:";
      default:
        return "تاریخ:";
    }
  };

  return (
    <View style={styles.container}>
      <ItemStatus status={status} item={item} theme={theme} />
      <View style={styles.taskItemMiddleLine} />
      <View style={styles.detail}>
        <View style={styles.detailItem}>
          <FormattedText
            style={[styles.titleText, { color: theme.titleColor }]}
            fontFamily="Medium"
            numberOfLines={1}
          >
            {item.taskName}
          </FormattedText>
          <View style={styles.amount}>
            <FormattedText style={styles.weeklyText}>
              {status !== "ACCEPT" &&
                item.type !== "PAID" &&
                handleTaskRecurringType(item.type)}
            </FormattedText>
            <FormattedText style={styles.amountText} fontFamily="Regular-FaNum">
              {formatNumber(item.amount)}
            </FormattedText>
            <FormattedText style={styles.rial}>ريال</FormattedText>
          </View>
        </View>
        <View style={styles.detailItem}>
          <FormattedText style={styles.dateText} fontFamily="Regular-FaNum">
            {handleRecurringTitle(status) + " " + jalaliDate(item.date)}
          </FormattedText>
          {status == "ACCEPT" && (
            <StarRating
              disabled
              maxStars={5}
              emptyStar={"star"}
              emptyStarColor={colors.gray650}
              fullStar={"star"}
              fullStarColor={colors.star}
              iconSet={"MaterialIcons"}
              rating={item.qualityStar || 2}
              reversed={true}
              starSize={22}
              containerStyle={{ flexDirection: "row-reverse" }}
            />
          )}
          {status == "FAILED" && (
            <FormattedText style={styles.taskItemFailedText}>
              رد شده
            </FormattedText>
          )}

          {status == "DONE" && !isChild && (
            <Button
              style={styles.taskItemConfirmButton}
              color={theme.ButtonGreenColor}
              title="تائید انجام مسئولیت"
              fontSize={12}
              titleStyle={styles.taskItemConfirmButtonText}
              onPress={onDone}
            />
          )}

          {status == "DONE" && isChild && (
            <FormattedText style={styles.waitingToConfirmText}>
              در انتظار تائید
            </FormattedText>
          )}

          {status == "TODO" && !isChild && (
            <View style={styles.updateTask}>
              <TouchableOpacity onPress={onDelete}>
                <Trash width={18} height={18} fill={theme.ButtonRedColor} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onEdit}>
                <Edit width={18} height={18} fill={theme.ButtonBlueColor} />
              </TouchableOpacity>
            </View>
          )}
          {status == "TODO" && isChild && (
            <TouchableOpacity
              style={styles.taskItemConfirmButtonToDo}
              onPress={onToDo}
            >
              <FormattedText style={styles.taskItemConfirmButtonText}>
                اتمام فعالیت
              </FormattedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
export default Item;
