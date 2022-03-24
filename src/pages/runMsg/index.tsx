import {View} from "@tarojs/components";
import React, {FC} from "react";
import './index.scss'

interface PropsType{
  distance:number,
  time:any,
  speed:number
}
const RunMsg:FC<PropsType>=({distance,time,speed}:PropsType)=>{
  return (
    <View>
      <View className='runMsg'>
        <View className='runDistance'>
          {distance}km
        </View>
        <View className='runTime'>
          {time}
        </View>
        <View className='runSpeed'>
          {speed}km/h
        </View>
      </View>
    </View>
  );
}
export default RunMsg
