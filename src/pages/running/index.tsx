import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { memo, useEffect, useRef, useState } from 'react';
import RunMsg from '../runMsg';
import styles from './index.module.scss';
import start from '../../images/start.png';
import cut from '../../images/cut.png';
import end from '../../images/end.png';
import lock from '../../images/lock.png';
import pause from '../../images/pause.png';
import lockOpen from '../../images/lockOpen.png';

interface RunningProps {
  data: {
    speed: number;
    distance: number;
    time: number;
  };
  // finish:()=>void;
  person: boolean;
  state: boolean;
  changeState: any;
}

const Running = memo((props: RunningProps) => {
  // console.log('props',props);
  const {
    data: { distance }
  } = props;
  const {
    data: { time, speed }
  } = props;
  const [isLock, setLock] = useState<boolean>(false);
  const sex = useRef(props.person);
  const handleLock = () => {
    setLock(!isLock);
  };
  const finishRun = () => {
    // props.finish()
    console.log(time);

    Taro.navigateTo({
      url: `../result/index?time=${time}&&distance=${(distance / 1000).toFixed(
        2
      )}`
    });
  };

  return (
    <>
      <RunMsg
        distance={(distance / 1000).toFixed(2)}
        time={time}
        speed={speed}
      ></RunMsg>
      {sex.current ? (
        <View
          className={styles.woman + ` ${props.state ? styles.running : ''}`}
        ></View>
      ) : (
        <View
          className={styles.man + ` ${props.state ? styles.running : ''}`}
        ></View>
      )}

      <View style={isLock ? { display: 'none' } : { display: 'block' }}>
        <View className={styles.pause} onClick={props.changeState}>
          <Image src={props.state ? pause : start}></Image>
        </View>
        <View className={styles.cut}>
          <Image src={cut}></Image>
        </View>
        <View className={styles.end}>
          <Image
            src={end}
            onClick={() => {
              finishRun();
            }}
          ></Image>
        </View>
      </View>

      <View className={styles.lock} onClick={() => handleLock()}>
        <Image src={isLock ? lock : lockOpen}></Image>
      </View>
    </>
  );
});

export default Running;
