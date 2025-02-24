export const CONFIG = Object.freeze({
	SERVER_HOST: "http://localhost:5000",
	URL: {
		USER: {
			INSERT_MULTIPLE: "/user/insert", //POST
			GET_PAGED_USERS: "/user/paged", //POST
			GET_USERS_BY_ID: "/user/fetch:id", //POST
			GET_USER_BY_EMAIL_AND_PASSWORD: "/user/fetch:login", //POST
			UPDATE_USER: "/user/update", //POST
			DELETE_USER: "/user/delete", //POST
		},
		ROLE: {
			INSERT_MULTIPLE: "/role/insert", //POST
			GET_ALL_ROLES: "/role/get", //GET
			GET_PAGED_ROLES: "/role/paged", //POST
			GET_ROLES_BY_ID: "/role/fetch:id", //POST
			UPDATE_ROLE: "/role/update", //POST
			DELETE_ROLE: "/role/delete", //POST
		},
		CATALOG: {
			INSERT_MULTIPLE: "/catalog/insert", //POST
			GET_PAGED_BOOKS: "/catalog/paged", //POST
			GET_BOOKS_BY_ID: "/catalog/fetch:id", //POST
			UPDATE_BOOK: "/catalog/update", //POST
			DELETE_BOOK: "/catalog/delete", //POST
		},
		COPY: {
			INSERT_COPIES: "/copy/insert", //POST
			PAGED_COPIES: "/copy/paged", //POST
			PAGED_DETAILED_COPIES: "/copy/paged:detailed", //POST
			UPDATE_COPIES: "/copy/update", //POST
			DELETE_COPIES: "/copy/delete", //POST
			FETCH_VIA_ACCESS_NUMBER: "/copy/fetch:access_number", //POST
		},
		CATEGORY: {
			INSERT_MULTIPLE: "/category/insert", //POST
			GET_ALL_CATEGORIES: "/category/get", //GET
			GET_PAGED_CATEGORIES: "/category/paged", //POST
			GET_CATEGORIES_BY_ID: "/category/fetch:id", //POST
			UPDATE_CATEGORY: "/category/update", //POST
			DELETE_CATEGORY: "/category/delete", //POST
		},
		BOOK_CATEGORY: {
			INSERT_MULTIPLE: "/book_category/insert", //POST
			GET_BOOK_CATEGORIES_BY_ID: "/book_category/get", //POST
			GET_PAGED_BOOK_CATEGORIES: "/book_category/paged", //POST
			DELETE_BOOK_CATEGORY: "/book_category/delete", //POST
		},
		RECORDS: {
			GET_PAGED_BOOK_COPIES: "/record/paged_books:count", //POST
			GET_BORROWED_BOOKS: "/record/paged_borrowings", //POST
			GET_BOOK_CATEGORY_COUNT: "/record/paged_book_categories:count", //POST
		},
	},
});

export default CONFIG;
