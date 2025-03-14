import { TableRow, TableHead, styled, Link, Box, debounce } from "@mui/material";
import StyledCell from "./TableStyledCell";
import { memo, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { TableContext } from "../../context/TableContext";
import ActionCell from "./TableHeaderActionCell";

const StyledTableHead = styled(TableHead)(({theme}) => ({
	"& th": { 
		color: "white", 
		backgroundColor: theme.palette.primary.main 
	},
}));

function IndexCell() {
	return (
		<StyledCell
			header
			color="white"
			column={{ label: "No.", align: "center" }}
			sx={{width: minimumWidth}}
		>
			#
		</StyledCell>
	)
}

function IndentedCell() {
	return (
		<StyledCell
			header
			color="white"
			column={{ label: "No.", align: "center" }}
			sx={{width: minimumWidth}}
		/>
	)
}

const minimumWidth = 60;

function TableHeader() {
	const { columnData: { columns } } = useContext(TableContext);
	const table = useRef<HTMLTableRowElement>(null);
	const [rowWidth, setRowWidth] = useState(0);
	const [boxCount, setBoxCount] = useState(0);
	const { books } = useContext(PermissionContext)
	const updateWidth = useCallback(
		debounce(() => {
			if (table.current)  {
				const newWidth = table.current.offsetWidth;
				setRowWidth(prevWidth => prevWidth === newWidth ? prevWidth : newWidth);
			}
		}, 100),
		[]
	);

	useEffect(() => {
		if (!table.current) return;
		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(updateWidth);
		});
		resizeObserver.observe(table.current);
		return () => resizeObserver.disconnect();
	}, [])

	useLayoutEffect(() => {
		const boxCol = columns.filter(col => col?.box === true);
		setBoxCount(boxCol.length);
	},[columns])

	return (
		<StyledTableHead>
			<TableRow>
				{columns.map((column, index) => {
					switch (column.id) {
						case "select" :
							return <ActionCell selectable key={column.id}/>
						case "remove":
							return <IndentedCell key={column.id}/>
						case "index" :
							return <IndexCell key={column.id}/>
						case "add_book" :
							if (!books.insert) return null
							return <StyledCell key={column.id} header color="white" sx={{width: (rowWidth - boxCount * minimumWidth) * column.widthPercent / 100}} column={column}>ADD</StyledCell>
					}
					return (
						<MemoizedTableHeaderCell
							key={column.id}
							column={column}
							columns={columns}
							availableWidth={rowWidth - boxCount * minimumWidth}
							index={index}
						/>
					);
				})}
			</TableRow>
		</StyledTableHead>
	);
};
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TableSearchContext } from "../../context/TableSearchContext";
import { PermissionContext } from "../../context/PermissionContext";

function HeaderCell({ column, availableWidth}: any) {
	const { search: { setOrderBy, orderBy, asc, setAsc } } = useContext(TableSearchContext);
	const handleSort = () => {
		if (column.id === orderBy) {
			setAsc(!asc);
		} else {
			setOrderBy(column.id);
			setAsc(true);
		}
	};
	return (
		<StyledCell
			header
			color="white"
			key={column.id}
			column={column}
			sx={{width: availableWidth * column.widthPercent / 100}}
		>
			<Box sx={{position: "relative"}}>
				<Link underline={column.sortable ? "hover" : "none"}
					onClick={column.sortable ? handleSort : undefined}
					sx={{ color: "white",
						transition: "all 0.1s ease-in-out",
						padding: 0,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						textAlign: column.align,
				}}>
					{column.label}
					</Link>
					{<KeyboardArrowUpIcon
					sx={{ fontSize: "1.5rem",
						fontWeight: "bold",
						transform: !asc ? "rotate(0deg)" : "rotate(180deg)",
						opacity: orderBy === column.id ? 1 : 0,
						transition: "all 0.1s ease-in-out",
						position: "absolute",
						right: -22
					}} />}
			</Box>
		</StyledCell>
	)
}

const MemoizedTableHeaderCell = memo(HeaderCell);

export default TableHeader;
