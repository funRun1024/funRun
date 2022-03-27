import { Button, View } from '@tarojs/components';
import React from 'react';
import styles from './index.module.scss';

interface headerProps {
  left: string;
  right: string;
  setState: Function;
  state: boolean;
}
const Header: React.FC<headerProps> = ({ left, right, setState, state }) => {
  return (
    <View className={styles.head}>
      <View className={styles.box}>
        <Button
          className={state ? styles.active : ''}
          onClick={() => {
            setState(true);
          }}
        >
          {left}
        </Button>
        {state ? <View className={styles.line}></View> : <></>}
      </View>
      <View className={styles.box}>
        <Button
          className={!state ? styles.active : ''}
          onClick={() => {
            setState(false);
          }}
        >
          {right}
        </Button>
        {!state ? <View className={styles.line}></View> : <></>}
      </View>
    </View>
  );
};

export default Header;
