export const URL = import.meta.env.VITE_BACKEND_URL
export const ENDPOINTS = {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    CREATE_QUIZ:'/api/v1/quiz/addQuiz',
    UPDATEQUIZ:'/api/v1/quiz/updateQuiz/',
    DELETE_QUIZ:'/api/v1/quiz/deleteQuiz/',
    TRENDINGS:'/api/v1/userStats/trendings',
    ANALYTICS:'/api/v1/userStats/analytics',
    ALLPOLLSANDQUIZES:'/api/v1/userStats/getAllpollsAndQuizzes',
    QUIZANALYSIS:'/api/v1/quiz/getQuizAnalysis/',
    POLLANALYSIS:'/api/v1/poll/getPollAnalysis/',
    LOGOUT:'/api/v1/auth/logout',
    GETQUIZ:'/api/v1/quiz/quiz/',
    ATTEMPTQUIZ:'/api/v1/quiz/attemptQuiz/',
    CREATEPOLL:'/api/v1/poll/addPoll',
    GETPOLL:'/api/v1/poll/Poll/',
    UPDATEPOLL:'/api/v1/poll/updatePoll/',
    DELETEPOLL:'/api/v1/poll/deletePoll/',
    ATTEMPTPOLL:'/api/v1/poll/attemptPoll/',
  };
  
  