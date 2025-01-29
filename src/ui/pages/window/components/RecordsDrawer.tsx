import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
	SpaceDashboard,
	CollectionsBookmarkOutlined,
	BookmarksOutlined,
	FolderSharedOutlined,
	MoreOutlined,
} from "@mui/icons-material";
import CustomTreeItem from "./CustomTreeItem";

const RecordsDrawer = ({ expandedItems, handleExpandedItemChange }: any) => {
	return (
		<>
			<SimpleTreeView
				expandedItems={expandedItems}
				onExpandedItemsChange={handleExpandedItemChange}
			>
				<CustomTreeItem
					itemId="Records"
					label="Records"
					icon={
						<SpaceDashboard
							sx={{ fontSize: "1.2rem", color: "primary.main" }}
						/>
					}
				>
					<CustomTreeItem
						itemId="SELECTBOOKCOPIES"
						label="Book Copies"
						src="/main/records/book-copies"
						icon={
							<CollectionsBookmarkOutlined
								sx={{ fontSize: "1.2rem", color: "primary.main" }}
							/>
						}
					/>
					<CustomTreeItem
						itemId="SELECTBORROWINGS"
						label="Borrowings"
						src="/main/records/borrowings"
						icon={
							<BookmarksOutlined
								sx={{ fontSize: "1.2rem", color: "primary.main" }}
							/>
						}
					/>
					<CustomTreeItem
						itemId="SELECTUSERRECORDS"
						label="User Records"
						icon={
							<FolderSharedOutlined
								sx={{ fontSize: "1.2rem", color: "primary.main" }}
							/>
						}
					/>
					<CustomTreeItem
						itemId="SELECTBOOKCATEGORIES"
						label="Book Categories"
						src="/main/records/book-categories"
						icon={
							<MoreOutlined
								sx={{ fontSize: "1.2rem", color: "primary.main" }}
							/>
						}
					/>
				</CustomTreeItem>
			</SimpleTreeView>
		</>
	);
};

export default RecordsDrawer;
