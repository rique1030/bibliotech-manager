export const CONFIG = Object.freeze({
	SERVER_HOST: "http://localhost:5000",
	URL: {
		USER: {
			INSERT_MULTIPLE: "/users/insert", //POST
			GET_PAGED_USERS: "/users/get_paged", //POST
			GET_USERS_BY_ID: "/users/get_by_id", //POST
			GET_USER_BY_EMAIL_AND_PASSWORD: "/users/login", //POST
			UPDATE_USER: "/users/update", //POST
			DELETE_USER: "/users/delete", //POST
		},
		ROLE: {
			INSERT_MULTIPLE: "/roles/insert", //POST
			GET_ALL_ROLES: "/roles/get_all", //GET
			GET_PAGED_ROLES: "/roles/get_paged", //POST
			GET_ROLES_BY_ID: "/roles/get_by_id", //POST
			UPDATE_ROLE: "/roles/update", //POST
			DELETE_ROLE: "/roles/delete", //POST
		},
		BOOK: {
			INSERT_MULTIPLE: "/books/insert", //POST
			GET_PAGED_BOOKS: "/books/get_paged", //POST
			GET_BOOKS_BY_ID: "/books/get_by_id", //POST
			GET_BOOKS_BY_ACCESS_NUMBER: "/books/get_by_access_number", //POST
			UPDATE_BOOK: "/books/update", //POST
			DELETE_BOOK: "/books/delete", //POST
		},
		CATEGORY: {
			INSERT_MULTIPLE: "/categories/insert", //POST
			GET_ALL_CATEGORIES: "/categories/get_all", //GET
			GET_PAGED_CATEGORIES: "/categories/get_paged", //POST
			GET_CATEGORIES_BY_ID: "/categories/get_by_id", //POST
			UPDATE_CATEGORY: "/categories/update", //POST
			DELETE_CATEGORY: "/categories/delete", //POST
		},
		BOOK_CATEGORY: {
			INSERT_MULTIPLE: "/book_categories/insert", //POST
			GET_BOOK_CATEGORIES_BY_ID: "/book_categories/get_by_id", //POST
			UPDATE_BOOK_CATEGORY: "/book_categories/update", //POST
			DELETE_BOOK_CATEGORY: "/book_categories/delete", //POST
		},
	},
});

export default CONFIG;
