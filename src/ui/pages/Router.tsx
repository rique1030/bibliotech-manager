import { createHashRouter, Navigate } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import MainWindow from "./window/MainWindow";
import BooksView from "./books/BooksView";
import BooksUpdate from "./books/BooksUpdate";
import BooksDelete from "./books/BooksDelete";
import BooksInsert from "./books/BookInsert";

const router = createHashRouter([
	{
		path: "/",
		element: <Navigate to={"/main/books/update"} />,
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
			{
				path: "books/update",
				element: <BooksUpdate />,
			},
			{
				path: "books/delete",
				element: <BooksDelete />,
			},
			{
				path: "books/insert",
				element: <BooksInsert />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to={"/main"} />,
	},
]);

export default router;
