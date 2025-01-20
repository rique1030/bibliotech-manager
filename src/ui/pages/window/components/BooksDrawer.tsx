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

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { NavLink, useNavigate } from "react-router-dom";

const BooksDrawer = () => {
	const navigate = useNavigate();

	const navigateToPage = (src: string) => {
		navigate(src);
	};
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
					title="Add New Books"
				/>
				<ChildListItem
					icon={<BookmarkAddedOutlined />}
					src="/main/books/update"
					title="Edit Existing Books"
				/>
				<ChildListItem
					icon={<BookmarkRemoveOutlined />}
					src="/main/books/delete"
					title="Remove Books"
				/>
			</ParentListItem>

			<ParentListItem title="Categories" icon={<LocalOffer />}>
				<ChildListItem
					icon={<PlaylistAddCheck />}
					src="/main/categories/view"
					title="Display Categories"
				/>
				<ChildListItem
					icon={<PlaylistAdd />}
					src="/main/categories/insert"
					title="Add New Categories"
				/>
				<ChildListItem
					icon={<EditNoteOutlined />}
					src="/main/categories/update"
					title="Edit Categories"
				/>
				<ChildListItem
					icon={<PlaylistRemove />}
					src="/main/categories/delete"
					title="Remove Categories"
				/>
			</ParentListItem>
		</>
	);
};

export default BooksDrawer;
