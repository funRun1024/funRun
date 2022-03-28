import { Button, Swiper, SwiperItem, View } from "@tarojs/components";
import React, { FC, useState, useEffect, useContext, useCallback, useRef } from "react";
import Taro from "@tarojs/taro";

import styles from "./index.module.scss";
import day1 from "../../images/index/day1.png";
import night1 from "../../images/index/night1.png";
import day2 from "../../images/index/day2.png";
import night2 from "../../images/index/night2.png";
import sun from "../../images/weather/sun.png";
import rain from "../../images/weather/rain.png";
import cloud from "../../images/weather/cloud.png";
import snow from "../../images/weather/snow.png";
// eslint-disable-next-line import/no-duplicates
import { UserContext, UserProvider, ContextType } from "../../store/createContext";
import Running from "../running";

const Page: FC = () => {
  //所有初始化的状态
  const [person, setPerson] = useState<0 | 1>(1);
  const [back, setBack] = useState(0);
  const [day, setDay] = useState(1);
  const [next, setNext] = useState(0);
  const [running, setRunning] = useState(true);
  const [type, setType] = useState(3);
  const timer = useRef();
  // @ts-ignore
  let { time, speed, setTime } = useContext<ContextType | null>(UserContext);
  const picArr = [
    { day: day1, night: night1 },
    { day: day2, night: night2 },
    { day: day1, night: night1 }
  ];
  const toWheather = (index: number) => {
    switch (index) {
      case 0:
        return {
          background: `url(${sun})`,
          backgroundSize: "cover"
        };
      case 1:
        return {
          background: `url(${rain})`,
          backgroundSize: "cover"
        };
      case 2:
        return {
          background: `url(${cloud})`,
          backgroundSize: "cover"
        };
      case 3:
        return {
          background: `url(${snow})`,
          backgroundSize: "cover"
        };
      default:
        return {
          background: "url(../../images/weather/sun.png)",
          backgroundSize: "cover"
        };
    }
  };
  const changeState = useCallback(() => {
    // flag? setRunning(running):  setRunning(!running)
    setRunning(!running);

    if (!running) {
      // @ts-ignore
      timer.current = setInterval(() => {
        setTime(time++);
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
  }, [running, setTime, time]);
  useEffect(() => {
    // setRunning(!running);
    changeState();
  }, []);
  useEffect(() => {
    const hours = new Date().getHours();
    if (6 < hours && hours < 19) setDay(1);
    else setDay(0);

    const { person: per, pic: bk } = Taro?.getCurrentInstance()?.router?.params || { person: null, pic: null };
    if (per && bk) {
      setPerson(per ? 1 : 0);
      setBack(Number(bk));
    }
  }, []);
  return (
    <>
      <View className={styles.index}>
        <View
          className={styles.backPic}
          style={{
            background: `url(${day ? picArr[back]?.day : picArr[back]?.night})`,
            backgroundSize: "cover"
          }}
        ></View>{" "}
        {day ? <View className={styles.sun} style={toWheather(type)}></View> : <></>}
        {next ? (
          <Running person={!!person} changeState={changeState} state={running} data={{ speed, distance: time * 2, time }} />
        ) : (
          <>
            <View className={styles.weatherBox}>
              <View>天气晴朗</View>
              <View>6~8度</View>
            </View>

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
                  setRunning(false);
                }}
              />
              <View className={styles.down}>
                <Button
                  className={styles.clothBtn}
                  onClick={() => {
                    Taro.navigateTo({
                      url: "../cloth/index"
                    });
                  }}
                />
                <Button
                  className={styles.topBtn}
                  onClick={() => {
                    Taro.navigateTo({
                      url: "../top/index"
                    });
                  }}
                />
              </View>
            </View>
          </>
        )}
        <View className={(day ? styles.earth_day : styles.earth_night) + ` ${running ? styles.earth_move : styles.earth_stop}`}></View>
      </View>
      {/* {false? <Run />:null} */}
    </>
  );
};
const Index: React.FC<{}> = () => {
  return (
    <UserProvider>
      <Page></Page>
    </UserProvider>
  );
};
export default Index;
