import { Box, TableCell, Typography } from "@mui/material";
type StyledCellProps = {
	children?: any;
	column: any;
	length: number;
	index: number;
	sx?: any;
	borderColor?: string;
	color?: string;
};

const StyledCell = ({
	borderColor,
	children,
	column,
	length,
	index,
	sx,
	color,
}: StyledCellProps) => {
	return (
		<TableCell
			sx={{
				padding: "0px",
				height: "4rem",
				boxSizing: "border-box",
				...sx,
				minWidth: column.minWidth || "auto",
				maxWidth: column.maxWidth || "auto",
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
				backgroundColor: "background.default",
				borderBottom: "2px solid",
				borderColor: borderColor || "secondary.dark",
			}}
			className="MuiTableCell-Header"
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					borderRight: length - 1 !== index ? "2px solid" : "0px",

					borderColor: borderColor || "secondary.dark",
					// height: "1.5rem",
					height: "100%",
					paddingLeft: "1rem",
					paddingRight: "1rem",
					justifyContent: column.align === "right" ? "flex-end" : "flex-start",
					transition: "all 0.2s ease-in-out",
				}}
			>
				{typeof children === "string" ? (
					<Typography
						sx={{
							color: color || "text.primary",
							fontSize: "0.9rem",
							fontWeight: "bold",
							maxWidth: "100%",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							transition: "all 0.2s ease-in-out",
							fontFamily: column.align === "right" ? "Roboto Mono" : "inherit",
						}}
					>
						{children}
					</Typography>
				) : (
					children
				)}
			</Box>
		</TableCell>
	);
};

export default StyledCell;
