import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainContainer from "./layout/mainContainer";
import Dashboard from "./pages/Dashboard";
import QuizAnalysis from "./pages/quizAnalysis";
import Analytics from "./pages/Analytics";

const routes = [
  {
    path: "/",
    element: (
      <MainContainer>
        <Home />
      </MainContainer>
    ),
  },{
    path: "/dashboard",
    element: (
      <MainContainer>
        <Dashboard />
      </MainContainer>
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
