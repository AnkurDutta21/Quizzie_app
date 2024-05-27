import React, { useState } from "react";
import styles from "./styles.module.css";

const AddQuestion = () => {
  const [questions, setQuestions] = useState({
    quizName: "",
    quizType: "",
  });

  const quizTypes = ["Q & A", "Poll Type"];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(questions);
  };

  const handleQuizTypeChange = (type) => {
    setQuestions({ ...questions, quizType: type });
  };

  return (
    <div className={styles.questionContainer}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.quizName}
          type="text"
          placeholder="Quiz Name"
          value={questions.quizName}
          onChange={(e) =>
            setQuestions({ ...questions, quizName: e.target.value })
          }
        />
        <br />
        <div className={styles.optionWrp}>
          <label>Quiz Type:</label>
          <br />
          {quizTypes.map((type, index) => (
            <div
              key={index}
              className={`${styles.quizTypeButton} ${
                questions.quizType === type ? styles.selected : ""
              }`}
              onClick={() => handleQuizTypeChange(type)}
            >
              {type}
            </div>
          ))}
        </div>
        <br />
        <div className={styles.btnsWrp}>
        <button >Cancel</button>
        <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
