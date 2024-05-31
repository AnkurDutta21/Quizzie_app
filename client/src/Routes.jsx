import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainContainer from "./layout/mainContainer";
import Dashboard from "./pages/Dashboard";
import QuizAnalysis from "./pages/quizAnalysis";
import Analytics from "./pages/Analytics";
import QuizViewer from "./layout/quizViewer";
import QuizPage from "./pages/quiz";
import QuizResults from "./pages/QuizResults";
import PollAnalysis from "./pages/pollAnalysis";
import ProtectedRoutes from "./utils/protectedRoutes";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoutes>
      <MainContainer>
        <Dashboard />
      </MainContainer>
      </ProtectedRoutes>
    ),
  },{
    path: "/analytics",
    element: (
      <MainContainer>
        <Analytics/>
      </MainContainer>
    ),
  },
  {
    path: "/quizAnalysis/:quizId",
    element: (
      <MainContainer>
        <QuizAnalysis/>
      </MainContainer>
    ),
  },
  {
    path: "/pollAnalysis/:pollId",
    element: (
      <MainContainer>
        <PollAnalysis/>
      </MainContainer>
    ),
  },
  {
    path: "/quiz/:quizId",
    element: (
      <QuizViewer>
        <QuizPage isQuiz={true}/>
      </QuizViewer>
    ),
  },
  {
    path: "/poll/:quizId",
    element: (
      <QuizViewer>
        <QuizPage isQuiz={false}/>
      </QuizViewer>
    ),
  },
  {
    path: "/quiz/results",
    element: (
      <QuizViewer>
        <QuizResults/>
      </QuizViewer>
    ),
  },
  {
    path: "/poll/results",
    element: (
      <QuizViewer>
        <QuizResults/>
      </QuizViewer>
    ),
  },
];

const Router = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
