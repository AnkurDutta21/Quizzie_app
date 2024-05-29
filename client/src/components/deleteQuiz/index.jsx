import React from 'react';
import styles from './styles.module.css';
import useFetchData from '../../hooks/useFetchData';
import { ENDPOINTS, URL } from '../../utils/apiService';
import { errorToast, successToast } from '../../utils/showToast';

const DeleteQuiz = ({ closeModal,modalData }) => {
    const {deleteApiData} = useFetchData()
    const handleDelete = async()=>{
        console.log(modalData,'poiuy')
       try {
        const response = await deleteApiData(URL+ENDPOINTS.DELETE_QUIZ + modalData)
        successToast(response?.message)
       } catch (error) {
        errorToast(error?.response?.data?.error)
       }
    }
  return (
    <div className={styles.container}>
      <h2>Are you sure you want to delete?</h2>
      <div className={styles.btnsWrp}>
        <button className={styles.delModalBtn} onClick={()=>handleDelete}>
          Delete
        </button>
        <button className={styles.cancelModalBtn} onClick={()=>closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteQuiz;
