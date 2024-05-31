import React from "react";
import styles from "./styles.module.css";
const StatusCard = ({color,number,smallText,text}) => {
  return (
    <div style={{color:color }} className={styles.statusContainer}>
      <div className={styles.wrap}>
        <p className={styles.number}>{number >1000 ? (number / 1000).toFixed(1) + 'k' : number}</p>
        <p className={styles.text}>{smallText}</p>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default StatusCard;
