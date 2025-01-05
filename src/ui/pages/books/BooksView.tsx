import { Box, Paper, Container, Divider } from "@mui/material";
import { SearchPanel, SearchBar, SearchFilter } from "./SearchPanel";
import { ViewTable } from "../components/Table/Table";
import useSelectAll from "../hooks/useSelectAll";
import { useEffect, useState } from "react";
import BooksData from "./BooksData";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestBook.getPaged(payload);
};

function BooksView() {
	const [value, setValue] = useState<string>("access_number");
	const [OpenedRowIndex, setOpenedRowIndex] = useState<number | null>(null);
	const {
		selectedItems,
		toggleSelectAll,
		toggleSelectItem,
		isSelected,
		isAllSelected,
		isIntermediate,
	} = useSelectAll(rows.map((row) => row.id));

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterTerm, setFilterTerm] = useState<string>("");

	const [page, setPage] = useState(0);

	useEffect(() => {
		console.log(selectedItems);
	}, [selectedItems]);

	const handleRowClick = (index: number) => {
		if (OpenedRowIndex === index) {
			setOpenedRowIndex(null);
		} else {
			setOpenedRowIndex(index);
		}
	};

	const handleAlignment = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if (newAlignment !== null) {
			setValue(newAlignment);
		}
	};

	return (
		<Container
			sx={{
				height: "100%",
				width: "100%",
				padding: "1rem",
				boxSizing: "border-box",
				maxWidth: "1000px",
			}}
		>
			<Box
				component={Paper}
				elevation={4}
				sx={{
					width: "100%",
					height: "100%",
					boxSizing: "border-box",
					padding: "1rem",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}
			>
				<SearchPanel>
					<SearchBar />
					<SearchFilter
						contents={[
							{ filter: "acc no", value: "access_number" },
							{ filter: "call no", value: "call_number" },
							{ filter: "title", value: "title" },
							{ filter: "author", value: "author" },
						]}
						value={value}
						onChange={handleAlignment}
					/>
				</SearchPanel>
				<Divider variant="middle" />
				<ViewTable
					columns={columns}
					isCheck={isAllSelected}
					onCheck={toggleSelectAll}
					isIntermediate={isIntermediate}
				>
					<BooksData
						isCheck={isSelected}
						onCheck={toggleSelectItem}
						rows={rows}
						columns={columns}
						onRowClick={handleRowClick}
						openedRowIndex={OpenedRowIndex}
					/>
				</ViewTable>
			</Box>
		</Container>
	);
}

const columns: columnsInterface[] = [
	{
		id: "access_number",
		label: "Acc\u00A0No.",
		title: "Access Number",
		width: 50,
		align: "right",
	},
	{
		id: "call_number",
		label: "Call\u00A0No.",
		title: "Call Number",
		width: 200,
	},
	{
		id: "title",
		label: "Title",
		title: "Title",
	},
	{
		id: "author",
		label: "Author",
		title: "Author",
	},
	{ id: "status", label: "Status", title: "Status", width: 100 },
];

const rows: booksRowsInterface[] = [
	{
		id: 1,
		access_number: "001",
		call_number: "QA76.73.J38 2023",
		title: "JavaScript: The Good Parts",
		author: "Douglas Crockford",
		publisher: "O'Reilly Media",
		cover_image: "image1.jpg",
		description: "An insightful book on JavaScript.",
		qrcode: "qrcode001",
		date_added: new Date("2023-01-01T10:00:00Z"),
		date_updated: new Date("2023-02-01T10:00:00Z"),
		status: "available",
	},
	{
		id: 2,
		access_number: "002",
		call_number: "QA76.73.P98 2020",
		title: "Python Crash Course",
		author: "Eric Matthes",
		publisher: "No Starch Press",
		cover_image: "image2.jpg",
		description: "A hands-on, project-based introduction to programming.",
		qrcode: "qrcode002",
		date_added: new Date("2023-01-05T11:00:00Z"),
		date_updated: new Date("2023-02-15T11:00:00Z"),
		status: "borrowed",
	},
	{
		id: 3,
		access_number: "003",
		call_number: "TK5105.888.C68 2021",
		title: "Learning Web Design",
		author: "Jennifer Niederst Robbins",
		publisher: "O'Reilly Media",
		cover_image: "image3.jpg",
		description:
			"A beginner's guide to HTML, CSS, JavaScript, and web graphics.",
		qrcode: "qrcode003",
		date_added: new Date("2023-01-10T12:00:00Z"),
		date_updated: new Date("2023-02-20T12:00:00Z"),
		status: "available",
	},
	{
		id: 4,
		access_number: "004",
		call_number: "QA76.9.D3 P47 2019",
		title: "Data Science from Scratch",
		author: "Joel Grus",
		publisher: "O'Reilly Media",
		cover_image: "image4.jpg",
		description: "A first principles approach to data science.",
		qrcode: "qrcode004",
		date_added: new Date("2023-01-15T13:00:00Z"),
		date_updated: new Date("2023-02-25T13:00:00Z"),
		status: "lost",
	},
	{
		id: 5,
		access_number: "005",
		call_number: "QA76.73.S95 2022",
		title: "Swift Programming: The Big Nerd Ranch Guide",
		author: "Matthew Mathias",
		publisher: "Big Nerd Ranch",
		cover_image:
			"https://scontent.fmnl7-1.fna.fbcdn.net/v/t39.30808-1/464112913_3437961323176663_5372367048065621212_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHYvJ3VYW8LCsriWXLSjQlaFdujCNp8DTYV26MI2nwNNuPE_5AFCYxqOmBVjtOC-2TqajmWugxkTdGA-Rwv1Pd-&_nc_ohc=8jNHiRen1l4Q7kNvgHVk5mT&_nc_zt=24&_nc_ht=scontent.fmnl7-1.fna&_nc_gid=AzmE7QCvXxLBTxceVb8PJrw&oh=00_AYDLvMkEa_oOJ477riJ6-LigcFZjEy0WLXaMUq3pHR8hEw&oe=677FD304",
		description: "A practical guide to Swift programming.",
		qrcode: "https://scontent.fmnl7-1.fna.fbcdn.net/v/t39.30808-1/464112913_3437961323176663_5372367048065621212_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHYvJ3VYW8LCsriWXLSjQlaFdujCNp8DTYV26MI2nwNNuPE_5AFCYxqOmBVjtOC-2TqajmWugxkTdGA-Rwv1Pd-&_nc_ohc=8jNHiRen1l4Q7kNvgHVk5mT&_nc_zt=24&_nc_ht=scontent.fmnl7-1.fna&_nc_gid=AzmE7QCvXxLBTxceVb8PJrw&oh=00_AYDLvMkEa_oOJ477riJ6-LigcFZjEy0WLXaMUq3pHR8hEw&oe=677FD304",
		date_added: new Date("2023-01-20T14:00:00Z"),
		date_updated: new Date("2023-03-01T14:00:00Z"),
		status: "borrowed",
	},
];

export default BooksView;
