import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import MaterialTextField from "components/materialTextfield";
import { useNavigation } from "@react-navigation/core";
import Tick from "components/icons/tick.svg";
import { getDefaultTask, getChildInfo, addNewTask } from "utils/api";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/button";
import { colors, width } from "constants/index";
import { RootState } from "../../../../customType";
import PlusIcon from "components/icons/plus.svg";
import NoteIcon from "components/icons/note.svg";
import { formatNumber } from "utils";
import styles from "./styles";
import Column from "./column";
import TaskItem from "./taskItem";
import { withTheme } from "themeCore/themeProvider";
import { getEarningData } from "redux/actions/Earning";

const childIdList: any = [];

const AddNewTask = (props: any) => {
  const theme = props.theme;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [onFocus, setOnFocus] = useState(false);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [defaulTask, setDefualtTask] = useState([]);
  const [childInfo, setChildInfo] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [amount, setAmount] = useState("");
  const [icon, setIcon] = useState("");
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
    addNewTask(token, data)
      .then((response) => {
        childIdList.splice(0, childIdList.length);
        dispatch(getEarningData(Math.random()));
        navigation.navigate("earningTab");
      })
      .catch((err) => {
        console.warn("ERROR: ", err.response);
      });
  };

  const renderChildName = ({ item, index, favorites, setFavorite }: any) => {
    return (
      <Column
        index={index}
        title={item}
        isFavorite={favorites.includes(item)}
        onPress={(item: any) => {
          setFavorite((favoriteItems: any) => {
            let isFavorite = favoriteItems.includes(item);

            if (isFavorite) {
              const index = childIdList.indexOf(item.id);
              if (index > -1) {
                childIdList.splice(index, 1);
              }
              return favoriteItems.filter((title: string) => title !== item);
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

  const onItem = (item: any) => {
    setTaskName(item.taskName);
    setAmount(item.amount);
    setIcon(item.icon);
    setOnFocus(true);
    setIsDefaultTask(true);
  };

  return (
    <Layout>
      <Header
        staticTitle={"addNewTask"}
        handleBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {isDefaultTask ? (
            <TaskItem
              isSingle
              taskName={taskName}
              icon={icon}
              amount={amount}
            />
          ) : (
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
          )}
          {!onFocus ? (
            <FlatList
              keyboardShouldPersistTaps="handled"
              numColumns={1}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: width * 0.89,
              }}
              data={defaulTask}
              keyExtractor={(index: any) => index.toString()}
              renderItem={({ item }) => (
                <TaskItem
                  taskName={item.taskName}
                  icon={item.icon}
                  amount={item.amount}
                  onPress={onItem.bind(this)}
                />
              )}
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
                <FlatList
                  contentContainerStyle={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    width: width * 0.89,
                  }}
                  data={childInfo}
                  renderItem={renderItemCall}
                  extraData={favorites}
                />
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
                            ? theme.ButtonGreenColor
                            : "white",
                        borderColor: theme.ButtonGreenColor,
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
                            ? theme.ButtonGreenColor
                            : "white",
                        borderColor: theme.ButtonGreenColor,
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
                          ? theme.ButtonGreenColor
                          : "white",
                        borderColor: theme.ButtonGreenColor,
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
            </View>
          )}
        </View>
        {onFocus && (
          <Button
            style={styles.buttonWrapper}
            color={theme.ButtonGreenColor}
            title="افزودن مسئولیت جدید"
            onPress={() => handleClick()}
            disabled={!factorCheck || (!isChild && childIdList.length === 0)}
          />
        )}
      </ScrollView>
    </Layout>
  );
};
export default withTheme(AddNewTask);
