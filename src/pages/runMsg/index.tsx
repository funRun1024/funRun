import { View } from '@tarojs/components';
import React, {FC} from 'react';
import styles from './index.module.scss';

interface PropsType {
  distance: number|string;
  time: any;
  speed: number;
}
const RunMsg: FC<PropsType> = ({ distance, time, speed }: PropsType) => {
  const formatSeconds=(value) =>{
    let result:number = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    // @ts-ignore
    result = `${h}:${m}:${s}`
    return result
  }

  return (
    <View>
      <View className={styles.runMsg}>
        <View className={styles.run}>{distance}km</View>
        <View className={styles.run}>{formatSeconds(time)}</View>
        <View className={styles.run}>{7.2}km/h</View>
      </View>
    </View>
  );
};
export default RunMsg;
