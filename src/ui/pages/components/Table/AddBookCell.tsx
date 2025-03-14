import { Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRoute, routes } from "../../Router";
import StyledCell from "./TableStyledCell";
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function AddBookCell({row}: any) {
	const navigate = useNavigate();
	
	return (
	<StyledCell sx={{minWidth: "3rem", maxWidth: "3rem"}} borderColor="divider" column={{ label: "add", align: "center" }} >
		<Tooltip title="Add book" placement="right">
			<IconButton
				onClick={(e) => {
					e.stopPropagation();
					navigate(getRoute(routes.COPIES.INSERT), { state: row });
				}}
				sx={{ p: 0, width: "1.8rem", height: "1.8rem"}}
			>
				<AddBoxIcon 
					sx = {{
						color: "primary.main",
						fontSize: "2rem",
						"&:hover": { color: "error.main" },
					}}
				/>
			</IconButton>
		</Tooltip>
	</StyledCell>);
}