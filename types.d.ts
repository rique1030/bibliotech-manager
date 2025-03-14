declare global {
	interface ImageBuffer {
		id: string;
		key: string;
		buffer?: Buffer;
		temp?: string;
	}
	interface columnsInterface {
		id: string;
		label: string;
		sortable?: boolean | true;
		widthPercent?: number | 40;
		minWidth?: number | string;
		maxWidth?: number | string;
		width?: number | string;
		box?: boolean | false;
		align?: "right" | "center" | "left";
	}

	interface TableHeaderProps {
		// indexed?: boolean | true;
		// indented?: boolean;
		// isSelect?: boolean | true;
		// columns: columnsInterface[];
		onCheck: (index: number | null) => void;
		isCheck: boolean;
		isIntermediate: boolean;
	}

	interface TableDataCollapsibleProps {
		openedRowIndex?: number;
		index: number;
		children?: React.ReactNode;
	}

	//Book Table

	interface booksRowsInterface {
		id: number;
		access_number: string;
		call_number: string;
		title: string;
		author: string;
		publisher?: string;
		cover_image?: string | null;
		description?: string;
		qrcode: string | null;
		date_added?: Date;
		date_updated?: Date;
		status: string;
	}

	interface bookStatusInterface {
		bookStatus: "available" | "borrowed" | "reserved" | "lost" | string;
	}

	type accountType = {
		id: number;
		profile_pic: string;
		first_name: string;
		last_name: string;
		email: string;
		school_id: string;
		role_id: number;
		is_verified: boolean;
	};

	interface InsertCopyPayload {
		id: number;
		book_id: number;
		book_title: string;
		book_author: string;
		access_number: string;
		status: string;
	}
	interface Window {
		server: {
			getURL: () => promise<any>;
		},
		requestUser: {
			insertMultiple: (payload: InsertUsersPayload) => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			login: (payload: UserLoginPayload) => promise<any>;
			update: (payload: UserUpdatePayload) => promise<any>;
			delete: (payload: { id: RequestByID }) => promise<any>;
		};
		requestRole: {
			insertMultiple: (payload: InsertRolesPayload) => promise<any>;
			getAll: () => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			update: (payload: RoleUpdatePayload) => promise<any>;
			delete: (payload: { id: RequestByID }) => promise<any>;
		};
		requestBook: {
			insertMultiple: (payload: InsertBooksPayload) => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			update: (payload: BookUpdatePayload) => promise<any>;
			delete: (payload: { id: RequestByID }) => promise<any>;
		};
		requestCopy: {
			getByAccessNumber: (payload: string[]) => promise<any>;
			insertMultiple: (payload: InsertCopyPayload) => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			update: (payload: CopyUpdatePayload) => promise<any>;
			delete: (payload: { id: RequestByID }) => promise<any>;
			transaction: (payload: any) => promise<any>;
		};
		requestCategory: {
			insertMultiple: (payload: InsertCategoriesPayload) => promise<any>;
			getAll: () => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			update: (payload: CategoryUpdatePayload) => promise<any>;
			delete: (payload: { id: RequestByID }) => promise<any>;
		};
		storedSettings: {
			getFormatIndex: () => promise<any>;
			setFormatIndex: (index: number) => promise<any>;
			getAccount: () => promise<any>;
			saveAccount: (account: accountType) => promise<any>;
			deleteAccount: () => promise<any>;
			saveTheme: (theme: string) => promise<any>;
			getTheme: () => promise<any>;
		};
		nodeApi: {
			Buffer: typeof Buffer;
		};
		requestRecord: {
			getBookCount: (payload: GetPagedPayload) => promise<any>;
			getBorrowedBooks: (payload: GetPagedPayload) => promise<any>;
			getBookCategoryCount: (payload: GetPagedPayload) => promise<any>;
			getUserCount: () => promise<any>;
			getRoleCount: () => promise<any>;
			getTotalBookCount: () => promise<any>;
		};
		webSocket: {
			connect: () => void;
			disconnect: () => void;
			reviewRequest: (request_id: any) => void;
			respondRequest: (payload: any) => void;
		};
		electron: {
			on: (event: string, listener: (...args: any[]) => void) => void;
		};
	}

	//Users
	interface UserUpdatePayload {
		payload: UserPayload[];
	}

	interface RoleUpdatePayload {
		payload: RolePayload[];
	}

	interface BookUpdatePayload {
		payload: booksRowsInterface[];
	}

	interface CategoryUpdatePayload {
		payload: CategoryPayload[];
	}

	interface UserPayload {
		first_name: string;
		last_name: string;
		email: string;
		password: string;
		school_id?: number | null;
		role_id: number;
		is_verified: boolean;
		created_at?: Date | null;
		is_active: boolean;
		profile_pic?: string | null;
	}

	type InsertUsersPayload = UserPayload[];

	interface GetPagedPayload {
		page?: number | 0;
		per_page?: number | 10;
		filters?: { [key: string]: string };
		order_by?: string;
		order_direction?: "asc" | "desc";
	}

	type RequestByID = number[];

	interface UserLoginPayload {
		email: string;
		password: string;
	}

	//Roles

	interface RolePayload {
		role_name: string;
		accounts_permission: boolean;
		roles_permission: boolean;
		books_permission: boolean;
		categories_permission: boolean;
		color: string;
	}

	type InsertRolesPayload = RolePayload[];

	//Books

	interface BookPayload {
		id: number;
		access_number: string;
		call_number: string;
		title: string;
		author: string;
		publisher?: string;
		cover_image?: string | null;
		description?: string;
		qrcode: string | null;
		date_added: Date | null;
		date_updated: Date | null;
		status: "available" | "borrowed" | "overdue" | "lost" | string;
	}

	type InsertBooksPayload = {
		payload: BookPayload[];
		images: File[];
	};

	//Category

	interface CategoryPayload {
		name: string;
		description?: string;
	}

	type InsertCategoriesPayload = CategoryPayload[];
}

export {};
