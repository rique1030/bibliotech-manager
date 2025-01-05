import { createHashRouter, Navigate } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import MainWindow from "./window/MainWindow";
import BooksView from "./books/BooksView";

const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/main",
    element: <MainWindow />,
    children: [
      {
        path: "books/view",
        element: <BooksView />,
      },
    ],
  },
]);

export default router;
