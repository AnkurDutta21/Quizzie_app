import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import edit from "../../assets/edit.png";
import share from "../../assets/share.png";
import del from "../../assets/del.png";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import { formatDate } from "../../utils/formatDate";
import { Link } from 'react-router-dom'
import Loader from "../../components/common/loader";
import { errorToast, successToast } from "../../utils/showToast";
import { useModal } from "../../hooks/useModalContext";
import { copyLink } from "../../utils/CopyLink"

const Analytics = () => {
  const { getApiData, deleteApiData, loading, error } = useFetchData();
  const { openModal, closeModal } = useModal()
  const [data, setData] = useState([])
  useEffect(() => {
    const apiData = async () => {
      try {
        const response = await getApiData(URL + ENDPOINTS.ALLPOLLSANDQUIZES)
        setData(response?.data?.data)
        successToast(response?.message)
      } catch (error) {
        errorToast(error?.response?.data?.error)
      }
    };
    apiData()
  }, []);
  const handleDelete = async (id, type) => {
    try {
      const endpoints = type === "quiz" ? ENDPOINTS.DELETE_QUIZ : ENDPOINTS.DELETEPOLL;
      const response = await deleteApiData(URL + endpoints + id);
      successToast(response?.message);
      setData(prevData => prevData?.filter(quiz => quiz.id !== id));
      closeModal();
    } catch (error) {
      errorToast(error?.response?.data?.error);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
          <h2 className={styles.heading}>Quiz Analysis</h2>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>S.No</span>
              <span>Quiz Name</span>
              <span>Created on</span>
              <span>Impression</span>
              <span> </span>
              <span> </span>
            </div>
            {data?.map((quiz, index) => (
              <div key={quiz.id} className={styles.tableRow}>
                <span>{index + 1}</span>
                <span className={styles.name}>{quiz.name}</span>
                <span>{formatDate(quiz.createdAt)}</span>
                <span>{quiz.impressions}</span>
                <div className={styles.actions}>
                  <img src={edit} className={styles.icon} onClick={() => openModal('EDITQUIZ', { id: quiz.id, type: quiz.type, edit: true })} />
                  <img src={del} className={styles.icon} onClick={() => openModal("DELETEQUIZ", {
                    id: quiz.id,
                    type: quiz.type,
                    delete: true,
                    onDelete: () => handleDelete(quiz.id, quiz.type)
                  })
                  } />
                  <img src={share} className={styles.icon} onClick={() => copyLink(quiz.id, quiz.type)} />
                </div>
                <span
                  className={styles.statsLink}>
                   <Link to={`/${quiz.type}Analysis/${quiz.id}`} className={styles.detailsLink}>
                      Question Wise Analysis
                    </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default Analytics;
