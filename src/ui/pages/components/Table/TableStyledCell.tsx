import { Box, styled, TableCell, Typography } from "@mui/material";
type StyledCellProps = {
	children?: any;
	column: any;
	sx?: any;
	borderColor?: string;
	color?: string;
	header?: boolean | false;
};

const StyledCellWrapper = styled(TableCell)(() => ({
	padding: "0px",
	height: "4rem",
	boxSizing: "border-box",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	backgroundColor: "background.paper",
	borderBottom: "1px solid",
	transition: "all 0.2s ease-in-out",
}))

const StyledCell = ({
	borderColor="divider",
	children,
	column,
	sx,
	color="text.secondary",
	header,
}: StyledCellProps) => {
	return (
		<StyledCellWrapper
			sx={{
				...sx,
				maxWidth: sx.width,
				borderColor: borderColor || "secondary.dark",
			}}
			className="MuiTableCell-Header"
		>
			<Box
				sx={{
					"@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
					animation: "fadeIn 0.3s ease-out",
					transition: "width 0.3s ease-in-out",
					display: "flex",
					alignItems: "center",
					height: "100%",
					paddingLeft: "1rem",
					paddingRight: "1rem",
					// maxWidth: "min-content",
					justifyContent:
						column.align === "right"
							? "flex-end"
							: column.align === "center"
							? "center"
							: "flex-start",
				}}
			>
				{typeof children === "string" || typeof children === "number" ? (
					<Typography
						variant= {header ? "overline" : "body2"}
						sx={{
							color: color || "text.primary",
							fontSize: "0.9rem",
							// maxWidth: "min-content",
							// maxWidth: "100%",
							fontWeight: header ? "bold" : "normal",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							fontFamily: column.align === "right" ? "Roboto Mono" : "inherit",
						}}
					>
						{children}
					</Typography>
				) : (
					children
				)}
			</Box>
		</StyledCellWrapper>
	);
};

export default StyledCell;
