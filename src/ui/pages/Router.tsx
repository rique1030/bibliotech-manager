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
import BookCategoryCount from "./records/BookCategoryCount";

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
						path: "manage-books",
						element: <BooksView />,
					},
					{
						path: "manage-books/edit-existing-books",
						element: <BooksUpdate />,
					},
					{
						path: "manage-books/remove-books",
						element: <BooksDelete />,
					},
					{
						path: "add-new-books",
						element: <BooksInsert />,
					},
				],
			},
			{
				path: "categories",
				children: [
					{
						path: "manage-categories",
						element: <CategoryView />,
					},
					{
						path: "add-new-categories",
						element: <CategoryInsert />,
					},
					{
						path: "manage-categories/edit-existing-categories",
						element: <CategoryUpdate />,
					},
					{
						path: "manage-categories/remove-categories",
						element: <CategoryDelete />,
					},
				],
			},
			{
				path: "roles",
				children: [
					{
						path: "manage-roles",
						element: <RolesView />,
					},
					{
						path: "add-new-roles",
						element: <RolesInsert />,
					},
					{
						path: "manage-roles/edit-existing-roles",
						element: <RolesUpdate />,
					},
					{
						path: "manage-roles/remove-roles",
						element: <RolesDelete />,
					},
				],
			},
			{
				path: "accounts",
				children: [
					{
						path: "manage-accounts",
						element: <AccountView />,
					},
					{
						path: "add-new-accounts",
						element: <AccountInsert />,
					},
					{
						path: "manage-accounts/edit-existing-accounts",
						element: <AccountUpdate />,
					},
					{
						path: "manage-accounts/remove-accounts",
						element: <AccountDelete />,
					},
				],
			},
			{
				path: "records",
				children: [
					{
						path: "book-copies",
						element: <BooksCopy />,
					},
					{
						path: "borrowings",
						element: <BookBorrow />,
					},
					{
						path: "user-records",
						element: <div>User Records Page</div>, // Replace with the actual component for User Records
					},
					{
						path: "book-categories",
						element: <BookCategoryCount />, // Replace with the actual component for Book Categories
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
