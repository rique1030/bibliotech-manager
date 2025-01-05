import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Checkbox,
	Collapse,
	Chip,
	Theme,
	useTheme,
} from "@mui/material";
import { alpha } from "@mui/material";

const ViewTable = ({
	columns,
	children,
	isCheck,
	onCheck,
	isIntermediate,
}: ViewTableProps) => {
	return (
		<TableContainer component={Paper} elevation={0}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
				stickyHeader
			>
				<TableHead>
					<TableHeader
						onCheck={onCheck}
						isCheck={isCheck}
						isIntermediate={isIntermediate}
						columns={columns}
					/>
				</TableHead>
				<TableBody>{children}</TableBody>
			</Table>
		</TableContainer>
	);
};

const TableHeader = ({
	columns,
	onCheck,
	isCheck,
	isIntermediate,
}: TableHeaderProps) => {
	return (
		<TableRow sx={{ gap: "1rem" }}>
			<TableCell sx={{ width: 10 }}>
				<Checkbox
					checked={isCheck}
					onChange={(e) => onCheck(e.target.checked ? 1 : null)}
					indeterminate={isIntermediate}
					sx={{
						color: "white",
						"&.Mui-checked": { color: "white" },
						"&.MuiCheckbox-indeterminate": { color: "white" },
					}}
				/>
			</TableCell>
			<TableCell sx={{ width: 10 }}>No.</TableCell>
			{columns.map((column) => (
				<TableCell
					key={column.id}
					align={column.align}
					style={{
						width: column.width,
					}}
				>
					{column.label}
				</TableCell>
			))}
		</TableRow>
	);
};

const TableData = ({
	index,
	row,
	columns,
	onClick,
	onCheck,
	isCheck,
}: TableDataProps) => {
	return (
		<TableRow
			className="MuiTableRow-Data"
			sx={{
				gap: "1rem",
				borderBottom: "1px solid #e0e0e0",
				"&:hover": { background: "secondary.dark", cursor: "pointer" },
				userSelect: "none",
			}}
			onClick={() => onClick(index)}
		>
			<TableCell>
				<Checkbox
					checked={isCheck(row.id)}
					onClick={(e) => {
						e.stopPropagation();
					}}
					onChange={() => {
						onCheck ? onCheck(row.id) : null;
					}}
				/>
			</TableCell>
			<TableCell sx={{ opacity: 0.5 }}>{index}</TableCell>
			{columns.map((column: columnsInterface) => {
				const cellValue = row[column.id as keyof booksRowsInterface];
				const renderValue = () => {
					if (cellValue instanceof Date)
						return cellValue.toDateString();
					if (cellValue === undefined || cellValue === null)
						return "-";
					return cellValue;
				};
				if (column.id === "status") {
					return (
						<TableCell
							key={column.id}
							align={column.align}
							style={{ width: column.width }}
							sx={{
								color: "text.secondary",
							}}
						>
							<GetStatus bookStatus={renderValue()} />
						</TableCell>
					);
				}
				return (
					<TableCell
						key={column.id}
						align={column.align}
						style={{ width: column.width }}
						sx={{
							color: "text.secondary",
						}}
					>
						{renderValue()}
					</TableCell>
				);
			})}
		</TableRow>
	);
};

const GetStatus = ({ bookStatus }: bookStatusInterface) => {
	const theme: Theme = useTheme();

	const getColor = (bookStatus: string): keyof typeof theme.palette => {
		switch (bookStatus) {
			case "available":
				return "success";
				break;
			case "borrowed":
				return "warning";
				break;
			case "reserved":
				return "info";
				break;
			case "lost":
				return "error";
				break;
			default:
				return "primary";
		}
	};
	const color = getColor(bookStatus);
	const palleteColor = theme.palette[color] as {
		main: string;
	};
	return (
		<Chip
			label={bookStatus.toUpperCase()}
			sx={{
				fontSize: "0.8rem",
				width: "100%",
				color: palleteColor.main,
				backgroundColor: alpha(palleteColor.main, 0.3),
				border: `1px solid ${palleteColor.main}`,
				fontWeight: "bold",
			}}
			variant="outlined"
			size="small"
		/>
	);
};

const TableDataCollapsible = ({
	openedRowIndex,
	index,
	children,
}: TableDataCollapsibleProps) => {
	return (
		<TableRow
			sx={{
				bgcolor: "background.paper",
				padding: 0,
			}}
		>
			<TableCell sx={{ padding: 0 }} colSpan={7}>
				<Collapse
					in={index === openedRowIndex}
					timeout="auto"
					unmountOnExit
				>
					{children}
				</Collapse>
			</TableCell>
		</TableRow>
	);
};

export { ViewTable, TableDataCollapsible, TableData, TableHeader, GetStatus };
