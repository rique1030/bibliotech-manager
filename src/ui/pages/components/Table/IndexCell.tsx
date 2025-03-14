import { useContext } from "react";
import StyledCell from "./TableStyledCell";
import { TableSearchContext } from "../../context/TableSearchContext";
import { Box } from "@mui/material";

const IndexCell = ({ index }: { index: number }) => {
	const {
		search: { currentPage: page },
	} = useContext(TableSearchContext);
	
	return (
		<StyledCell
			color={"primary.main"}
			column={{ label: "index", align: "center" }}
			sx={{ width: 40, fontWeight: "bold"}}
		>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					color: "primary.main",
				}}
			>
				{page ? page * 10 + index : 0 * 10 + index}
			</Box>
		</StyledCell>
	);
};

export default IndexCell;
