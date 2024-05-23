import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";


const routes = [
  {
    path: "/",
    element: (
        <Home />
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
