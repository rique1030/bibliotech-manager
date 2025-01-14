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
				<ChildListItem
					icon={<BookmarkAddOutlined />}
					src="/main/books/insert"
					title="Add Books"
				/>
				<ChildListItem
					icon={<BookmarkAddedOutlined />}
					src="/main/books/update"
					title="Edit Books"
				/>
				<ChildListItem
					icon={<BookmarkRemoveOutlined />}
					src="/main/books/delete"
					title="Remove Books"
				/>
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
