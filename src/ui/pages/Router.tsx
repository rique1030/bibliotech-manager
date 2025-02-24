import { createHashRouter, Navigate } from "react-router-dom";
import MainWindow from "./window/MainWindow";
import LoginPage from "./main/login/LoginPage";
import BooksView from "./main/books/BooksView";
import BooksUpdate from "./main/books/BooksUpdate";
import BooksDelete from "./main/books/BooksDelete";
import BooksInsert from "./main/books/BooksInsert";
import CategoryView from "./main/categories/CategoryView";
import CategoryInsert from "./main/categories/CategoryInsert";
import CategoryUpdate from "./main/categories/CategoryUpdate";
import CategoryDelete from "./main/categories/CategoryDelete";
import RolesInsert from "./main/roles/RolesInsert";
import RolesView from "./main/roles/RolesView";
import RolesUpdate from "./main/roles/RolesUpdate";
import RolesDelete from "./main/roles/RolesDelete";
import AccountInsert from "./main/account/AccountInsert";
import AccountView from "./main/account/AccountView";
import AccountDelete from "./main/account/AccountDelete";
import AccountUpdate from "./main/account/AccountUpdate";
import BooksCopy from "./main/records/BookCopies";
import BookBorrow from "./main/records/BookBorrows";
import BookCategoryCount from "./main/records/BookCategoryCount";
import BooksQRView from "./main/books/BooksQRView";

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
					{
						path: "manage-books/generate-qr-codes",
						element: <BooksQRView />,
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
