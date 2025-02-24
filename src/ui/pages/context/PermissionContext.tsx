import { useQuery } from "@tanstack/react-query";
import { createContext, useLayoutEffect, useState } from "react";
import { queryClient } from "../hooks/useReactQuery";

interface PermissionContextType {
	account: {
		view: boolean;
		insert: boolean;
		update: boolean;
		delete: boolean;
	};
	roles: {
		view: boolean;
		insert: boolean;
		update: boolean;
		delete: boolean;
	};
	books: {
		view: boolean;
		insert: boolean;
		update: boolean;
		delete: boolean;
	};
	categories: {
		view: boolean;
		insert: boolean;
		update: boolean;
		delete: boolean;
	};
}

export const PermissionContext = createContext<PermissionContextType>({
	account: {
		view: false,
		insert: false,
		update: false,
		delete: false,
	},
	roles: {
		view: false,
		insert: false,
		update: false,
		delete: false,
	},
	books: {
		view: false,
		insert: false,
		update: false,
		delete: false,
	},
	categories: {
		view: false,
		insert: false,
		update: false,
		delete: false,
	},
});

async function getRoleByID(ids: RequestByID) {
	return await window.requestRole.getByID(ids);
}

export function PermissionContextProvider({ children }: any) {
	const [accountId, setAccountId] = useState<number[]>([0]);
	const [permissions, setPermissions] = useState<PermissionContextType>({
		account: {
			view: false,
			insert: false,
			update: false,
			delete: false,
		},
		roles: {
			view: false,
			insert: false,
			update: false,
			delete: false,
		},
		books: {
			view: false,
			insert: false,
			update: false,
			delete: false,
		},
		categories: {
			view: false,
			insert: false,
			update: false,
			delete: false,
		},
	});

	useLayoutEffect(() => {
		const getAccountId = async () => {
			const data = await window.storedSettings.getAccount();
			setAccountId([data.role_id]);
			refetch();
		};

		getAccountId();
	}, []);

	const { data, refetch } = useQuery({
		queryKey: ["rolePermission", accountId],
		queryFn: () => getRoleByID(accountId),
		staleTime: 0,
	});

	useLayoutEffect(() => {
		if (data) {
			const newData = data?.data?.[0];
			if (!newData) return;
			const updatedPermissions = {
				account: {
					view: newData.account_view ?? false,
					insert: newData.account_insert ?? false,
					update: newData.account_update ?? false,
					delete: newData.account_delete ?? false,
				},
				roles: {
					view: newData.roles_view ?? false,
					insert: newData.roles_insert ?? false,
					update: newData.roles_update ?? false,
					delete: newData.roles_delete ?? false,
				},
				books: {
					view: newData.books_view ?? false,
					insert: newData.books_insert ?? false,
					update: newData.books_update ?? false,
					delete: newData.books_delete ?? false,
				},
				categories: {
					view: newData.categories_view ?? false,
					insert: newData.categories_insert ?? false,
					update: newData.categories_update ?? false,
					delete: newData.categories_delete ?? false,
				},
			};
			setPermissions(updatedPermissions);
		}
	}, [data, accountId]);

	return (
		<PermissionContext.Provider value={{ ...permissions }}>
			{children}
		</PermissionContext.Provider>
	);
}
