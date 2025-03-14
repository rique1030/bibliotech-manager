import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import CustomTreeItem from "./CustomTreeItem";
import {
	AccountBox,
	PlaylistAddCheck,
} from "@mui/icons-material";
import { useContext } from "react";
import { PermissionContext } from "../../context/PermissionContext";
import { getRoute, routes } from "../../Router";
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ShieldSharpIcon from '@mui/icons-material/ShieldSharp';
import GppGoodSharpIcon from '@mui/icons-material/GppGoodSharp';

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
						src={getRoute(routes.ACCOUNTS.VIEW)}
						icon={<GroupSharpIcon sx={{ fontSize: "1.2rem", color: "primary.main" }}/>}
					/>
					<CustomTreeItem
						disabled={!account.insert}
						itemId="ADDACCOUNTS"
						label="Add Accounts"
						src={getRoute(routes.ACCOUNTS.INSERT)}
						icon={<AddCircleSharpIcon sx={{ fontSize: "1.2rem", color: "primary.main" }}/>}
					/>
				</CustomTreeItem>
				<CustomTreeItem
					itemId="Roles"
					label="Roles"
					icon={
						<GppGoodSharpIcon sx={{ fontSize: "1.2rem", color: "primary.main" }}/>
					}
				>
					<CustomTreeItem
						disabled={!roles.view}
						itemId="DISPLAYROLES"
						label="Display Roles"
						src={getRoute(routes.ROLES.VIEW)}
						icon={
							<ShieldSharpIcon
								sx={{ fontSize: "1.2rem", color: "primary.main" }}
							/>
						}
					/>
					<CustomTreeItem
						disabled={!roles.insert}
						itemId="ADDROLES"
						label="Add Roles"
						src={getRoute(routes.ROLES.INSERT)}
						icon={ <AddCircleSharpIcon sx={{ fontSize: "1.2rem", color: "primary.main" }} /> }
					/>
				</CustomTreeItem>
			</SimpleTreeView>
		</>
	);
};

export default AccountsDrawer;
