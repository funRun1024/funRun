import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import profile from "../../images/top/head.png";
import UserContext, { useUser } from "../../store/createContext";
import Header, { useHeader } from "../../components/header";

export interface User {
  id: string;
  name: string;
  distance: string;
  time: string;
}
const Page: React.FC<{}> = () => {
  const [arr, setArr] = useState<User[]>([]);
  const [meIndex, setMeIndex] = useState(0);
  const { user } = useUser();
  // const { tab, setTab } = useHeader();
  useEffect(() => {
    Taro.request({
      url: "http://localhost:3001/top", //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        "content-type": "application/json" // 默认值
      },
      success: (res: { data: User[] }) => {
        res.data.sort((b, a) => {
          return Number(a.distance) - Number(b.distance);
        });

        setArr(res.data);
      }
    }).then(res => {
      res.data.map((data, index) => {
        console.log(user);
        console.log(data, index);
      });
    });
  }, []);
  return (
    <View className={styles.top}>
      {
        // eslint-disable-next-line
        <Header left="今日" right="累计" />
      }
      <View className={styles.content}>
        <View className={styles.item} key={user?.id}>
          <View className={styles.left}>
            <View className={styles.sort}> {meIndex}</View>
            <View>
              <Image className={styles.profile} src={profile} />
            </View>
            <View className={styles.name}>{user?.name}</View>
          </View>

          <View className={styles.data}>
            <View>{user?.distance + "公里"}</View>
            <View>{user?.time + "分钟"}</View>
          </View>
        </View>
        <View className={styles.line}></View>
        {arr.map((data, index) => {
          if (data.id === user?.id)
            //使用异步防止报错
            setTimeout(() => {
              setMeIndex(index + 1);
            }, 0);
          return (
            <View className={styles.item} key={data.id}>
              <View className={styles.left}>
                <View className={styles.sort}> {index + 1}</View>
                <View>
                  <Image className={styles.profile} src={profile} />
                </View>
                <View className={styles.name}>{data.name}</View>
              </View>
              <View className={styles.data}>
                <View>{data.distance + "公里"}</View>
                <View>{data.time + "分钟"}</View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const Top: React.FC<{}> = () => {
  return (
    <UserContext>
      <Page />
    </UserContext>
  );
};
export default Top;
