import { ParentListItem, ChildListItem } from "./DrawerContents";
import {
  SpaceDashboard,
  CollectionsBookmarkOutlined,
  BookmarksOutlined,
  FolderSharedOutlined,
  MoreOutlined,
} from "@mui/icons-material";

const RecordsDrawer = () => {
  return (
    <>
      <ParentListItem title="Dashboard" icon={<SpaceDashboard />}>
        <ChildListItem
          icon={<CollectionsBookmarkOutlined />}
          title="Book Copies"
        />
        <ChildListItem icon={<BookmarksOutlined />} title="Borrowings" />
        <ChildListItem icon={<FolderSharedOutlined />} title="User Records" />
        <ChildListItem icon={<MoreOutlined />} title="Book Categories" />
      </ParentListItem>
    </>
  );
};

export default RecordsDrawer;
