import React from "react";
import { FlatList } from "react-native";
import Item from "../item";
import Timeline from "../timeline";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
const Total = (props: any) => {
  return (
    <Layout>
      <>
        <Header
          staticTitle={"transactions.total"}
          handleBack={() => props.navigation.goBack()}
        />
        <Timeline />
        <FlatList
          style={styles.content}
          contentContainerStyle={styles.contentFlatList}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          renderItem={() => <Item />}
        />
      </>
    </Layout>
  );
};
export default Total;
