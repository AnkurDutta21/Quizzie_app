import React, { useState } from "react";
import styles from "./styles.module.css";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      correctAnswerIndex: 0,
      options: [{ id: 1, text: "" }, { id: 2, text: "" }],
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (optionIndex, event) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].options[optionIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (event) => {
    const { value } = event.target;
    setCorrectAnswerIndex(parseInt(value, 10));
  };

  const addOption = () => {
    if (questions[currentQuestionIndex].options.length < 4) {
      const newQuestions = [...questions];
      const newOptionId = newQuestions[currentQuestionIndex].options.length + 1;
      newQuestions[currentQuestionIndex].options.push({ id: newOptionId, text: "" });
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
        { question: "", correctAnswerIndex: 0, options: [{ id: 1, text: "" }, { id: 2, text: "" }] },
      ]);
      setCurrentQuestionIndex(questions.length);
    }
  };

  const deleteQuestion = () => {
    if (questions.length > 2) {
      const newQuestions = [...questions];
      newQuestions.splice(currentQuestionIndex, 1);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(currentQuestionIndex === 0 ? 0 : currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(questions);
  };

  const handleIndexClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.viewIndex}>
        {questions.map((question, index) => (
          <div
            key={index}
            className={`${styles.indexContainer} ${currentQuestionIndex === index ? styles.selected : ''}`}
            onClick={() => handleIndexClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.questionsContainer}>
        <div className={styles.questionContainer}>
          <label>Question {currentQuestionIndex + 1}:</label>
          <input
            type="text"
            value={questions[currentQuestionIndex].question}
            name="question"
            onChange={handleQuestionChange}
          />
          <br />
          {questions[currentQuestionIndex].options.map((option, optionIndex) => (
            <div key={option.id}>
              <label>{`Option ${optionIndex + 1}:`}</label>
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(optionIndex, e)}
              />
              <br />
            </div>
          ))}
          <label>Select Correct Answer:</label>
          <select value={correctAnswerIndex} onChange={handleCorrectAnswerChange}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <option key={option.id} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
          <br />
          <br />
        </div>
      </div>
      <div>
        {questions.length < 5 && (
          <button onClick={addQuestion}>Add Question</button>
        )}
        {questions.length > 2 && (
          <button onClick={deleteQuestion}>Delete Question</button>
        )}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CreateQuiz;
