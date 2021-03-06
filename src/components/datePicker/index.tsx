import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import DatePickerWheel from "components/datePickerWheel";
import ArrowIcon from "components/icons/arrow.svg";
import Button from "components/button";
import { colors } from "constants/index";
import styles from "./styles";
import { withTheme } from "../../themeCore/themeProvider";

const DatePicker = ({
  label = "",
  modalTitle = "",
  light = false,
  noIcon = false,
  active = true,
  defaultValue = "",
  theme,
  handleChosenDate = () => null,
  color,
  limited,
}: any) => {
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const blujr = theme.key === "FATHER BLU JUNIOR";

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleOnConfirm = () => {
    setShowDateModal(false);
    setValue(tempValue);
    handleChosenDate(tempValue);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          light
            ? styles.buttonLight
            : blujr
            ? styles.buttonBlujr
            : !showDateModal
            ? styles.buttonMoneyInactive
            : styles.buttonMoneyActive,
          {
            width: "100%",
            height: 52,
          },
        ]}
        onPress={() => active && setShowDateModal(true)}
      >
        {light ? (
          <FormattedText
            style={[styles.label, { color: color || colors.gray200 }]}
            fontFamily="Regular-FaNum"
          >
            {value}
          </FormattedText>
        ) : blujr ? (
          <FormattedText
            style={[
              styles.label,
              { color: value ? colors.gray200 : colors.gray500 },
            ]}
            fontFamily="Regular-FaNum"
          >
            {value || label}
          </FormattedText>
        ) : (
          <>
            <FormattedText
              style={[
                styles.label,
                {
                  fontSize: value ? 12 : 16,
                  color: value ? colors.title : colors.gray500,
                },
              ]}
              fontFamily="Regular-FaNum"
            >
              {label}
            </FormattedText>

            {!!value && (
              <FormattedText
                style={[styles.label, { color: colors.gray200 }]}
                fontFamily="Regular-FaNum"
              >
                {value}
              </FormattedText>
            )}
          </>
        )}

        {!noIcon && (
          <View
            style={[
              styles.iconWrapper,
              {
                paddingTop: blujr ? 0 : 10,
              },
            ]}
          >
            <ArrowIcon
              width={30}
              height={30}
              style={{
                transform: [{ rotate: showDateModal ? "90deg" : "270deg" }],
                color: showDateModal ? colors.gray500 : colors.gray700,
              }}
            />
          </View>
        )}
      </TouchableOpacity>

      <Modal
        isVisible={showDateModal}
        onBackdropPress={() => setShowDateModal(false)}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalSwipeHandle} />
          <FormattedText style={styles.ageWarning}>{modalTitle}</FormattedText>
          <DatePickerWheel
            limited={limited}
            value={(value: any) => setTempValue(value)}
          />
          <View style={styles.modalButtonWrapper}>
            <Button
              title="انتخاب"
              onPress={handleOnConfirm}
              color={colors.links}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default withTheme(DatePicker);
