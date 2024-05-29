import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import AddQuiz from "./addQuiz";
import AddQuestion from "./addQuestion";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import { useModal } from "../../hooks/useModalContext";

const CreateQuiz = () => {
  const { postApiData, patchApiData, getApiData } = useFetchData();
  const { closeModal, modalState } = useModal();
  const { id, type, edit } = modalState.modalData;

  const [quizDetails, setQuizDetails] = useState({
    quizName: "",
    quizType: "",
  });

  const [questions, setQuestions] = useState([
    {
      question: "",
      optionsType: "",
      correctAnswerIndex: 0,
      options: [
        { id: 1, text: "", url: "" },
        { id: 2, text: "", url: "" },
      ],
      timer: 0,
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
    if (!currentQuestion.optionsType) {
      newErrors.optionsType = "Option type must be selected.";
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
        [quizDetails.quizType === "Poll Type" ? "pollName" : "quizName"]:
          quizDetails.quizName,
        questions: questions.map((question) => ({
          question: question.question,
          optionsType: question.optionsType,
          options: question.options.map((option) => ({
            text: option.text,
            image: option.url,
          })),
          answer: question.correctAnswerIndex,
          timer: question.timer,
        })),
      };

      const endpoint = edit
        ? `${URL}${type === 'quiz' ? ENDPOINTS.UPDATEQUIZ : ENDPOINTS.UPDATEPOLL}${id}`
        : quizDetails.quizType === "Poll Type"
        ? URL + ENDPOINTS.CREATEPOLL
        : URL + ENDPOINTS.CREATE_QUIZ;

      const data = edit
        ? await patchApiData(endpoint, addQuizData)
        : await postApiData(endpoint, addQuizData);

      console.log(data);
      console.log("Mapped object:", addQuizData);
    }
  };

  useEffect(() => {
    const editData = async () => {
      try {
        const endpoint = type === 'quiz' ? ENDPOINTS.GETQUIZ : ENDPOINTS.GETPOLL;
        const response = await getApiData(`${URL}${endpoint}${id}`);
        console.log(response?.data?.quiz);

        setQuizDetails({
          quizName: response?.data?.quiz?.quizName || response?.data?.quiz?.pollName || "",
          quizType: type === 'quiz' ? "Quiz Type" : "Poll Type",
        });
        setQuestions(response?.data?.quiz?.questions || []);
        console.log(response?.data?.quiz?.questions)
      } catch (error) {
        console.log(error);
      }
    };

    if (edit) {
      editData();
    }
  }, []);

  return (
    <div className={styles.createQuiz}>
      <form onSubmit={handleSubmit}>
        {!next && !edit ? (
          <AddQuestion
            handleQuizTypeChange={handleQuizTypeChange}
            questions={quizDetails}
            setQuestions={setQuizDetails}
            errors={errors}
          />
        ) : (
          <AddQuiz
            quizDetails={quizDetails}
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
            <button type="submit">{edit ? "Update Quiz" : "Create Quiz"}</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
