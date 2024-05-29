import React from "react";
import styles from "./styles.module.css";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import { errorToast, successToast } from "../../utils/showToast";
import { useModal } from "../../hooks/useModalContext";

const DeleteQuiz = () => {
  const { deleteApiData } = useFetchData();
  const { closeModal, modalState } = useModal();

  const handleDelete = async () => {
    try {
      const endpoints =
        modalState.modalData.type === "quiz"
          ? ENDPOINTS.DELETE_QUIZ
          : ENDPOINTS.DELETEPOLL;
      const response = await deleteApiData(
        URL + endpoints + modalState.modalData.id
      );
      console.log(response);
      successToast(response?.message);
      closeModal();
    } catch (error) {
      console.error(error);
      errorToast(error?.response?.data?.error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.headerText}>Are you sure you want to delete?</h2>
      <div className={styles.btnsWrp}>
        <button className={styles.delModalBtn} onClick={handleDelete}>
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
