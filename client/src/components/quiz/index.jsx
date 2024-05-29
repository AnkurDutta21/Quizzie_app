import React, { useEffect, useState, useCallback } from "react";
import Timer from "./Timer";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import Loader from "../common/loader";

const AttemptQuiz = () => {
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
        const response = await getApiData(URL + ENDPOINTS.GETQUIZ + quizId);
        setQuiz(response?.data?.quiz);
      } catch (error) {
        console.log(error);
      }
    };
    getQuiz();
  }, []);

  const handleIndex = () => {
    if (index >= quiz.questions.length - 1) {
      submitAnswers(results).then(() => navigate('/quiz/results',{ state: { results,quizId } }));
    } else {
      setIndex((prev) => prev + 1);
      setSelected(null); // Reset selected state
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
    console.log(results);
    navigate('/quiz/results',{ state: { results,quizId } })
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz?.questions[index];

  return (
    <>
      {loading && <Loader />}
      <div className={styles.meta}>
        <p className={styles.count}>
          {index + 1}/{quiz?.questions?.length}
        </p>
      </div>
      <p className={styles.question}>{currentQuestion?.question}</p>
      {currentQuestion?.timer && (
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
    </>
  );
};

export default AttemptQuiz;
