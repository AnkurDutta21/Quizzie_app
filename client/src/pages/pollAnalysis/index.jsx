import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import useFetchData from '../../hooks/useFetchData';
import { ENDPOINTS, URL } from '../../utils/apiService';
import { useParams } from 'react-router-dom';
import StatusCard from '../../components/dashboard/statusCard';
import { formatDate } from '../../utils/formatDate';
import Loader from '../../components/common/loader';
import { errorToast, successToast } from '../../utils/showToast';

const PollAnalysis = () => {
  const { pollId } = useParams(); 
  const {getApiData,loading} = useFetchData();
  const [pollData, setPollData] = useState({}); 
  useEffect(() => {
    const apiData = async () => {
      try {
        const response = await getApiData(URL + ENDPOINTS.POLLANALYSIS + pollId);
        setPollData(response?.data?.pollAnalysisData); 
    successToast(response?.message)
      } catch (error) {
        errorToast(error?.response?.data?.error)
      }
    };
    apiData();
  }, [pollId]);

  return(
    <>
    {loading && <Loader/>}
    <div className={styles.container}>
        <div className={styles.headers}>
          <h1>{pollData?.pollName}</h1>
          <div className={styles.meta}>
            <p>Created on: {formatDate(pollData?.createdAt)}</p>
            <p>Impressions: {pollData?.impressions}</p>
          </div>
        </div>

        <div className={styles.questions}>
          {pollData?.questions?.map((item, index) => (
            <div key={item._id} className={styles.question}>
              <h2>
                Q.{index + 1} {item.question}
              </h2>

              <div className={styles.statsCards}>
                {item.options.map((el, index) => (
                  <StatusCard
                    key={el._id}
                    number={el.votes}
                    text={el?.text || 'Option' + " " + (index+1)}
                  />
                ))}
              </div>

              {pollData?.questions.length - 1 !== index && (
                <div className={styles.divider}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      </>
  )
};

export default PollAnalysis;
