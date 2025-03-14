import Book from "@mui/icons-material/Book";
import SellSharpIcon from "@mui/icons-material/SellSharp";
import LocalOffer from "@mui/icons-material/LocalOffer";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import CustomTreeItem from "./CustomTreeItem";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import Inventory2SharpIcon from "@mui/icons-material/Inventory2Sharp";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { useContext, useEffect, useState } from "react";
import { PermissionContext } from "../../context/PermissionContext";
import { getRoute, routes } from "../../Router";
import { Box, Button, Divider, LinearProgress, Modal, Paper, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import useResultAlert from "../../hooks/useResultAlert";

const BooksDrawer = ({ expandedItems, handleExpandedItemChange }: any) => {
	const { books, categories } = useContext(PermissionContext);
	const [ borrowing, setBorrowing] = useState(false);
	const handleBorrow = () => {
		setBorrowing(true);
	}
	return (
		<>
			<BorrowModal borrowing={borrowing} setBorrowing={setBorrowing}/>
			<SimpleTreeView
				expandedItems={expandedItems}
				onExpandedItemsChange={handleExpandedItemChange}>
				<CustomTreeItem
					itemId="Books"
					label="Books"
					icon={<Book sx={{ fontSize: "1.2rem", color: "primary.main" }} />}>
					<CustomTreeItem
						disabled={!books.view}
						itemId="SELECTBOOKS"
						label="Manage Titles"
						src={getRoute(routes.BOOKS.VIEW)}
						icon={<AutoStoriesSharpIcon />}
					/>
					<CustomTreeItem
						disabled={!books.view}
						itemId="SELECTCOPY"
						label="Manage Copies"
						src={getRoute(routes.COPIES.VIEW)}
						icon={<Inventory2SharpIcon />}
					/>
					<CustomTreeItem
						disabled={!books.insert}
						itemId="INSERTBOOKS"
						label="Add Titles"
						src={getRoute(routes.BOOKS.INSERT)}
						icon={<AddCircleSharpIcon />}
					/>
					<Button variant="outlined" sx={{ width: "100%" }} onClick={ handleBorrow }>
						Book transaction
					</Button>
				</CustomTreeItem>
				<CustomTreeItem
					itemId="Categories"
					label="Categories"
					icon={
						<LocalOffer sx={{ fontSize: "1.2rem", color: "primary.main" }} />
					}>
					<CustomTreeItem
						disabled={!categories.view}
						itemId="SELECTCATEGORY"
						label="Manage Categories"
						src={getRoute(routes.CATEGORIES.VIEW)}
						icon={<SellSharpIcon />}
					/>
					<CustomTreeItem
						disabled={!categories.insert}
						itemId="INSERTCATEGORY"
						label="Add New Categories"
						src={getRoute(routes.CATEGORIES.INSERT)}
						icon={<AddCircleSharpIcon />}
					/>
				</CustomTreeItem>
			</SimpleTreeView>
		</>
	);
};

async function requestBook(payload: any) {
	return await window.requestCopy.transaction(payload);
}

function BorrowModal({borrowing, setBorrowing} : any) {
	const [userID, setUserID] = useState("");
	const [bookAcc, setBookAcc] = useState("");
	const { showTimedAlert } =useResultAlert();
	const { mutate, isPending } = useMutation({
		mutationFn: (payload: any) => requestBook(payload),
		onSuccess: (result: any) => {
			if (!result.success) {
				showTimedAlert("error","Something went wrong. Please try again later.", 5000);
			} else {
				showTimedAlert("success", result.message, 5000);
				console.log(result.message);
			}
			setBorrowing(false);
		},
		onError: (error: any) => {
			console.error(error);
			showTimedAlert("error","Something went wrong. Please try again later.");
			setBorrowing(false);
		}
	});

	const handleBorrow = (borrow: boolean) => {
		mutate({
			"access_number" : bookAcc, 
			"school_id" : userID, 
			"borrow": borrow
		})
	}


	useEffect(() => {
		setBookAcc("");
		setUserID("");
	},[borrowing])


	return (
		<Modal open={borrowing} onClose={()=> setBorrowing(false)} sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
			<Paper sx={{ width: 500, height: 300, borderRadius: 5 }}>
				<Typography variant="h6" sx={{ padding: 2, justifySelf: "center"}}>Borrow or return a book</Typography>
				<Divider/>
				<Box sx={{display: "flex", flexDirection: "column", padding: 5, gap: 2.5 }}>
					<TextField
						label="Book Access Number"
						size="small"
						value={bookAcc}
						onChange={(e) => setBookAcc(e.target.value)}
						fullWidth
					/>
					<TextField
						label="User School ID"
						size="small"
						value={userID}
						onChange={(e) => setUserID(e.target.value)}
						fullWidth
					/>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
					{ !isPending ?	<>
						<Button onClick={() => setBorrowing(false)} sx={{ width: "30%"}} variant="outlined">Cancel</Button>
						<Button onClick={() => handleBorrow(true)} sx={{ width: "30%"}} variant="contained">Borrow</Button>
						<Button onClick={() => handleBorrow(true)} sx={{ width: "30%"}} variant="contained">Return</Button>
					</>:
						<LinearProgress sx={{ width: "100%", alignSelf: "center", borderRadius: 5, margin: "1rem 0" }}/>}
					</Box>
				</Box>
			</Paper>
		</Modal>
		)
}

export default BooksDrawer;
