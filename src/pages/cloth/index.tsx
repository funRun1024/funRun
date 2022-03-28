import { View, Swiper, SwiperItem, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import UserContext from '../../store/createContext';
import Header from '../../components/header/';
import day1 from '../../images/index/day1.png';
import night1 from '../../images/index/night1.png';
import day2 from '../../images/index/day2.png';
import night2 from '../../images/index/night2.png';

export interface User {
  id: string;
  name: string;
  distance: string;
  time: string;
}
const Page: React.FC<{}> = () => {
  const [person, setPerson] = useState(0);
  const [tab, setTab] = useState(true);
  const [back, setBack] = useState(0);
  const [day, setDay] = useState(1);
  const picArr = [
    { day: day1, night: night1 },
    { day: day2, night: night2 },
    { day: day1, night: night1 }
  ];
  useEffect(() => {
    const hours = new Date().getHours();
    if (6 < hours && hours < 19) setDay(1);
    else setDay(0);
  }, []);
  return (
    <View className={styles.cloth}>
      {
        // eslint-disable-next-line
        <Header left={'人物'} right={'背景'} state={tab} setState={setTab} />
      }
      {tab ? (
        <>
          <Swiper
            current={person}
            className={styles.personContent}
            onChange={e => {
              setPerson(e.detail.current);
            }}
            previousMargin={110 + 'px'}
            nextMargin={110 + 'px'}
          >
            <SwiperItem>
              <View
                className={
                  styles.man + ` ${person === 0 ? styles.man_active : ''}`
                }
              ></View>
            </SwiperItem>
            <SwiperItem>
              <View
                className={
                  styles.woman + ` ${person === 1 ? styles.woman_active : ''}`
                }
              ></View>
            </SwiperItem>
          </Swiper>
          <View className={styles.circle}></View>
        </>
      ) : (
        <Swiper
          current={back}
          className={styles.backPic}
          previousMargin={80 + 'px'}
          nextMargin={30 + 'px'}
          onChange={e => {
            setBack(e.detail.current);
          }}
        >
          {picArr.map((data, index) => {
            return (
              <SwiperItem key={index}>
                <View
                  className={back === index ? styles.active : ''}
                  style={{
                    background: `url(${day ? data.day : data.night})`,
                    backgroundSize: 'cover'
                  }}
                ></View>
              </SwiperItem>
            );
          })}
        </Swiper>
      )}
      <Button
        className={styles.backBtn}
        onClick={() => {
          Taro.navigateTo({
            url: `../index/index?person=${person}&pic=${back}`
          });
        }}
      >
        返回
      </Button>
    </View>
  );
};
const Cloth: React.FC<{}> = () => {
  return (
    <UserContext>
      <Page />
    </UserContext>
  );
};
export default Cloth;
