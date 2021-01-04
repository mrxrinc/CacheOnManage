import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import MaterialTextField from "components/materialTextfield";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/earing-stack-navigator";
import Tick from "components/icons/tick.svg";
import { getDefaultTask, getChildInfo, addNewTask } from "utils/api";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/button";
import { colors, width, height } from "constants/index";
import { RootState } from "../../../customType";
import PlusIcon from "components/icons/plus.svg";
import BlueArrowIcon from "components/icons/blueArrow.svg";
import NoteIcon from "components/icons/note.svg";
import { formatNumber } from "utils";

type Navigation = NavigationProp<StackParamList>;
const childIdList = [];
const AddNewTask = () => {
  const navigation = useNavigation<Navigation>();
  const [onFocus, setOnFocus] = useState(false);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [defaulTask, setDefualtTask] = useState([]);
  const [childInfo, setChildInfo] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [amount, setAmount] = useState("");
  const [favorites, setFavorite] = useState([]);
  const [activityTask, setActivityTask] = useState("ONCE");
  const [factorCheck, setFactorCheck] = useState(false);
  const [customDefault, setCustomDefault] = useState(false);
  const [isDefaultTask, setIsDefaultTask] = useState<boolean>(false);
  const [error, setError] = useState<any>({ field: "", message: "" });
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };
  useEffect(() => {
    getDefaultTask(token)
      .then((response: any) => {
        setDefualtTask(response.data);
      })
      .catch(function (error) {
        throw error;
      });
    getChildInfo(token)
      .then((response: any) => {
        setChildInfo(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  const handleClick = () => {
    const data = {
      taskName: taskName,
      activityType: activityTask,
      childIds: childIdList,
      amount: amount,
      customDefault,
    };
    console.log("newtask data", data);
    addNewTask(token, data)
      .then((response) => {
        childIdList.splice(0, childIdList.length);
        navigation.reset({ index: 0, routes: [{ name: "earning" }] });
      })
      .catch((err) => {
        console.warn("ERROR: ", err.response);
      });
  };

  const _renderItems = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={styles.taskCotainer}
        onPress={() => {
          setTaskName(item.taskName);
          setAmount(item.amount);
          setOnFocus(true);
          setIsDefaultTask(true);
        }}
      >
        <View style={styles.taskNameBox}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: colors.gray700,
              backgroundColor: colors.gray950,
            }}
          >
            <Image
              source={{ uri: `data:image/png;base64, ${item.icon}` }}
              style={{ width: 32, height: 32 }}
            />
          </View>
          <View style={{ width: "80%" }}>
            <FormattedText style={styles.taskText}>
              {item.taskName}
            </FormattedText>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FormattedText fontFamily="Regular-FaNum" style={styles.taskText}>
            {formatNumber(item.amount)} ریال
          </FormattedText>

          <BlueArrowIcon style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  const Column = ({ title, isFavorite, onPress, index }) => {
    console.log("Column is", title.id);
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(title);
        }}
        style={styles.selectChild}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.avatarWrapper}>
            <View
              style={[
                styles.avatarCheckbox,
                {
                  backgroundColor: isFavorite
                    ? colors.buttonSubmitActive
                    : "white",
                },
              ]}
            >
              <Tick width={14} height={14} fill={"white"} />
            </View>

            <Image
              source={{ uri: `data:image/png;base64,${title.avatar}` }}
              style={styles.avatar}
            />
          </View>
          <FormattedText style={styles.childName} numberOfLines={1}>
            {title.nickname}
          </FormattedText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderChildName = ({ item, index, favorites, setFavorite }: any) => {
    return (
      <Column
        index={index}
        title={item}
        isFavorite={favorites.includes(item)}
        onPress={(item: any) => {
          setFavorite((favoriteItems) => {
            let isFavorite = favoriteItems.includes(item);

            if (isFavorite) {
              const index = childIdList.indexOf(item.id);
              if (index > -1) {
                childIdList.splice(index, 1);
              }
              return favoriteItems.filter((title) => title !== item);
            }
            childIdList.push(item.id);
            return [item, ...favoriteItems];
          });
        }}
      />
    );
  };

  const renderItemCall = useCallback(({ item, index }) =>
    renderChildName({ item, index, favorites, setFavorite })
  );

  const handleFactorCheck = (value: string) => {
    if (parseInt(value) % 5000 === 0) {
      setFactorCheck(true);
    } else {
      setFactorCheck(false);
    }
  };

  return (
    <Layout>
      <Header
        staticTitle={"addNewTask"}
        handleBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textInputBox}>
          <MaterialTextField
            label="نام فعالیت جدید"
            keyboardType="default"
            maxLength={30}
            isOnFcous={() => setOnFocus(true)}
            onChange={clearError}
            onChangeText={(value: any) => setTaskName(value)}
            editable={!isDefaultTask}
            value={taskName}
          />
          <PlusIcon style={styles.plusIcon} />
        </View>
        {!onFocus ? (
          <FlatList
            numColumns={1}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "flex-start",
              width: width * 0.89,
            }}
            data={defaulTask}
            renderItem={({ item, index }) => _renderItems(item, index)}
          />
        ) : (
          <View
            style={{
              width: width,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={styles.earningBox}>
              <FormattedText id="earning" style={styles.earningText} />
              <View style={styles.earningTextInputBox}>
                <TextInput
                  style={styles.TextInput}
                  returnKeyType="done"
                  keyboardType="numeric"
                  maxLength={10}
                  underlineColorAndroid={"transparent"}
                  onChangeText={(value) => {
                    setAmount(value.replace(/,/g, ""));
                    handleFactorCheck(value.replace(/,/g, ""));
                  }}
                  onLayout={() => handleFactorCheck(amount)}
                  value={formatNumber(amount)}
                />
                <FormattedText id="home.rial" style={styles.unitText} />
              </View>
            </View>

            <View style={styles.factorWrapper}>
              <NoteIcon />
              <FormattedText
                style={[
                  styles.factorText,
                  {
                    color: !amount || factorCheck ? colors.title : colors.red,
                  },
                ]}
              >
                ضریبی از ۵،۰۰۰ ریال
              </FormattedText>
            </View>

            {!isChild && (
              <View style={[styles.earningBox, { height: 118 }]}>
                <FlatList
                  horizontal={true}
                  contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: width * 0.89,
                  }}
                  data={childInfo}
                  renderItem={renderItemCall}
                  extraData={favorites}
                />
              </View>
            )}

            <View
              style={{
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: width * 0.89,
                height: 60,
                marginTop: 25,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setActivityTask("ONCE");
                }}
                style={styles.activityButton}
              >
                <View
                  style={[
                    styles.recurringCheckbox,
                    {
                      backgroundColor:
                        activityTask == "ONCE"
                          ? colors.buttonSubmitActive
                          : "white",
                    },
                  ]}
                >
                  <Tick width={14} height={14} fill={"white"} />
                </View>

                <FormattedText
                  id="earning.justOnceActivity"
                  style={styles.activityText}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setActivityTask("WEEKLY");
                }}
                style={styles.activityButton}
              >
                <View
                  style={[
                    styles.recurringCheckbox,
                    {
                      backgroundColor:
                        activityTask == "WEEKLY"
                          ? colors.buttonSubmitActive
                          : "white",
                    },
                  ]}
                >
                  <Tick width={14} height={14} fill={"white"} />
                </View>
                <FormattedText
                  id="earning.weeklyActivity"
                  style={styles.activityText}
                />
              </TouchableOpacity>
            </View>

            {!isChild && !isDefaultTask && (
              <TouchableOpacity
                onPress={() => {
                  setCustomDefault(!customDefault);
                }}
                style={styles.addToPopularList}
              >
                <View
                  style={[
                    styles.recurringCheckbox,
                    {
                      backgroundColor: customDefault
                        ? colors.buttonSubmitActive
                        : "white",
                    },
                  ]}
                >
                  <Tick width={14} height={14} fill={"white"} />
                </View>
                <FormattedText
                  id="earning.addToPopularList"
                  style={styles.activityText}
                />
              </TouchableOpacity>
            )}

            <View
              style={{ width: width * 0.89, paddingBottom: 30, marginTop: 20 }}
            >
              <Button
                color={colors.buttonSubmitActive}
                title="افزودن مسئولیت جدید"
                onPress={() => handleClick()}
                disabled={
                  !factorCheck || (!isChild && childIdList.length === 0)
                }
              />
            </View>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};
export default AddNewTask;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textInputBox: {
    width: width * 0.89,
    height: 69,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  plusIcon: {
    color: colors.gray600,
    transform: [{ scale: 1 }],
    right: 27,
  },
  arrowIcon: {
    color: colors.buttonOpenActive,
    transform: [{ scale: 1.4 }],
    marginHorizontal: 5,
    marginTop: 5,
  },
  taskText: {
    color: "#515c6f",
    fontSize: 14,
    lineHeight: 22,
  },
  earningBox: {
    width: width * 0.89,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  earningText: {
    color: "#333333",
    fontSize: 20,
  },
  TextInput: {
    backgroundColor: colors.gray900,
    height: 45,
    fontSize: 20,
    color: "black",
    width: 149,
    borderRadius: 10,
    textAlign: "center",
    paddingBottom: 4,
    lineHeight: 31,
    fontFamily: "IRANSansMobileFaNum",
  },
  earningTextInputBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitText: {
    color: "#00015d",
    fontSize: 16,
    marginLeft: 6,
  },
  factorWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  factorText: {
    fontSize: 12,
    color: colors.title,
    lineHeight: 18,
  },
  selectChild: {
    width: 74,
    height: 90,
    marginTop: 20,
    marginRight: 10,
  },
  selected: { backgroundColor: "red" },
  avatarWrapper: {},
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 30,
    backgroundColor: colors.gray900,
    borderWidth: 0.5,
    borderColor: colors.gray800,
  },
  avatarCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.buttonSubmitActive,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -9,
    left: -9,
    zIndex: 1,
  },
  childName: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    color: colors.gray250,
  },
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    backgroundColor: "blue",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1,
  },
  activityText: {
    color: "#515c6f",
    fontSize: 14,
    marginLeft: 5,
  },
  activityButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  taskCotainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  taskNameBox: {
    flexDirection: "row",
    width: "55%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recurringCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.buttonSubmitActive,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addToPopularList: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 22,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: colors.gray900,
  },
});
