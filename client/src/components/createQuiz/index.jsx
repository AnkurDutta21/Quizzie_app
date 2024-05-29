import React, { useState } from "react";
import styles from "./styles.module.css";
import AddQuiz from "./addQuiz";
import AddQuestion from "./addQuestion";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";

const CreateQuiz = ({closeModal}) => {
  const { postApiData } = useFetchData();

  const [quizDetails, setQuizDetails] = useState({
    quizName: "",
    quizType: "",
  });

  const [questions, setQuestions] = useState([
    {
      question: "",
      optionType: "",
      correctAnswerIndex: 0,
      options: [
        { id: 1, text: "", url: "" },
        { id: 2, text: "", url: "" },
      ],
      timerOption: 0,
    },
  ]);

  const [errors, setErrors] = useState({});
  const [next, setNext] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validateFields = () => {
    const errors = {};
    if (!quizDetails.quizName.trim()) {
      errors.quizName = "Quiz name is required";
    }
    if (!quizDetails.quizType) {
      errors.quizType = "Quiz type is required";
    }
    return errors;
  };

  const validateQuestion = () => {
    const newErrors = {};
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion.question.trim()) {
      newErrors.question = "Question text is required.";
    }

    if (currentQuestion.options.some((option) => !option.text.trim())) {
      newErrors.options = "All options must have text.";
    }

    if (
      currentQuestion.correctAnswerIndex < 0 ||
      currentQuestion.correctAnswerIndex >= currentQuestion.options.length
    ) {
      newErrors.correctAnswer = "A correct answer must be selected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setNext(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleQuizTypeChange = (type) => {
    setQuizDetails({ ...quizDetails, quizType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateQuestion()) {
      const addQuizData = {
        quizName: quizDetails.quizName,
        questions: questions.map((question) => ({
          question: question.question,
          optionsType: question.optionType,
          options: question.options.map((option) => ({
            text: option.text,
            image: option.url,
          })),
          answer: question.correctAnswerIndex,
          timer: question.timerOption,
        })),
      };
      const data = await postApiData(URL + ENDPOINTS.CREATE_QUIZ, addQuizData);
      console.log(data);
      console.log("Mapped object:", addQuizData);
    }
  };

  return (
    <div className={styles.createQuiz}>
      <form onSubmit={handleSubmit}>
        {!next ? (
          <AddQuestion
            handleQuizTypeChange={handleQuizTypeChange}
            questions={quizDetails}
            setQuestions={setQuizDetails}
            errors={errors}
          />
        ) : (
          <AddQuiz
            handleSubmit={handleSubmit}
            questions={questions}
            setQuestions={setQuestions}
            errors={errors}
            isSubmitted={isSubmitted}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        )}
        <div className={styles.btnsWrp}>
          <button type="button" onClick={() => closeModal()}>
            Cancel
          </button>
          {!next ? (
            <button
              type="button"
              className={styles.nextBtn}
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button type="submit">Create Quiz</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
