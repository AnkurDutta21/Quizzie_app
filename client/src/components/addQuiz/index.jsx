import React, { useState } from "react";
import styles from "./styles.module.css";
import del from "../../assets/del.png";
const AddQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      optionType: "",
      correctAnswerIndex: 0,
      options: [
        { id: 1, text: "" },
        { id: 2, text: "" },
      ],
      timerOption: 0,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (optionIndex, e) => {
    const { value } = e.target;
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].options[optionIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].correctAnswerIndex = index;
    setQuestions(newQuestions);
  };

  const addOption = () => {
    if (questions[currentQuestionIndex].options.length < 4) {
      const newQuestions = [...questions];
      const newOptionId = newQuestions[currentQuestionIndex].options.length + 1;
      newQuestions[currentQuestionIndex].options.push({
        id: newOptionId,
        text: "",
      });
      setQuestions(newQuestions);
    }
  };

  const deleteOption = (optionIndex) => {
    if (questions[currentQuestionIndex].options.length > 2) {
      const newQuestions = [...questions];
      newQuestions[currentQuestionIndex].options.splice(optionIndex, 1);
      setQuestions(newQuestions);
    }
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        {
          question: "",
          correctAnswerIndex: 0,
          options: [
            { id: 1, text: "" },
            { id: 2, text: "" },
          ],
          timerOption: 0,
        },
      ]);
      setCurrentQuestionIndex(questions.length);
    }
  };

  const deleteQuestion = () => {
    if (questions.length > 1) {
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
    newQuestions[currentQuestionIndex].timerOption = milliseconds;
    setQuestions(newQuestions);
  };
  const handleOptionTypeChange = (type) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].optionType = type;
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(questions);
  };

  const handleIndexClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const optionType = ["Text", "Image URL", "Text & Image URL"];
  const timerOptions = [
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
            placeholder="Poll Question"
            value={questions[currentQuestionIndex].question}
            onChange={handleQuestionChange}
          />
          {/*optionsTypes-------------  */}
          <div className={styles.optionTypesWrp}>
            <label>Option Type:</label>
            {optionType.map((type, index) => (
              <div key={index} className={styles.optionType}>
                <input
                  type="radio"
                  id={`optionType-${index}`}
                  name="optionType"
                  value={type}
                  checked={questions[currentQuestionIndex].optionType === type}
                  onChange={() => handleOptionTypeChange(type)}
                />
                <label>{type}</label>
              </div>
            ))}
          </div>
          {/*  */}

          {/* options---------------- */}

          {questions[currentQuestionIndex].options.map(
            (option, optionIndex) => (
              <div key={option.id} className={styles.optionContainer}>
                <input
                  type="radio"
                  name={`correctAnswer-${currentQuestionIndex}`}
                  checked={
                    questions[currentQuestionIndex].correctAnswerIndex ===
                    optionIndex
                  }
                  onChange={() => handleCorrectAnswerChange(optionIndex)}
                />
                <input
                  type="text"
                  placeholder="Text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(optionIndex, e)}
                />
                {questions[currentQuestionIndex].options.length > 2 && (
                  <button
                    onClick={() => deleteOption(optionIndex)}
                    className={styles.deleteButton}
                  >
                    <img src={del} alt="delete" />
                  </button>
                )}
              </div>
            )
          )}
          <button className={styles.addOptionBtn} onClick={() => addOption()}>
            Add Option
          </button>
          {/*  */}
          {/* timer--------------- */}
          <div className={styles.timerWrp}>
            <label htmlFor="Timer">Timer</label>
            {timerOptions.map((option, index) => (
              <div
                key={index}
                className={`${styles.timerOption} ${
                  questions[currentQuestionIndex].timerOption === option.value
                    ? styles.selectedTimerOption
                    : ""
                }`}
                onClick={() => handleTimerOptionChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
          {/* --------------------- */}
        </div>
      </div>
      <button onClick={handleSubmit} className={styles.createQuizButton}>
        Create Quiz
      </button>
    </div>
  );
};

export default AddQuiz;
