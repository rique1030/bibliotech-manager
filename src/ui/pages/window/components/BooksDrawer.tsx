import { ParentListItem, ChildListItem } from "./DrawerContents";
import {
  Book,
  BookmarkBorderOutlined,
  BookmarkAddOutlined,
  BookmarkAddedOutlined,
  BookmarkRemoveOutlined,
  LocalOffer,
  PlaylistAddCheck,
  PlaylistAdd,
  EditNoteOutlined,
  PlaylistRemove,
} from "@mui/icons-material";
const BooksDrawer = () => {
  return (
    <>
      <ParentListItem title="Books" icon={<Book />}>
        <ChildListItem
          icon={<BookmarkBorderOutlined />}
          src="/main/books/view"
          title="Display Books"
        />
        <ChildListItem icon={<BookmarkAddOutlined />} title="Add Books" />
        <ChildListItem icon={<BookmarkAddedOutlined />} title="Edit Books" />
        <ChildListItem icon={<BookmarkRemoveOutlined />} title="Remove Books" />
      </ParentListItem>

      <ParentListItem title="Categories" icon={<LocalOffer />}>
        <ChildListItem icon={<PlaylistAddCheck />} title="Display Categories" />
        <ChildListItem icon={<PlaylistAdd />} title="Add Categories" />
        <ChildListItem icon={<EditNoteOutlined />} title="Edit Categories" />
        <ChildListItem icon={<PlaylistRemove />} title="Remove Categories" />
      </ParentListItem>
    </>
  );
};

export default BooksDrawer;
