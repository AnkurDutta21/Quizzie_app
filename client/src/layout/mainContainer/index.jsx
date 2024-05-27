import React from "react";
import SideNav from "../sideNav";
import styles from "./styles.module.css";

const MainContainer = ({ children }) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <SideNav />
        {children}
      </div>
    </>
  );
};

export default MainContainer;
