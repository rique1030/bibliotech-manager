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

const BooksDrawer = ({ expandedItems, handleExpandedItemChange }: any) => {
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
						itemId="SELECTBOOKS"
						label="Manage Books"
						src="/main/books/manage-books"
						icon={<BookmarkBorderOutlined />}
					/>
					<CustomTreeItem
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
						itemId="SELECTCATEGORY"
						label="Manage Categories"
						src="/main/categories/manage-categories"
						icon={<PlaylistAddCheck />}
					/>
					<CustomTreeItem
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
