import { createHashRouter, Navigate } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import MainWindow from "./window/MainWindow";
import BooksView from "./books/BooksView";
import BooksUpdate from "./books/BooksUpdate";
import BooksDelete from "./books/BooksDelete";
import BooksInsert from "./books/BookInsert";
import CategoryView from "./categories/CategoryView";
import CategoryInsert from "./categories/CategoryInsert";
import CategoryUpdate from "./categories/CategoryUpdate";
import CategoryDelete from "./categories/CategoryDelete";
import RolesInsert from "./roles/RolesInsert";
import RolesView from "./roles/RolesView";
import RolesUpdate from "./roles/RolesUpdate";
import RolesDelete from "./roles/RolesDelete";
import AccountInsert from "./account/AccountInsert";
import AccountView from "./account/AccountView";
import AccountDelete from "./account/AccountDelete";
import AccountUpdate from "./account/AccountUpdate";
import BooksCopy from "./records/BookCopies";
import BookBorrow from "./records/BookBorrows";

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
				path: "books",
				children: [
					{
						path: "view",
						element: <BooksView />,
					},
					{
						path: "update",
						element: <BooksUpdate />,
					},
					{
						path: "delete",
						element: <BooksDelete />,
					},
					{
						path: "insert",
						element: <BooksInsert />,
					},
				],
			},
			{
				path: "categories",
				children: [
					{
						path: "view",
						element: <CategoryView />,
					},
					{
						path: "insert",
						element: <CategoryInsert />,
					},
					{
						path: "update",
						element: <CategoryUpdate />,
					},
					{
						path: "delete",
						element: <CategoryDelete />,
					},
				],
			},
			{
				path: "roles",
				children: [
					{
						path: "view",
						element: <RolesView />,
					},
					{
						path: "insert",
						element: <RolesInsert />,
					},
					{
						path: "update",
						element: <RolesUpdate />,
					},
					{
						path: "delete",
						element: <RolesDelete />,
					},
				],
			},
			{
				path: "accounts",
				children: [
					{
						path: "view",
						element: <AccountView />,
					},
					{
						path: "insert",
						element: <AccountInsert />,
					},
					{
						path: "update",
						element: <AccountUpdate />,
					},
					{
						path: "delete",
						element: <AccountDelete />,
					},
				],
			},
			{
				path: "records",
				children: [
					{
						path: "book_copies",
						element: <BooksCopy />,
					},
					{
						path: "borrowings",
						element: <BookBorrow />,
					},
					{
						path: "user_records",
						element: <div>User Records Page</div>, // Replace with the actual component for User Records
					},
					{
						path: "book_categories",
						element: <div>Book Categories Page</div>, // Replace with the actual component for Book Categories
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <Navigate to={"/main"} />,
	},
]);

export default router;
