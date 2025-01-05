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
          title="Display Accounts"
        />
        <ChildListItem icon={<PersonAddOutlined />} title="Add Accounts" />
        <ChildListItem
          icon={<ManageAccountsOutlined />}
          title="Edit Accounts"
        />
        <ChildListItem
          icon={<PersonRemoveOutlined />}
          title="Remove Accounts"
        />
      </ParentListItem>

      <ParentListItem title="Roles" icon={<SupervisorAccountOutlined />}>
        <ChildListItem icon={<PlaylistAddCheck />} title="Display Roles" />
        <ChildListItem icon={<PlaylistAdd />} title="Add Roles" />
        <ChildListItem icon={<EditNoteOutlined />} title="Edit Roles" />
        <ChildListItem icon={<PlaylistRemove />} title="Remove Roles" />
      </ParentListItem>
    </>
  );
};

export default AccountsDrawer;
