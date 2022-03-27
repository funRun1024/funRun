import {View,Image} from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import React from "react";
// import {reducer,initState} from '../../store/reducer'
import {UserProvider} from "../../store/createContext";

import './index.scss'
import head from '../../images/head.png'

const Result=()=>{
  // console.log('result',useContext(UserContext))
  // console.log('nnnnn',getCurrentInstance().router.params.time)
  const {time,distance}=getCurrentInstance()!.router!.params
  // let timeInner=Number(time/60).toFixed(2)
  const formatTime=(value) =>{
    let result:number = parseInt(value)
    // let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    // @ts-ignore
    result = `${m}:${s}`
    return result
  }
  const goTrack=()=>{
    Taro.navigateTo({
      url:`../../pages/track/index?time=${time}&&distance=${distance}`,
    })
  }
  const again=()=>{
    Taro.navigateTo({
      url:`../../pages/index/index`,
    })
  }
  return  (
    <View className='result'>
      <View className='theRunning'>本次跑步</View>
      <View className='runDistance'>{distance}公里</View>
      <View className='runTime'>{formatTime(time)}分钟</View>
      <View className='rankHead'>
          <View className='rank'>今日排行</View>
        <View className='checkRank' onClick={()=>Taro.navigateTo({ url:`../../pages/top/index`,})}>查看排行榜&gt;</View>
      </View>
      <View className='rankList'>
          <View className='listOne'>
            <View>1</View>
            <View>
              <Image src={head}></Image>
            </View>
            <View>雨下整夜</View>
            <View>4.07公里</View>
            <View>22分钟</View>
          </View>
        <View className='listOne'>
          <View>1</View>
          <View>
            <Image src={head}></Image>
          </View>
          <View>雨下整夜</View>
          <View>4.07公里</View>
          <View>22分钟</View>
        </View>
        <View className='listOne'>
          <View>1</View>
          <View>
            <Image src={head}></Image>
          </View>
          <View>雨下整夜</View>
          <View>4.07公里</View>
          <View>22分钟</View>
        </View>
      </View>
      <View className='rankFoot' onClick={()=>goTrack()}>
        查看跑步轨迹&gt;
      </View>
      <View className='again' onClick={()=>again()}>
        再跑一次
      </View>
    </View>
  )
}
const resultPage=()=>{
  return (
    <UserProvider>
      <Result></Result>
    </UserProvider>
  )
}
export default resultPage
