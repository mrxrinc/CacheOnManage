import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import * as R from "ramda";
import { FormattedText } from "components/format-text";
import styles from "./styles";

interface ChildMainInfo {
  id: number;
  avatar: string;
  nickname: string;
}
interface Props {
  data: ChildMainInfo[];
}
const PickerItem: React.FC<Props> = (props) => {
  console.log("props", props);

  function handleSelectChild(id: number, nickname: string) {
    console.log("id", id);
  }
  return (
    <View>
      {R.map<any, any>((child) => {
        return (
          <TouchableOpacity
            onPress={() => handleSelectChild(child.id, child.nickname)}
          >
            <View style={styles.childInfoWrapper}>
              <Image
                source={{ uri: `data:image/png;base64,${child.avatar}` }}
                style={styles.avatar}
              />
              <FormattedText style={styles.childNickName}>
                {child.nickname}
              </FormattedText>
            </View>
          </TouchableOpacity>
        );
      }, props.data)}
    </View>
  );
};

export default PickerItem;
