import { View, Image } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
// import {reducer,initState} from '../../store/reducer'
import { UserProvider } from "../../store/createContext";

import "./index.scss";
import { User } from "../top";

const Result = () => {
  const [arr, setArr] = useState<User[]>([]);
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
        setArr(res.data.slice(0, 3));
      }
    });
  }, []);
  // console.log('result',useContext(UserContext))
  // console.log('nnnnn',getCurrentInstance().router.params.time)
  const { time, distance } = getCurrentInstance()!.router!.params;
  // let timeInner=Number(time/60).toFixed(2)
  const formatTime = value => {
    let result: number = parseInt(value);
    // let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    let m = Math.floor((result / 60 % 60)) < 10 ?  + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    // @ts-ignore
    if(m<1){
      m=Math.ceil(s/60).toFixed(2)
    }
    result = `${m}`
    return result
  }
  const goTrack=()=>{
    Taro.navigateTo({
      url: `../../pages/track/index?time=${time}&&distance=${distance}`
    });
  };
  const again = () => {
    Taro.navigateTo({
      url: `../../pages/index/index`
    });
  };
  return (
    <View className='result'>
      <View className='theRunning'>本次跑步</View>
      <View className='runDistance'>{distance}公里</View>
      <View className='runTime'>{formatTime(time)}分钟</View>
      <View className='rankHead'>
        <View className='rank'>今日排行</View>
        <View className='checkRank' onClick={() => Taro.navigateTo({ url: `../../pages/top/index` })}>
          查看排行榜&gt;
        </View>
      </View>
      <View className='rankList'>
        {arr.map((data, index) => {
          return (
            <View className='listOne' key={data.id}>
              <View>{index + 1}</View>
              <View>
                <Image src={data.profile}></Image>
              </View>
              <View>{data.name}</View>
              <View>{data.distance}公里</View>
              <View>{data.time}分钟</View>
            </View>
          );
        })}
      </View>
      <View className='rankFoot' onClick={() => goTrack()}>
        查看跑步轨迹&gt;
      </View>
      <View className='again' onClick={() => again()}>
        再跑一次
      </View>
    </View>
  );
};
const resultPage = () => {
  return (
    <UserProvider>
      <Result></Result>
    </UserProvider>
  );
};
export default resultPage;
