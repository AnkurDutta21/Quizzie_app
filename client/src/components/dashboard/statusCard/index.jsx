import React from "react";
import styles from "./styles.module.css";
const StatusCard = ({color,number,smallText,text}) => {
  const formatNumber = (num) => {
    if (num < 10) {
      return `0${num}`;
    } else if (num > 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div style={{color:color }} className={styles.statusContainer}>
      <div className={styles.wrap}>
        <p className={styles.number}>{formatNumber(number)}</p>
        <p className={styles.text}>{smallText}</p>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default StatusCard;
