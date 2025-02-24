import {
	Paper,
	Table,
	Theme,
	Box,
	Typography,
	CircularProgress,
	Grid2,
} from "@mui/material";
import React, { useContext } from "react";
import { TableContext } from "../../context/TableContext";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";

interface ViewTableProps {
	children: React.ReactNode;
	isLoading?: boolean;
	image?: boolean;
}

const ViewTable: React.FC<ViewTableProps> = ({
	children,
	isLoading = false,
	image = false,
}) => {
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
			elevation={0}
			sx={(theme: Theme) => ({
				flex: 1,
				padding: 0,
				margin: 0,
				overflowX: "hidden",
				position: "relative",
				borderRadius: theme.shape.borderRadius,
				border: "1px solid",
				borderColor: "divider",
				backgroundColor: "background.paper",
			})}
		>
			{!image ? (
				<>
					<Table stickyHeader>{children}</Table>
					{rows.length === 0 && (
						<ContentIndicator isLoading={isLoading} fade={fade} />
					)}
				</>
			) : (
				<Box
					sx={{
						height: "100%",
						width: "100%",
						display: "flex",
						overflow: "auto",
						position: "relative",
					}}
				>
					<Box
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							display: "flex",
							justifyContent: "center",
						}}
					>
						{rows.length === 0 ? (
							<ContentIndicator isLoading={isLoading} fade={fade} />
						) : (
							<Grid2
								container
								columns={5}
								columnSpacing={"2.5%"}
								rowSpacing={"1rem"}
								sx={{
									margin: "10px",
									height: "fit-content",
									width: "100%",
								}}
							>
								{children}
							</Grid2>
						)}
					</Box>
				</Box>
			)}
		</Box>
	);
};
const ContentIndicator = React.memo(function ({
	isLoading,
	fade,
}: {
	isLoading: boolean;
	fade: boolean;
}) {
	return (
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
				transition: "opacity 0.3s ease-in-out",
			}}
		>
			{isLoading ? (
				<CircularProgress color="primary" size={50} />
			) : (
				<HighlightAltIcon sx={{ fontSize: 200, color: "text" }} />
			)}
			<Typography variant="h5" sx={{ color: "text", fontWeight: "bold" }}>
				{isLoading ? "Fetching data" : "No results"}
			</Typography>
		</Box>
	);
});

export default ViewTable;
