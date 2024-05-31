import React from "react";
import styles from "./styles.module.css";

const AddQuestion = ({ questions, setQuestions, handleQuizTypeChange, errors }) => {

  const quizTypes = ["Q & A", "Poll Type"];
console.log(errors,'123456ttttttt')
  const handleQuizNameChange = (e) => {
    setQuestions({ ...questions, quizName: e.target.value });
  };

  const handleQuizTypeClick = (type) => {
    handleQuizTypeChange(type);
    setQuestions({ ...questions, quizType: type });
  };

  return (
    <div className={styles.addQuestionContainer}>
      <input
        className={styles.quizName}
        type="text"
        placeholder="Quiz Name"
        value={questions.quizName}
        onChange={handleQuizNameChange}
      />
      {errors.quizName && <div className={styles.error}>{errors.quizName}</div>}
      <br />
      <div className={styles.optionWrp}>
        <label>Quiz Type:</label>
        <br />
        {quizTypes.map((type, index) => (
          <div
            key={index}
            className={`${styles.quizTypeButton} ${questions.quizType === type ? styles.selected : ""}`}
            onClick={() => handleQuizTypeClick(type)}
          >
            {type}
          </div>
        ))}
      </div>
      {errors.quizType && <div className={styles.error}>{errors.quizType}</div>}
      <br />
    </div>
  );
};

export default AddQuestion;
