import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainContainer from "./layout/mainContainer";

const routes = [
  {
    path: "/",
    element: (
      <MainContainer>
        <Home />
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
