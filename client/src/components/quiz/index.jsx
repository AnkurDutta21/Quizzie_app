import React, { useEffect, useState, useCallback } from "react";
import Timer from "./Timer";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import Loader from "../common/loader";

const AttemptQuiz = ({isQuiz}) => {
  console.log(isQuiz,'pppppppppp')
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { getApiData,loading, error } = useFetchData();
  const [selected, setSelected] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const endpoints = isQuiz ? ENDPOINTS.GETQUIZ :ENDPOINTS.GETPOLL
        const response = await getApiData(URL + endpoints + quizId);
        if(isQuiz){
          setQuiz(response?.data?.quiz);
        }else{
          setQuiz(response?.data?.poll)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getQuiz();
  }, []);

  const handleIndex = () => {
    if (index >= quiz.questions.length - 1) {
      const quizOrPoll = isQuiz ? 'quiz' : 'poll'
      submitAnswers(results).then(() => navigate(`/${quizOrPoll}/results`,{ state: { results,quizId,isQuiz } }));
    } else {
      setIndex((prev) => prev + 1);
      setSelected(null);
    }
  };

  const addResult = (result) => {
    setResults((prevResults) => {
      const existingResultIndex = prevResults.findIndex(
        (res) => res.questionId === result.questionId
      );

      if (existingResultIndex !== -1) {
        prevResults[existingResultIndex] = result;
      } else {
        prevResults.push(result);
      }

      return [...prevResults];
    });
  };

  const handleSelect = (optionIndex) => {
    const currentQuestion = quiz.questions[index];
    const result = { questionId: currentQuestion?._id, selectedOption: optionIndex };
    addResult(result);
    setSelected(optionIndex);
  };

  const submitAnswers = async () => {
    console.log(results,isQuiz,'sdsdsdsd');
    const quizOrPoll = isQuiz ? 'quiz' : 'poll'
    navigate(`/${quizOrPoll}/results`,{ state: { results,quizId,isQuiz } })
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz?.questions[index];
console.log(currentQuestion)
  return (
    <>
      {loading && <Loader />}
      <div className={styles.quizAttemptContainer}>
      <div className={styles.meta}>
        <p className={styles.count}>
          {index + 1}/{quiz?.questions?.length}
        </p>
      </div>
      <p className={styles.question}>{currentQuestion?.question}</p>
      {currentQuestion?.timer && isQuiz && (
        <Timer key={index} timer={currentQuestion.timer} onTimerEnd={handleIndex} />
      )}
      <div className={styles.options}>
        {currentQuestion?.options?.map((item, i) => (
          <div
            key={i}
            onClick={() => handleSelect(i)}
            className={`${selected === i ? styles.selected : ""} ${styles.option}`}
          >
            {item.text && <div>{item.text}</div>}
            {item.image && (
              <div className={styles.image}>
                <img src={item.image} alt="option" />
              </div>
            )}
          </div>
        ))}
      </div>
      <button className={styles.quizBtn} onClick={handleIndex}>
        {index >= quiz?.questions?.length - 1 ? "Submit" : "Next"}
      </button>
      </div>
    </>
  );
};

export default AttemptQuiz;
