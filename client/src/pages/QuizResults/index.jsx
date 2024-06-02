import { useEffect, useState, useCallback } from 'react';
import trophy from '../../assets/tropy.png';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { ENDPOINTS, URL } from '../../utils/apiService';
import { successToast } from '../../utils/showToast';
import Loader from '../../components/common/loader';

const QuizResults = () => {
  const location = useLocation();
  const { postApiData,loading,error } = useFetchData();
  const { results, quizId, isQuiz } = location.state || {};
  const [score, setScore] = useState({});

  const attemptQuiz = useCallback(async () => {
    try {
      const endpoint = isQuiz ? ENDPOINTS.ATTEMPTQUIZ : ENDPOINTS.ATTEMPTPOLL;
      const response = await postApiData(`${URL}${endpoint}${quizId}`, { results });
      setScore(response?.data);
      successToast(response?.message)
    } catch (error) {
      errorToast(error?.response?.data?.error)
    }
  }, []);

  useEffect(() => {
    if (quizId && results) {
      attemptQuiz();
    }
  }, [quizId, results, attemptQuiz]);


  return (
    <div>
      {loading && <Loader />}
      {isQuiz ? (
        <div className={styles.container}>
          <h1>Congrats Quiz is complete!</h1>
          <div className="image">
            <img src={trophy} alt="Trophy" />
          </div>
          {score && (
            <h1>
              Your score is{' '}
              <span className={styles.score}>
                {score.corrects}/{score.totalQuestions}
              </span>
            </h1>
          )}
        </div>
      ) : (
        <div className={styles.main}>Thank you for participating in the poll</div>
      )}
    </div>
  );
};

export default QuizResults;
