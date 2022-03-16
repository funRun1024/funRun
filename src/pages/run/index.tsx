import { View,Image } from "@tarojs/components";
import React, {FC, useState} from "react";
// import styled from 'styled-components';
// import { styled } from "linaria/react"
import './index.scss'
import earth from '../../images/earth.png'
import start from '../../images/start.png'
import cut from '../../images/cut.png'
import end from '../../images/end.png'
import lock from '../../images/lock.png'
import pause from '../../images/pause.png'

 const Run:FC=()=>{
  const [isStart,setStart]=useState<boolean>(true)
   const makeStart=()=>{
     setStart(false)
   }

   const makeEnd=()=>{
     setStart(true)
   }

  return(
   <View className='container'>
      <View className='bgImage'>
      <View className='earth'>
        <Image src={earth} />
      </View>
        {isStart?
          <View className='pause' onClick={()=>makeStart()!}>
              <Image src={pause}></Image>
          </View>:
          <View className='start'  onClick={()=>makeEnd()!}>
               <Image src={start}></Image>
          </View>}
      <View className='cut'>
        <Image src={cut}></Image>
      </View>
      <View className='end'>
        <Image src={end}></Image>
      </View>
      <View className='lock'>
        <Image src={lock}></Image>
      </View>
    </View>
   </View>
  )
}
export default Run
