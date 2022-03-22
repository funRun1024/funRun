import { Button, View } from "@tarojs/components";
import React, { useState } from "react";
import styles from "./index.module.scss";

interface headerProps {
  left: string;
  right: string;
}
const Header: React.FC<headerProps> = ({ left, right }) => {
  const { tab, setTab } = useHeader();
  return (
    <View className={styles.head}>
      <View>
        <Button
          className={tab ? styles.active : ""}
          onClick={() => {
            setTab(true);
          }}
        >
          {left}
        </Button>
        {tab ? <View className={styles.line}></View> : <></>}
      </View>
      <View>
        <Button
          className={!tab ? styles.active : ""}
          onClick={() => {
            setTab(false);
          }}
        >
          {right}
        </Button>
        {!tab ? <View className={styles.line}></View> : <></>}
      </View>
    </View>
  );
};
export const useHeader = () => {
  const [tab, setTab] = useState(true);
  return { tab, setTab };
};
export default Header;
