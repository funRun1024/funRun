import { View, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import profile from "../../images/top/head.png";
import UserContext, { useUser } from "../../store/createContext";
import Header from "../../components/header/";
import profile1 from "../../images/profile/1.jpg";
import profile2 from "../../images/profile/2.jpg";
import profile3 from "../../images/profile/3.jpg";
import profile4 from "../../images/profile/4.jpg";
import profile5 from "../../images/profile/5.jpg";
import profile6 from "../../images/profile/6.jpg";

const picArray = [profile1, profile2, profile3, profile4, profile5, profile6];
export interface User {
  id: string;
  name: string;
  distance: string;
  time: string;
  profile: string;
}
const Page: React.FC<{}> = () => {
  const [arr, setArr] = useState<User[]>([]);
  const [record, setRecord] = useState<User[]>([]);
  const [meIndex, setMeIndex] = useState(0);
  const [me, setMe] = useState<User | null>(null);
  const [tab, setTab] = useState(true);
  const { user } = useUser();
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
    });
    Taro.request({
      url: "http://localhost:3001/record", //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        "content-type": "application/json" // 默认值
      },
      success: (res: { data: User[] }) => {
        res.data.sort((b, a) => {
          return Number(a.distance) - Number(b.distance);
        });
        setRecord(res.data);
      }
    });
  }, []);
  return (
    <View className={styles.top}>
      <Header left='人物' right='背景' state={tab} setState={setTab} />

      <View className={styles.content}>
        <View className={styles.item} key={me?.id}>
          <View className={styles.left}>
            <View className={styles.sort}> {meIndex}</View>
            <View>
              <Image className={styles.profile} src={me?.profile || ""} />
            </View>
            <View className={styles.name}>{me?.name}</View>
          </View>

          <View className={styles.data}>
            <View>{me?.distance + "公里"}</View>
            <View>{me?.time + "分钟"}</View>
          </View>
        </View>
        <View className={styles.line}></View>
        {(tab ? arr : record).map((data, index) => {
          if (data.id === user?.id)
            //使用异步防止报错
            setTimeout(() => {
              setMe(data);
              setMeIndex(index + 1);
            }, 0);
          return (
            <View className={styles.item} key={data.id}>
              <View className={styles.left}>
                <View className={styles.sort}> {index + 1}</View>
                <View>
                  <Image className={styles.profile} src={data?.profile} />
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
      <View className={styles.footer}>
        <View className={styles.cover}></View>
        <View
          className={styles.btn}
          onClick={() => {
            Taro.navigateTo({
              url: `../index/index`
            });
          }}
        >
          返回
        </View>
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
