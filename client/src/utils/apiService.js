export const URL = import.meta.env.VITE_BACKEND_URL
export const ENDPOINTS = {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    CREATE_QUIZ:'/api/v1/quiz/addQuiz',
    UPDATE_QUIZ:'/api/v1/quiz',
    DELETE_QUIZ:'/api/v1/quiz',
    TRENDINGS:'/api/v1/userStats/trendings',
    ANALYTICS:'/api/v1/userStats/analytics',
    ALLPOLLSANDQUIZES:'/api/v1/userStats/getAllpollsAndQuizzes',
    QUIZANALYSIS:'/api/v1/quiz/getQuizAnalysis/',
    POLLANALYSIS:'/api/v1/poll/getPollAnalysis/',
  };
  
  