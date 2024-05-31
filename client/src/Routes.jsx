import { Route, Routes } from "react-router-dom";
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
  }, {
    path: "/analytics",
    element: (
      <ProtectedRoutes>
        <MainContainer>
        <Analytics />
      </MainContainer>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/quizAnalysis/:quizId",
    element: (
      <ProtectedRoutes>
        <MainContainer>
        <QuizAnalysis />
      </MainContainer>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/pollAnalysis/:pollId",
    element: (
      <ProtectedRoutes>
        <MainContainer>
        <PollAnalysis />
      </MainContainer>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/quiz/:quizId",
    element: (
      <QuizViewer>
        <QuizPage isQuiz={true} />
      </QuizViewer>
    ),
  },
  {
    path: "/poll/:quizId",
    element: (
      <QuizViewer>
        <QuizPage isQuiz={false} />
      </QuizViewer>
    ),
  },
  {
    path: "/quiz/results",
    element: (
      <QuizViewer>
        <QuizResults />
      </QuizViewer>
    ),
  },
  {
    path: "/poll/results",
    element: (
      <QuizViewer>
        <QuizResults />
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
