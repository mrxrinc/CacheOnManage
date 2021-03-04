import React, { FC, useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ScrollableTabView from "components/scrollableTabView";
import Header from "components/header";
import Layout from "components/layout";
import { colors } from "constants/index";
import styles from "./styles";
import Button from "components/button";
import { getInternetPackages } from "utils/api";
import PackageItem from "./components/packageItem";

export const Packages: FC = (props: any) => {
  const mobileNumber = props.route.params?.mobileNumber;
  const operator = props.route.params?.chosenCarrier;
  const simcardType = props.route.params?.simcardType;
  const [packages, setPackages] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [planId, setPlanId] = useState<number>(0);
  const [chosenPackage, setChosenPackage] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    getInternetPackages({
      mobileNumber,
      simcardType,
      operator,
    })
      .then((response: any) => {
        setLoading(false);
        setPackages(response.data);
        setRefreshing(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.warn("ERROR: ", err.response?.data);
        setRefreshing(false);
      });
  };

  const handleChoosePackage = (planId: number, packageData: any) => {
    setPlanId(planId);
    setChosenPackage(packageData);
  };

  const pullToRefresh = () => {
    setRefreshing(true);
    getData();
  };

  const handleNextPage = () => {
    props.navigation.navigate("confirmation", {
      mobileNumber,
      operator,
      planId,
      chosenPackage,
    });
  };

  const renderItems = (plan: any) => (
    <View tabLabel={plan.name} key={plan.palanId}>
      <FlatList
        data={plan.packages}
        renderItem={({ item }) => {
          return (
            <PackageItem
              id={item.packageId}
              title={item.title}
              period={item.period}
              amount={item.amount}
              selected={
                chosenPackage?.packageId === item.packageId &&
                planId === plan.planId
              }
              handleSelection={() => handleChoosePackage(plan.planId, item)}
            />
          );
        }}
        onRefresh={pullToRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => `${item.packageId}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.itemsWrapper}
        ListFooterComponent={<View style={{ height: 105 }} />}
      />
    </View>
  );
  return (
    <Layout>
      <>
        <Header
          staticTitle={"internetPackage"}
          handleBack={() => props.navigation.goBack()}
        />
        <View style={styles.container}>
          {packages && (
            <ScrollableTabView tabbarBG={colors.gray900} hasTabbar={true}>
              {packages.map((plan: any) => renderItems(plan))}
            </ScrollableTabView>
          )}

          <View style={styles.buttonWrapper}>
            <View style={styles.buttonBox}>
              <Button
                title="ادامه"
                onPress={handleNextPage}
                color={colors.buttonOpenActive}
                disabled={!chosenPackage}
              />
            </View>
          </View>
        </View>
      </>
    </Layout>
  );
};
