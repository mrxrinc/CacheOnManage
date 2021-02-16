import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import * as R from "ramda";
import { FormattedText } from "components/format-text";
import styles from "./styles";
import BluIcon from "images/transfer-blu.png";

interface ChildMainInfo {
  id: number;
  avatar: string;
  nickname: string;
}
interface Props {
  data: ChildMainInfo[];
  onSelectedChild: (id: number, nickname: string) => void;
}
const PickerItem: React.FC<Props> = (props) => {
  function handleSelectChild(id: number, nickname: string) {
    props.onSelectedChild(id, nickname);
  }
  return (
    <View>
      {R.map<any, any>((child) => {
        return (
          <TouchableOpacity
            onPress={() => handleSelectChild(child.id, child.nickname)}
          >
            <View style={styles.childInfoWrapper}>
              <View style={styles.nameWrapper}>
                <Image
                  source={{ uri: `data:image/png;base64,${child.avatar}` }}
                  style={styles.avatar}
                />
                <FormattedText style={styles.childNickName}>
                  {child.nickname}
                </FormattedText>
              </View>
              <Image source={BluIcon} style={styles.bluIcon} />
            </View>
          </TouchableOpacity>
        );
      }, props.data)}
    </View>
  );
};

export default PickerItem;
