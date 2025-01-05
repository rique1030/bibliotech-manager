declare global {
	//Tables
	interface columnsInterface {
		id: string;
		label: string;
		title: string;
		width?: number;
		align?: "right";
	}

	interface ViewTableProps {
		// rows: booksRowsInterface[];
		columns: columnsInterface[];
		children?: React.ReactNode;
	}

	interface ViewTableProps {
		columns: columnsInterface[];
		children?: React.ReactNode;
		isCheck: boolean;
		onCheck: (index: number | null) => void;
		isIntermediate: boolean;
	}
	interface TableHeaderProps {
		columns: columnsInterface[];
		onCheck: (index: number | null) => void;
		isCheck: boolean;
		isIntermediate: boolean;
	}

	interface TableDataProps {
		index: number;
		isCheck: (index: number) => boolean;
		onCheck?: (index: number) => void;
		row: { [key: string]: any };
		columns: columnsInterface[];
		openedRowIndex: number | null;
		onClick: (index: number) => void;
		children?: React.ReactNode;
	}

	interface TableDataCollapsibleProps {
		openedRowIndex: number | null;
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
		date_added: Date;
		date_updated: Date;
		status: string;
	}

	interface booksDataInterface {
		rows: booksRowsInterface[];
		columns: columnsInterface[];
		onRowClick: (index: number) => void;
		openedRowIndex: number | null;
		isCheck: (index: number) => boolean;
		onCheck: (index: number) => void;
	}

	interface bookStatusInterface {
		bookStatus: "available" | "borrowed" | "reserved" | "lost" | string;
	}

	// ELECTRON
	interface Window {
		requestUser: {
			insertMultiple: (payload: InsertUsersPayload) => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			login: (payload: UserLoginPayload) => promise<any>;
			update: (payload: RequestByID) => promise<any>;
			delete: (payload: RequestByID) => promise<any>;
		};
		requestRole: {
			insertMultiple: (payload: InsertRolesPayload) => promise<any>;
			getAll: () => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			update: (payload: RequestByID) => promise<any>;
		};
		requestBook: {
			insertMultiple: (payload: InsertBooksPayload) => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			update: (payload: RequestByID) => promise<any>;
			delete: (payload: RequestByID) => promise<any>;
		};
		requestCategory: {
			insertMultiple: (payload: InsertCategoriesPayload) => promise<any>;
			getPaged: (payload: GetPagedPayload) => promise<any>;
			getByID: (payload: RequestByID) => promise<any>;
			update: (payload: RequestByID) => promise<any>;
			delete: (payload: RequestByID) => promise<any>;
		};
	}

	//Users

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
		filter?: { [key: string]: string };
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

	type InsertBooksPayload = BookPayload[];

	//Category

	interface CategoryPayload {
		name: string;
		description?: string;
	}

	type InsertCategoriesPayload = CategoryPayload[];
}

export {};
