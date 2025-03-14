import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
	SpaceDashboard,
	CollectionsBookmarkOutlined,
	BookmarksOutlined,
	PlaylistAddCheckCircle
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
						itemId="Dashboard"
						label="Dashboard"
						src="/main/records/dashboard"
						main
						icon={<SpaceDashboard
							sx={{ fontSize: "1.2rem", color: "primary.main" }}
						/>
					}
				/>
				<CustomTreeItem
					itemId="Records"
					label="Records"
					icon={
						<PlaylistAddCheckCircle
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
				</CustomTreeItem>
			</SimpleTreeView>
		</>
	);
};

export default RecordsDrawer;
