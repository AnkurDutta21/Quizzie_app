import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import useFetchData from '../../hooks/useFetchData';
import { ENDPOINTS, URL } from '../../utils/apiService';
import { useParams } from 'react-router-dom';
import StatusCard from '../../components/dashboard/statusCard';
import { formatDate } from '../../utils/formatDate';
import Loader from '../../components/common/loader';

const QuizAnalysis = () => {
  const { quizId } = useParams(); // Destructuring useParams directly
  const {getApiData,loading} = useFetchData();
  const [quizData, setQuizData] = useState({}); // Initialize with an object instead of an array

  useEffect(() => {
    const apiData = async () => {
      try {
        const response = await getApiData(URL + ENDPOINTS.QUIZANALYSIS + quizId);
        setQuizData(response?.data?.quizAnalysisData); // Assuming the response is an object containing data
        console.log(response, '[[[');
        console.log(quizData, 'pppp');
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    apiData();
  }, [quizId]); // Add quizId to dependency array

  return(
    <>
    {loading && <Loader/>}
    <div className={styles.container}>
        <div className={styles.headers}>
          <h1>{quizData.quizName} Question Analysis</h1>
          <div className={styles.meta}>
            <p>Created on: {formatDate(quizData.createdAt)}</p>
            <p>Impressions: {quizData.impressions}</p>
          </div>
        </div>

        <div className={styles.questions}>
          {quizData?.questions?.map((q, index) => (
            <div key={index} className={styles.question}>
              <h2>
                Q.{index + 1} {q.question}
              </h2>

              <div className={styles.statsCards}>
                <StatusCard
                  number={q.attempts}
                  text={'People attempted the question'}
                />
                <StatusCard
                  number={q.corrects}
                  text="People ansewerd correctly"
                />
                <StatusCard
                  number={q.incorrect}
                  text={'People answered incorrectly'}
                />
              </div>

              {/* {quizData.questions.length - 1 !== index && (
                <div className={styles.divider}></div>
              )} */}
            </div>
          ))}
        </div>
      </div>
      </>
  )
};

export default QuizAnalysis;
