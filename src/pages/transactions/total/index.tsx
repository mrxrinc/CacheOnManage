import React from "react";
import { FlatList } from "react-native";
import Item from "../item";
import Timeline from "../timeline";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
const Total = (props: any) => {
  const {data} = props.route.params;
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
          data={data}
          renderItem={(item) => <Item data={item}/>}
        />
      </>
    </Layout>
  );
};
export default Total;
