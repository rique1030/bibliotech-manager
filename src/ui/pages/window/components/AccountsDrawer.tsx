import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import CustomTreeItem from "./CustomTreeItem";
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
const AccountsDrawer = ({ expandedItems, handleExpandedItemChange }: any) => {
	return (
		<>
			<SimpleTreeView
				expandedItems={expandedItems}
				onExpandedItemsChange={handleExpandedItemChange}
			>
				<CustomTreeItem
					itemId="Accounts"
					label="Accounts"
					icon={
						<AccountBox sx={{ fontSize: "1.2rem", color: "primary.main" }} />
					}
				>
					<CustomTreeItem
						itemId="DISPLAYACCOUNTS"
						label="Display Accounts"
						src="/main/accounts/manage-accounts"
						icon={
							<FolderSharedOutlined
								sx={{ fontSize: "1.2rem", color: "primary.main" }}
							/>
						}
					/>
					<CustomTreeItem
						itemId="ADDACCOUNTS"
						label="Add Accounts"
						src="/main/accounts/add-new-accounts"
						icon={
							<PersonAddOutlined
								sx={{ fontSize: "1.2rem", color: "primary.main" }}
							/>
						}
					/>
				</CustomTreeItem>
				<CustomTreeItem
					itemId="Roles"
					label="Roles"
					icon={
						<SupervisorAccountOutlined
							sx={{ fontSize: "1.2rem", color: "primary.main" }}
						/>
					}
				>
					<CustomTreeItem
						itemId="DISPLAYROLES"
						label="Display Roles"
						src="/main/roles/manage-roles"
						icon={
							<PlaylistAddCheck
								sx={{ fontSize: "1.2rem", color: "primary.main" }}
							/>
						}
					/>
					<CustomTreeItem
						itemId="ADDROLES"
						label="Add Roles"
						src="/main/roles/add-new-roles"
						icon={
							<PlaylistAdd sx={{ fontSize: "1.2rem", color: "primary.main" }} />
						}
					/>
				</CustomTreeItem>
			</SimpleTreeView>
		</>
	);
};

export default AccountsDrawer;
