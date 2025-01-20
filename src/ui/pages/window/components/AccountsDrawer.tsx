import { ParentListItem, ChildListItem } from "./DrawerContents";
import {
	AccountBox,
	FolderSharedOutlined,
	PersonAddOutlined,
	ManageAccountsOutlined,
	PersonRemoveOutlined,
	SupervisorAccountOutlined,
	PlaylistAddCheck,
	PlaylistAdd,
	EditNoteOutlined,
	PlaylistRemove,
} from "@mui/icons-material";
const AccountsDrawer = () => {
	return (
		<>
			<ParentListItem title="Accounts" icon={<AccountBox />}>
				<ChildListItem
					icon={<FolderSharedOutlined />}
					src="/main/accounts/view"
					title="Display Accounts"
				/>
				<ChildListItem
					icon={<PersonAddOutlined />}
					src="/main/accounts/insert"
					title="Add Accounts"
				/>
				<ChildListItem
					icon={<ManageAccountsOutlined />}
					src="/main/accounts/update"
					title="Edit Accounts"
				/>
				<ChildListItem
					icon={<PersonRemoveOutlined />}
					src="/main/accounts/delete"
					title="Remove Accounts"
				/>
			</ParentListItem>

			<ParentListItem title="Roles" icon={<SupervisorAccountOutlined />}>
				<ChildListItem
					icon={<PlaylistAddCheck />}
					src="/main/roles/view"
					title="Display Roles"
				/>
				<ChildListItem
					src="/main/roles/insert"
					icon={<PlaylistAdd />}
					title="Add Roles"
				/>
				<ChildListItem
					icon={<EditNoteOutlined />}
					src="/main/roles/update"
					title="Edit Roles"
				/>
				<ChildListItem
					icon={<PlaylistRemove />}
					src="/main/roles/delete"
					title="Remove Roles"
				/>
			</ParentListItem>
		</>
	);
};

export default AccountsDrawer;
