import {
	Book,
	BookmarkBorderOutlined,
	BookmarkAddOutlined,
	LocalOffer,
	PlaylistAddCheck,
	PlaylistAdd,
} from "@mui/icons-material";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import CustomTreeItem from "./CustomTreeItem";
import { useContext } from "react";
import { PermissionContext } from "../../context/PermissionContext";

const BooksDrawer = ({ expandedItems, handleExpandedItemChange }: any) => {
	const { books, categories } = useContext(PermissionContext);
	return (
		<>
			<SimpleTreeView
				expandedItems={expandedItems}
				onExpandedItemsChange={handleExpandedItemChange}
			>
				<CustomTreeItem
					itemId="Books"
					label="Books"
					icon={<Book sx={{ fontSize: "1.2rem", color: "primary.main" }} />}
				>
					<CustomTreeItem
						disabled={!books.view}
						itemId="SELECTBOOKS"
						label="Manage Books"
						src="/main/books/manage-books"
						icon={<BookmarkBorderOutlined />}
					/>
					<CustomTreeItem
						disabled={!books.insert}
						itemId="INSERTBOOKS"
						label="Add New Books"
						src="/main/books/add-new-books"
						icon={<BookmarkAddOutlined />}
					/>
				</CustomTreeItem>
				<CustomTreeItem
					itemId="Categories"
					label="Categories"
					icon={
						<LocalOffer sx={{ fontSize: "1.2rem", color: "primary.main" }} />
					}
				>
					<CustomTreeItem
						disabled={!categories.view}
						itemId="SELECTCATEGORY"
						label="Manage Categories"
						src="/main/categories/manage-categories"
						icon={<PlaylistAddCheck />}
					/>
					<CustomTreeItem
						disabled={!categories.insert}
						itemId="INSERTCATEGORY"
						label="Add New Categories"
						src="/main/categories/add-new-categories"
						icon={<PlaylistAdd />}
					/>
				</CustomTreeItem>
			</SimpleTreeView>
		</>
	);
};

export default BooksDrawer;
