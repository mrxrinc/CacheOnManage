import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

import { signUpStepChanged, currentStepChanged } from "redux/actions/User";
import { setAddress } from "utils/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../customType";
import { FormattedText } from "components/format-text";
import errorIcon from "images/error.png";
import MaterialTextField from "components/materialTextfield";
import Button from "components/button";
import Close from "components/icons/close.svg";
import { colors } from "constants/index";

const Address = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clientAddress, setClientAddress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [error, setError] = useState<any>({ field: "", message: "" });

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };
  const dispatch = useDispatch();
  const handleTouch = () => {
    setLoading(true);
    setAddress(token, postalcode, phone)
      .then((response: any) => {
        setLoading(false);
        if (response.status == 200) {
          setClientAddress(
            response.data.province +
              " - " +
              response.data.city +
              " - " +
              response.data.avenue +
              " - پلاک " +
              response.data.buildingNo +
              " - طبقه " +
              response.data.floor
          );
          setModalVisible(true);
        } else {
          setError({ field: "error", message: "خطای شبکه" });
        }
      })
      .catch((err) => {
        setError({ field: "error", message: err.response.data.message });
        setLoading(false);
      });
  };
  const onPostalCodeChanged = (code: string) => {
    setPostalcode(code);
  };
  const onTelephoneChanged = (phoneNumber: string) => {
    setPhone(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputPack}>
        <View style={styles.textInputBox}>
          <MaterialTextField
            label="کد پستی"
            keyboardType="phone-pad"
            maxLength={10}
            onChange={clearError}
            onChangeText={onPostalCodeChanged}
            value={postalcode}
          />
        </View>
        <View style={[styles.textInputBox]}>
          <MaterialTextField
            label="شماره تلفن ثابت"
            keyboardType="phone-pad"
            maxLength={10}
            onChange={clearError}
            onChangeText={onTelephoneChanged}
            value={phone}
          />
          {error.field == "error" && (
            <View style={styles.errorBox}>
              <Image source={errorIcon} style={{ width: 16, height: 16 }} />
              <FormattedText style={styles.errorText}>
                {error.message}
              </FormattedText>
            </View>
          )}
        </View>
      </View>
      {!modalVisible && (
        <View style={[styles.Button]}>
          <Button
            color={colors.buttonSubmitActive}
            title="تایید و ادامه"
            onPress={() => handleTouch()}
            disabled={(postalcode.length != 10 || phone.length != 10) && true}
            loading={loading}
          />
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalBox}>
              <View
                style={{
                  width: width * 0.85,
                  // height: height * 0.1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Close width={20} height={20} fill={"black"} />
                </TouchableOpacity> */}
                <FormattedText style={styles.modalText}>
                  تایید آدرس پستی
                </FormattedText>
                <View />
              </View>

              <View style={{ width: width * 0.8 }}>
                <FormattedText style={{ fontSize: 16, textAlign: "center" }}>
                  {clientAddress}
                </FormattedText>
              </View>
              <View style={[styles.Button]}>
                <Button
                  color={colors.buttonSubmitActive}
                  title="تایید و ادامه"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    dispatch(signUpStepChanged("3002"));
                    dispatch(currentStepChanged(0));
                  }}
                  // disabled={!switchValue && true}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.89,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputPack: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * 0.8,
    height: height * 0.35,
    marginTop: "5%",
  },

  textInputBox: {
    width: width * 0.89,
    height: 70,
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
  Button: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: "15%",
  },

  centeredView: {
    width: width,
    height: height,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    height: height * 0.3,
    width: width,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e1e9f0",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBox: {
    width: "100%",
    height: "70%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalText: {
    color: "#8b8b8b",
    fontSize: 16,
  },
});
export default Address;
