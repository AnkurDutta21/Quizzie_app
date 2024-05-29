import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import edit from "../../assets/edit.png";
import share from "../../assets/share.png";
import del from "../../assets/del.png";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import { formatDate } from "../../utils/formatDate";
import {Link} from 'react-router-dom'
import Loader from "../../components/common/loader";
import { errorToast, successToast } from "../../utils/showToast";


const Analytics = () => {
  const { getApiData,loading,error } = useFetchData();
  const [data,setData] = useState([])
  useEffect(() => {
    const apiData = async () => {
      try {
        const response = await getApiData(URL+ENDPOINTS.ALLPOLLSANDQUIZES)
        setData(response?.data)
        successToast(response?.message)
      } catch (error) {
        errorToast(error?.response?.data?.error)
      }
    };
    apiData()
  }, []);

  return (
    <>
    {loading && <Loader/>}
    <div className={styles.container}>
      <div className={styles.analyticsWrp}>
      <h2 className={styles.heading}>Quiz Analysis</h2>
      <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Created on</th>
              <th>Impression</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
        <tbody>
          {data?.data?.map((quiz, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{quiz.name}</td>
              <td>{formatDate(quiz.createdAt)}</td>
              <td>{quiz.impressions}</td>
              <td className={styles.iconWrp}>
                <img src={edit} className={styles.icon} />
                <img src={del} className={styles.icon} />
                <img src={share} className={styles.icon} />
              </td>
              <td>
                <Link to={`/${quiz.type}Analysis/${quiz.id}`} className={styles.detailsLink}>
                  Question Wise Analysis
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default Analytics;
