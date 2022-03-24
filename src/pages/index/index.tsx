// // import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

import { Button, Swiper, SwiperItem, View } from '@tarojs/components';
import React, { FC, useState, useEffect } from 'react';
// import  Run from "../run/index"

import Taro from '@tarojs/taro';

import styles from './index.module.scss';

import day1 from '../../images/index/day1.png';
import night1 from '../../images/index/night1.png';
import day2 from '../../images/index/day2.png';
import night2 from '../../images/index/night2.png';
import UserContext from '../../store/createContext';
import Running from '../running';
// import PersonRun from '../personRun';

const Page: FC = () => {
  //所有初始化的状态

  const [person, setPerson] = useState<0 | 1>(1);
  const [back, setBack] = useState(0);
  const [day, setDay] = useState(1);
  const [next, setNext] = useState(1);
  const [running, setRunning] = useState(true);

  const picArr = [
    { day: day1, night: night1 },
    { day: day2, night: night2 },
    { day: day1, night: night1 }
  ];
  const changeState = () => {
    setRunning(!running);
  };
  useEffect(() => {
    const hours = new Date().getHours();
    if (6 < hours && hours < 19) setDay(1);
    else setDay(0);

    const { person: per, pic: bk } = Taro?.getCurrentInstance()?.router
      ?.params || { person: null, pic: null };
    if (per && bk) {
      setPerson(per ? 1 : 0);
      setBack(Number(bk));
    }
  }, []);
  return (
    <>
      {/*子组件都写在这里*/}
      {/* <Image src={night1} style={{ display: 'none' }}></Image>
      <Image src={night2} style={{ display: 'none' }}></Image> */}
      <View className={styles.index}>
        <View
          className={styles.backPic}
          style={{
            background: `url(${day ? picArr[back]?.day : picArr[back]?.night})`,
            backgroundSize: 'cover'
          }}
        ></View>
        {next ? (
          <Running
            person={!!person}
            changeState={changeState}
            state={running}
            data={{ speed: 1, distance: '123', time: 222 }}
          />
        ) : (
          <>
            <View className={styles.weatherBox}>
              <View>天气晴朗</View>
              <View>6~8度</View>
            </View>
            {day ? <View className={styles.sun}></View> : <></>}
            <View className={styles.topBtns}>
              <Button
                onClick={() => {
                  setBack(0);
                }}
              ></Button>

              <Button
                onClick={() => {
                  setBack(1);
                }}
              ></Button>
            </View>
            <View className={styles.bottomBtns}>
              <Button
                onClick={() => {
                  setPerson(0);
                }}
              ></Button>
              <Button
                onClick={() => {
                  setPerson(1);
                }}
              ></Button>
            </View>
            <Swiper
              current={person}
              className={styles.personContent}
              onChange={e => {
                setPerson(e.detail.current ? 1 : 0);
              }}
            >
              <SwiperItem>
                <View className={styles.man}></View>
              </SwiperItem>
              <SwiperItem>
                <View className={styles.woman}></View>
              </SwiperItem>
            </Swiper>
            <View className={styles.footer}>
              <Button
                className={styles.readyBtn}
                onClick={() => {
                  setNext(1);
                  setRunning(true);
                }}
              />
              <View className={styles.down}>
                <Button
                  className={styles.clothBtn}
                  onClick={() => {
                    Taro.navigateTo({
                      url: '../cloth/index'
                    });
                  }}
                />
                <Button
                  className={styles.topBtn}
                  onClick={() => {
                    Taro.navigateTo({
                      url: '../top/index'
                    });
                  }}
                />
              </View>
            </View>
          </>
        )}

        <View
          className={
            (day ? styles.earth_day : styles.earth_night) +
            ` ${running ? styles.earth_move : styles.earth_stop}`
          }
        ></View>
      </View>
    </>
  );
};
const Index: React.FC<{}> = () => {
  return (
    <UserContext>
      <Page></Page>
    </UserContext>
  );
};
export default Index;
