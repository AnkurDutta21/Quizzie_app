import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import AddQuiz from "./addQuiz";
import AddQuestion from "./addQuestion";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import { useModal } from "../../hooks/useModalContext";
import { questionSchema, quizDetailsSchema } from "../../utils/validations";
import CopyLink from "./copyLink";
import { errorToast, successToast } from "../../utils/showToast";
import Loader from "../common/loader";

const CreateQuiz = () => {
  const { postApiData, patchApiData, getApiData, loading } = useFetchData();
  const { closeModal, modalState } = useModal();
  const { modalData } = modalState;
  const { id, type, edit } = modalData;

  const [quizDetails, setQuizDetails] = useState({
    quizName: "",
    quizType: "",
  });

  const [questions, setQuestions] = useState([
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

  const [errors, setErrors] = useState({});
  const [next, setNext] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState([]);
  const [viewLink, setViewLink] = useState(false);

  const validateFields = async () => {
    try {
      await quizDetailsSchema.validate(quizDetails, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(err);
      }
      return false;
    }
  };

  const validateQuestion = async () => {
    try {
      await questionSchema.validate(questions[currentQuestionIndex], {
        abortEarly: false,
      });
      setErrors({});
      return true;
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(err);
      }
      return false;
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (await validateFields()) {
      setNext(true);
    }
  };

  const handleQuizTypeChange = (type) => {
    setQuizDetails({ ...quizDetails, quizType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (await validateQuestion()) {
      const addQuizData = {
        [quizDetails.quizType === "Poll Type" ? "pollName" : "quizName"]:
          quizDetails.quizName,
        questions: questions.map((question) => ({
          question: question.question,
          optionsType: question.optionsType,
          options: question.options.map((option) => ({
            text: option.text,
            image: option.image,
          })),
          answer: question.answer,
          timer: question.timer,
        })),
      };

      try {
        const endpoint = edit
          ? `${URL}${type === "quiz" ? ENDPOINTS.UPDATEQUIZ : ENDPOINTS.UPDATEPOLL}${id}`
          : quizDetails.quizType === "Poll Type"
            ? URL + ENDPOINTS.CREATEPOLL
            : URL + ENDPOINTS.CREATE_QUIZ;


        const data = edit
          ? await patchApiData(endpoint, addQuizData)
          : await postApiData(endpoint, addQuizData);

        const resultData = data?.data?.quiz || data?.data?.poll;
        setResult(resultData);
        setViewLink(true);
        successToast(data.message);
      } catch (error) {
        errorToast(error?.response?.data?.error);
      }
    }
  };

  useEffect(() => {
    const editData = async () => {
      try {
        const endpoint = type === "quiz" ? ENDPOINTS.GETQUIZ : ENDPOINTS.GETPOLL;
        const response = await getApiData(`${URL}${endpoint}${id}`);
        const quizData = type === "quiz" ? response?.data?.quiz : response?.data?.poll;

        setQuizDetails({
          quizName: quizData?.quizName || quizData?.pollName || "",
          quizType: type === "quiz" ? "Q & A" : "Poll Type",
        });
        setQuestions(quizData?.questions || []);
        successToast(response?.message)
      } catch (error) {
        errorToast(error?.response?.data?.error)

      }
    };

    if (edit) {
      editData();
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className={styles.createQuiz}>
        {viewLink && result ? (
          <CopyLink type={result?.category} id={result?._id} />
        ) : (
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
              {!next && !edit ? (
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button type="submit">
                  {edit ? "Update Quiz" : "Create Quiz"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default CreateQuiz;
