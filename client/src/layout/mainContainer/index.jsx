import React from "react";
import SideNav from "../sideNav";
import styles from "./styles.module.css";
import useModal from "../../hooks/useModal";
import Modal from "../../components/common/modal/Modal";

const MainContainer = ({ children }) => {
  const { modalState, openModal, closeModal } = useModal();
  return (
    <>
      <div className={styles.mainContainer}>
        <SideNav openModal={openModal} closeModal={closeModal}/>
        <div className={styles.mainContainerWrp}>{children}</div>
        <Modal modalState={modalState} closeModal={closeModal}/>
      </div>
    </>
  );
};

export default MainContainer;
