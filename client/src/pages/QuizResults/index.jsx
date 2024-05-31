import { useEffect, useState, useCallback } from 'react';
import trophy from '../../assets/tropy.png';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { ENDPOINTS, URL } from '../../utils/apiService';

const QuizResults = () => {
  const location = useLocation();
  const { postApiData } = useFetchData();
  const { results, quizId, isQuiz } = location.state || {};
  const [score, setScore] = useState({});

  const attemptQuiz = useCallback(async () => {
    try {
      const endpoint = isQuiz ? ENDPOINTS.ATTEMPTQUIZ : ENDPOINTS.ATTEMPTPOLL;
      const response = await postApiData(`${URL}${endpoint}${quizId}`, { results });
      setScore(response?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (quizId && results) {
      attemptQuiz();
    }
  }, [quizId, results, attemptQuiz]);
console.log(isQuiz,'qwertyu')
  return (
    <div>
      {isQuiz ? (
        <div>
          <h1>Congrats, the quiz is complete!</h1>
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
