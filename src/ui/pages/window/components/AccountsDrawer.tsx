import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import CustomTreeItem from "./CustomTreeItem";
import {
	AccountBox,
	FolderSharedOutlined,
	PersonAddOutlined,
	SupervisorAccountOutlined,
	PlaylistAddCheck,
	PlaylistAdd,
} from "@mui/icons-material";
import { useContext } from "react";
import { PermissionContext } from "../../context/PermissionContext";
const AccountsDrawer = ({ expandedItems, handleExpandedItemChange }: any) => {
	const { account, roles } = useContext(PermissionContext);
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
						disabled={!account.view}
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
						disabled={!account.insert}
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
						disabled={!roles.view}
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
						disabled={!roles.insert}
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
