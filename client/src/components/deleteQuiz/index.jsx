import React from "react";
import styles from "./styles.module.css";
import { useModal } from "../../hooks/useModalContext";

const DeleteQuiz = () => {
  const { closeModal, modalState } = useModal();
  const { onDelete } = modalState.modalData;

  const handleDelete = async () => {
    if (onDelete) {
      console.log(onDelete)
      await onDelete();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.headerText}>Are you sure you want to delete?</h2>
      <div className={styles.btnsWrp}>
        <button className={styles.delModalBtn} onClick={()=>handleDelete()}>
          Delete
        </button>
        <button className={styles.cancelModalBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteQuiz;
