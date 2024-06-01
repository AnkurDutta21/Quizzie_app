import React, { useEffect, useState, useCallback } from "react";
import Timer from "./Timer";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import Loader from "../common/loader";
import { successToast } from "../../utils/showToast";

const AttemptQuiz = ({ isQuiz }) => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { getApiData, loading, error } = useFetchData();
  const [selected, setSelected] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const endpoints = isQuiz ? ENDPOINTS.GETQUIZ : ENDPOINTS.GETPOLL
        const response = await getApiData(URL + endpoints + quizId);
        if (isQuiz) {
          setQuiz(response?.data?.quiz);
        } else {
          setQuiz(response?.data?.poll)
        }
        successToast(response?.message)
      } catch (error) {
        errorToast(error?.response?.data?.error)
      }
    };
    getQuiz();
  }, []);

  const handleIndex = () => {
    if (index >= quiz.questions.length - 1) {
      const quizOrPoll = isQuiz ? 'quiz' : 'poll'
      submitAnswers(results).then(() => navigate(`/${quizOrPoll}/results`, { state: { results, quizId, isQuiz } }));
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
    const quizOrPoll = isQuiz ? 'quiz' : 'poll'
    navigate(`/${quizOrPoll}/results`, { state: { results, quizId, isQuiz } })
  };

  const currentQuestion = quiz?.questions[index];
  return (
    <>
      {loading && <Loader />}
      <div className={styles.quizAttemptContainer}>
        <div className={styles.quizWrp}>
          <p className={styles.count}>
            {index + 1}/{quiz?.questions?.length}
          </p>
        </div>
        <p className={styles.question}>{currentQuestion?.question}</p>
        {currentQuestion?.timer > 0 && isQuiz && (
          <Timer key={index} timer={currentQuestion?.timer} onTimerEnd={handleIndex} />
        )}
        <div className={styles.options}>
          {currentQuestion?.options?.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              className={`${selected === i ? styles.selected : styles.item} ${styles.option}`}
            >
              {item.text && <div className={!isQuiz && currentQuestion?.optionsType === "Text & Image URL" ? styles.textAbsolute : styles.text}>{item.text}</div>}
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
