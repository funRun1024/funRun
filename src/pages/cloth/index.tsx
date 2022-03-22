import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import UserContext, { useUser } from "../../store/createContext";
import Header, { useHeader } from "../../components/header";

export interface User {
  id: string;
  name: string;
  distance: string;
  time: string;
}
const Page: React.FC<{}> = () => {
  return (
    <View className={styles.cloth}>
      {
        // eslint-disable-next-line
        <Header left="人物" right="背景" />
      }
      123456
    </View>
  );
};
const Cloth: React.FC<{}> = () => {
  return (
    <UserContext>
      <Page />
    </UserContext>
  );
};
export default Cloth;
