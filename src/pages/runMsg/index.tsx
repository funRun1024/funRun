import { View } from '@tarojs/components';
import React, { FC } from 'react';
import styles from './index.module.scss';

interface PropsType {
  distance: number;
  time: any;
  speed: number;
}
const RunMsg: FC<PropsType> = ({ distance, time, speed }: PropsType) => {
  return (
    <View>
      <View className={styles.runMsg}>
        <View className={styles.run}>{distance}km</View>
        <View className={styles.run}>{time}</View>
        <View className={styles.run}>{speed}km/h</View>
      </View>
    </View>
  );
};
export default RunMsg;
