import {View,Image} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import './index.scss'
import head from '../../images/head.png'



const Result=()=>{
  const goTrack=()=>{
    Taro.navigateTo({
      url:"../../pages/track/index",
    })
  }
  return  (
    <View className='result'>
      <View className='theRunning'>本次跑步</View>
      <View className='runDistance'>1.01公里</View>
      <View className='runTime'>5分钟</View>
      <View className='rankHead'>
          <View className='rank'>今日排行</View>
        <View className='checkRank'>查看排行榜&gt;</View>
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
      <View className='again'>
        再跑一次
      </View>
    </View>
  )
}

export default Result
