import React from "react";
import SideNav from "../sideNav";
import styles from "./styles.module.css";
import Modal from "../../components/common/modal/Modal";

const MainContainer = ({ children }) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <SideNav />
        <div className={styles.mainContainerWrp}>{children}</div>
        <Modal/>
      </div>
    </>
  );
};

export default MainContainer;
