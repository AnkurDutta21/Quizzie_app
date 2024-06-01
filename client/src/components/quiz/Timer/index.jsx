import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useTimer } from '@mzaleski/use-timer';

export default function Timer({ timer, onTimerEnd }) {
  const { timeRemaining}= useTimer(timer/1000, false);
  useEffect(() => {
    const interval = setInterval(() => {
      onTimerEnd();
    }, timer);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className={styles.timer}>
      <p>{timeRemaining}s</p>
    </div>
  );
}
