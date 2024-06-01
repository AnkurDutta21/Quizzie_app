import React, { useState } from "react";
import styles from "./styles.module.css";
import del from "../../../assets/del.png";

const AddQuiz = ({
  questions,
  setQuestions,
  errors,
  isSubmitted,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  quizDetails,
}) => {
  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (optionIndex, e, field) => {
    const { value } = e.target;
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].options[optionIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].answer = index;
    setQuestions(newQuestions);
  };

  const addOption = () => {
    if (questions?.[currentQuestionIndex]?.options.length < 4) {
      const newQuestions = [...questions];
      const newOptionId = newQuestions[currentQuestionIndex].options.length + 1;
      newQuestions[currentQuestionIndex].options.push({
        id: newOptionId,
        text: "",
        image: "",
      });
      setQuestions(newQuestions);
    }
  };

  const deleteOption = (optionIndex) => {
    if (questions?.[currentQuestionIndex]?.options.length > 2) {
      const newQuestions = [...questions];
      newQuestions[currentQuestionIndex].options.splice(optionIndex, 1);
      setQuestions(newQuestions);
    }
  };

  const addQuestion = () => {
    if (questions?.length < 5) {
      setQuestions([
        ...questions,
        {
          question: "",
          optionsType: "",
          answer: 0,
          options: [
            { id: 1, text: "", image: "" },
            { id: 2, text: "", image: "" },
          ],
          timer: 0,
        },
      ]);
      setCurrentQuestionIndex(questions.length);
    }
  };

  const deleteQuestion = () => {
    if (questions?.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(currentQuestionIndex, 1);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(
        currentQuestionIndex === 0 ? 0 : currentQuestionIndex - 1
      );
    }
  };

  const handleTimerOptionChange = (milliseconds) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].timer = milliseconds;
    setQuestions(newQuestions);
  };

  const handleOptionTypeChange = (type) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].optionsType = type;
    setQuestions(newQuestions);
  };

  const handleIndexClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const optionsType = ["Text", "Image URL", "Text & Image URL"];
  const timers = [
    { label: "OFF", value: 0 },
    { label: "5 sec", value: 5000 },
    { label: "10 sec", value: 10000 },
  ];

  return (
    <div className={styles.quizContainer}>
      <div className={styles.viewIndex}>
        {questions?.map((question, index) => (
          <div
            key={index}
            className={`${styles.indexContainer} ${
              currentQuestionIndex === index ? styles.selected : ""
            }`}
            onClick={() => handleIndexClick(index)}
          >
            {index + 1}
            {index + 1 > 1 && (
              <div
                className={styles.delIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuestion();
                }}
              >
                x
              </div>
            )}
          </div>
        ))}
        {questions?.length < 5 && (
          <div className={styles.addIndex} onClick={addQuestion}>
            +
          </div>
        )}
      </div>
      <div className={styles.questionsContainer}>
        <div className={styles.questionContainer}>
          <input
            type="text"
            placeholder="Quiz Question"
            name="question"
            value={questions?.[currentQuestionIndex]?.question ?? ""}
            onChange={handleQuestionChange}
          />
          {isSubmitted && errors?.[currentQuestionIndex]?.question && (
            <div className={styles.error}>
              {errors[currentQuestionIndex].question}
            </div>
          )}
          <div className={styles.optionTypesWrp}>
            <label>Option Type:</label>
            {optionsType.map((type, index) => (
              <div key={index} className={styles.optionType}>
                <input
                  type="radio"
                  name={`optionType-${currentQuestionIndex}`}
                  checked={questions?.[currentQuestionIndex]?.optionsType === type}
                  onChange={() => handleOptionTypeChange(type)}
                />
                <label>{type}</label>
              </div>
            ))}
          </div>
          {isSubmitted && errors?.[currentQuestionIndex]?.optionsType && (
            <div className={styles.error}>
              {errors[currentQuestionIndex].optionsType}
            </div>
          )}
          <div className={styles.optionsWrp}>
            {questions?.[currentQuestionIndex]?.options.map(
              (option, optionIndex) => (
                <div key={option.id} className={styles.optionFlex}>
                  <div className={styles.optionContainer}>
                    {quizDetails?.quizType !== "Poll Type" && (
                      <input
                        type="radio"
                        name={`correctAnswer-${currentQuestionIndex}`}
                        checked={
                          questions?.[currentQuestionIndex]?.answer ===
                          optionIndex
                        }
                        onChange={() => handleCorrectAnswerChange(optionIndex)}
                        className={`${
                          questions?.[currentQuestionIndex]?.answer ===
                            optionIndex && quizDetails?.quizType !== "Poll Type"
                            ? styles.correctOptionRadio
                            : ""
                        }`}
                      />
                    )}
                    {questions?.[currentQuestionIndex]?.optionsType !==
                      "Image URL" && (
                      <input
                        type="text"
                        placeholder="Text"
                        value={option?.text ?? ""}
                        onChange={(e) =>
                          handleOptionChange(optionIndex, e, "text")
                        }
                        className={`${
                          questions?.[currentQuestionIndex]?.answer ===
                            optionIndex && quizDetails?.quizType !== "Poll Type"
                            ? styles.correctOptionInput
                            : ""
                        }`}
                      />
                    )}
                    {(questions?.[currentQuestionIndex]?.optionsType ===
                      "Image URL" ||
                      questions?.[currentQuestionIndex]?.optionsType ===
                        "Text & Image URL") && (
                      <input
                        type="text"
                        placeholder="URL"
                        value={option?.image ?? ""}
                        onChange={(e) =>
                          handleOptionChange(optionIndex, e, "image")
                        }
                        className={`${
                          questions?.[currentQuestionIndex]?.answer ===
                            optionIndex && quizDetails?.quizType !== "Poll Type"
                            ? styles.correctOptionInput
                            : ""
                        }`}
                      />
                    )}
                    <br />
                    {questions?.[currentQuestionIndex]?.options.length > 2 &&
                      optionIndex > 1 && (
                        <button
                          onClick={() => deleteOption(optionIndex)}
                          className={styles.deleteButton}
                        >
                          <img src={del} alt="delete" />
                        </button>
                      )}
                  </div>
                  {isSubmitted &&
                    errors?.[currentQuestionIndex]?.options?.[optionIndex] && (
                      <div
                        className={`${styles.error} ${styles.absoluteErrors}`}
                      >
                        {Object.values(
                          errors[currentQuestionIndex].options[optionIndex]
                        ).join(", ")}
                      </div>
                    )}
                </div>
              )
            )}
          </div>
          {isSubmitted && errors?.[currentQuestionIndex]?.options && (
            <div className={styles.error}>{errors.options}</div>
          )}
          <button
            className={styles.addOptionBtn}
            onClick={addOption}
            type="button"
          >
            Add Option
          </button>
          {quizDetails?.quizType !== "Poll Type" && (
            <div className={styles.timerWrp}>
              <label htmlFor="Timer">Timer</label>
              {timers.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.timerOption} ${
                    questions?.[currentQuestionIndex]?.timer === option.value
                      ? styles.selectedTimerOption
                      : ""
                  }`}
                  onClick={() => handleTimerOptionChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
