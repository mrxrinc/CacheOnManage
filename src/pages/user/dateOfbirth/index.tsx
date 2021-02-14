import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { FormattedText } from "components/format-text";
import { dateOfBirth } from "utils/api";
import { signUpStepChanged, showTreeChanged } from "redux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../customType";
import errorIcon from "images/error.png";
import ArrowDown from "components/icons/arrow-down.svg";
import ArrowUp from "components/icons/arrow-up.svg";
import DatePicker from "components/datePicker";
import Button from "components/button";
import { colors } from "constants/index";

interface IError {
  errorText: string;
  isError: boolean;
}
const DateOfBirth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [error, setError] = useState<IError>({
    errorText: "",
    isError: false,
  });
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [parentBirthDate, setParentBirthDate] = useState("");
  const getBirhDate = (value: any) => {
    setParentBirthDate(value);
  };

  const handleClick = () => {
    setLoading(true);
    dateOfBirth(token, parentBirthDate)
      .then((response: any) => {
        setLoading(false);
        if (response.status == 200) {
          dispatch(signUpStepChanged(response.data.current));
          dispatch(showTreeChanged(true));
        }
      })
      .catch((err) => {
        setError({ errorText: err.response.data.message, isError: true });
        setLoading(false);
      });
  };
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          height: height * 0.35,
        }}
      >
        <View style={styles.titleBox}>
          <FormattedText style={styles.title}>
            تاریخ تولد خود را وارد کنید
          </FormattedText>
        </View>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setSelected(!selected)}
        >
          <View>
            <FormattedText
              style={[
                styles.birthDate,
                { color: selected ? "#00015d" : "#afafaf" },
              ]}
            >
              تاریخ تولد
            </FormattedText>
            {selected && (
              <FormattedText style={styles.birthDate}>
                {parentBirthDate}
              </FormattedText>
            )}
          </View>
          {selected ? <ArrowUp /> : <ArrowDown />}
        </TouchableOpacity>
        {error.isError && (
          <View style={styles.errorBox}>
            <Image source={errorIcon} style={{ width: 16, height: 16 }} />
            <FormattedText style={styles.errorText}>
              {error.errorText}
            </FormattedText>
          </View>
        )}
        <View style={[styles.Button]}>
          <Button
            color={colors.buttonSubmitActive}
            title="تایید"
            onPress={() => handleClick()}
            disabled={!selected && true}
            loading={loading}
          />
        </View>
      </View>
      <View
        style={[styles.dateBox, { borderColor: selected ? "#f0eded" : "#fff" }]}
      >
        {selected && <DatePicker birthDate={getBirhDate} />}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  inputContainer: {
    width: width,
    height: height * 0.85,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInput: {
    width: width * 0.89,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderBottomColor: "#afafaf",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  birthDate: {
    fontSize: 14,
  },
  touch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textButton: {
    color: "white",
    fontSize: 16,
  },
  titleBox: { width: width * 0.89, height: 25, marginTop: "5%" },
  title: {
    color: "#00015d",
    fontSize: 16,
  },
  errorBox: {
    width: width * 0.89,
    height: height * 0.04,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  errorText: {
    fontSize: 12,
    color: "#f52727",
    marginLeft: "2%",
  },
  dateBox: {
    borderTopWidth: 1,
    width: width,
    height: height * 0.24,
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
});

export default DateOfBirth;
