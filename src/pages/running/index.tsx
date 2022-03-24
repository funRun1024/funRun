import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { memo, useRef, useState } from 'react';
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
    distance: string;
    time: number;
  };
  person: boolean;
  state: boolean;
  changeState: any;
}
const Running = memo((props: RunningProps) => {
  const [isLock, setLock] = useState<boolean>(false);
  const sex = useRef(props.person);
  const handleLock = () => {
    setLock(!isLock);
  };
  return (
    <>
      <RunMsg distance={0} time={0} speed={0}></RunMsg>
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
              Taro.navigateTo({
                url: '../result/index'
              });
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
