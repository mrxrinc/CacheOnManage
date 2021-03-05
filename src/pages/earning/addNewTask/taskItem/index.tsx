import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import BlueArrowIcon from "components/icons/blueArrow.svg";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import styles from "./styles";
const TaskItem = (props: any) => {
  const { icon, taskName, amount, onPress, isSingle } = props;
  const [isActive, setIsActive] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.taskCotainer,
        isSingle && styles.selectedItem,
        isActive && styles.activeItem,
      ]}
      onPress={() => (!isSingle ? onPress(props) : null)}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
    >
      <View style={styles.taskNameBox}>
        <View style={styles.imgWrapper}>
          <Image
            source={{ uri: `data:image/png;base64, ${icon}` }}
            style={styles.img}
          />
        </View>
        <FormattedText style={styles.taskText}>{taskName}</FormattedText>
      </View>
      {!isSingle && (
        <View style={styles.amount}>
          <FormattedText fontFamily="Regular-FaNum" style={styles.taskText}>
            {formatNumber(amount)}
          </FormattedText>
          <FormattedText fontFamily="Regular-FaNum" style={styles.rial}>
            ریال
          </FormattedText>
          <BlueArrowIcon style={styles.arrowIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TaskItem;
