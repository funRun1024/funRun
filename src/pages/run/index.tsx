import {View, Image} from "@tarojs/components";
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
import lockOpen from '../../images/lockOpen.png'
import sun from '../../images/sun.png'
// import ready from '../../images/ready.png'
// import personRun from '../../images/run.png'

const Run: FC = () => {
  const [isStart, setStart] = useState<boolean>(true)
  const [isLock, setLock] = useState<boolean>(false)
  const makeStart = () => {
    setStart(false)
  }
  const makeEnd = () => {
    setStart(true)
  }
  const makeLock = () => {
    setLock(true)
  }
  const makeUnLock = () => {
    setLock(false)
  }
  return (
    <View className='container'>
      <View className='bgImage'>
      <View className='bgHead'>
        <View className='readys'>
          <View className='ready'>
            1.01km
          </View>
          <View className='ready'>
            05：20
          </View>
          <View className='ready'>
            0.1km/h
          </View>
        </View>
        <View className='sun'>
          <Image src={sun}></Image>
        </View>
      </View>
        <View className='earth'>
          <Image src={earth} />
        </View>
        <View className='personRun'>
          {/*<Image src={personRun}></Image>*/}
        </View>
        {isStart ?
          <View className='pause' onClick={() => makeStart()!}>
            <Image src={pause}></Image>
          </View> :
          <View className='start' onClick={() => makeEnd()!}>
            <Image src={start}></Image>
          </View>}
        <View className='cut'>
          <Image src={cut}></Image>
        </View>
        <View className='end'>
          <Image src={end}></Image>
        </View>
        {isLock ?
          <View className='lock' onClick={() => makeUnLock()}>
            <Image src={lock}></Image>
          </View> :
          <View className='lock' onClick={() => makeLock()}>
            <Image src={lockOpen}></Image>
          </View>
        }

      </View>
    </View>
  )
}
export default Run
