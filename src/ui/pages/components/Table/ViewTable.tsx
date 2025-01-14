import { Paper, Table, Theme, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TableContext } from "../../context/TableContext";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";

interface ViewTableProps {
	children: React.ReactNode;
}

const ViewTable: React.FC<ViewTableProps> = ({ children }) => {
	const [fade, setFade] = React.useState(false);

	const {
		rowData: { rows },
	} = useContext(TableContext);
	React.useEffect(() => {
		if (!rows.length) {
			setTimeout(() => {
				setFade(true);
			}, 500);
		}
		setFade(false);
	}, [rows]);

	return (
		<Box
			component={Paper}
			elevation={4}
			sx={(theme: Theme) => ({
				flex: 1,
				padding: 0,
				margin: 0,
				overflowX: "hidden",
				position: "relative",
				borderRadius: theme.shape.borderRadius,
			})}
		>
			<Table stickyHeader>{children}</Table>
			{rows.length === 0 && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						position: "absolute",
						top: 0,
						left: 0,
						height: "100%",
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						opacity: fade ? 0.5 : 0,
						transition: "opacity 0.5s ease-in-out",
					}}
				>
					<HighlightAltIcon sx={{ fontSize: 200, color: "text" }} />
					<Typography variant="h5" sx={{ color: "text", fontWeight: "bold" }}>
						No results
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default ViewTable;
