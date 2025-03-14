import { useContext, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { TableContext } from "../../context/TableContext";
import { TableUpdateContext } from "../../context/TableUpdateContext";
import { useUpdate } from "../../hooks/useUpdate";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import columns from "../../components/Table/columns/account/insert";
import TableHeader from "../../components/Table/TableHeader";
import AccountsData from "../../components/Table/Accounts/AccountsData";
import UpdateFooter from "../../components/update/Footer";
import { getRoute, routes } from "../../Router";
// import RolesData from "../components/Table/Roles/RolesData";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestUser.getByID(payload);
};

const updateData = async (payload: UserUpdatePayload): Promise<any> => {
	return await window.requestUser.update(payload);
};

const field = ["id", "first_name", "last_name", "email", "role_id"];

function AccountUpdate() {
	const location = useLocation();
	const { state } = location;
	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		entries: rows,
		entryIds: state,
	};

	const options = {
		url: getRoute(routes.ACCOUNTS.UPDATE),
		field,
		payload: payload,
		queryKey: "accountsUpdate",
	};

	const useupdate = useUpdate({ updateData, getData: fetchData, options });
	const {
		confirmationModal: { ConfirmationModal },
		isLoading,
		preData,
	} = useupdate;

	useLayoutEffect(() => {
		setColumns(columns);
	}, [state]);

	useLayoutEffect(() => {
		const newData =
			preData?.data.map((item: any) => ({ ...item, password: "" })) || [];
		setRows(newData);
	}, [preData]);

	useEffect(() => {
		try {
			const updateUser = async () => {
				const user = await window.storedSettings.getAccount();
				const response = await fetchData([user.id]);
				if (response.success === false) return;
				const account = FormatAccountData(response.data[0]);
				await window.storedSettings.deleteAccount();
				await window.storedSettings.saveAccount(account);
			};
			updateUser();
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<TableUpdateContext.Provider value={{ useupdate }}>
			<MainContainer>
				{ConfirmationModal}
				<ViewTable isLoading={isLoading}>
					<TableHeader />
					<AccountsData removable edit />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableUpdateContext.Provider>
	);
}

function Footer() {
	const navigate = useNavigate();
	const handleGoback = () => navigate(getRoute(routes.ACCOUNTS.VIEW));
	const {
		useupdate: { handleUpdate, isUpdating },
	} = useContext(TableUpdateContext);
	const {
		rowData: { rows },
	} = useContext(TableContext);
	return (
		<UpdateFooter
			length={rows.length}
			isUpdating={isUpdating}
			handleGoback={handleGoback}
			handleUpdate={handleUpdate}
			type="account"
		/>
	);
}

function FormatAccountData(acc: any) {
	return {
		email: acc.email,
		first_name: acc.first_name,
		id: acc.id,
		is_verified: acc.is_verified,
		last_name: acc.last_name,
		profile_pic: acc.profile_pic,
		role_id: acc.role_id,
		school_id: acc.school_id,
	};
}

export default AccountUpdate;
