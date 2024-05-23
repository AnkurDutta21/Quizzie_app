import React from "react";
import styles from "./styles.module.css";
import spinnerAnimation from '../../../assets/loading.gif'

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <img src={spinnerAnimation} alt="Loading..." className={styles.loadingImage} />
      </div>
    </div>
  );
};

export default Loader;
