import { Box, Chip } from "@mui/material";
import StyledCell from "./TableStyledCell";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import convertToLetterCase from "../../helper/ConvertToLetterCase";

interface RoleChipProps {
	column: columnsInterface;
	newValue: string;
	color?: string;
	wrapped?: boolean
	width?: number
}

const RoleChip = ({ column, newValue, color, wrapped=true, width }: RoleChipProps) => {

	const MainChip = (
		<Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
			<Chip
				size="small"
				label={convertToLetterCase(newValue)}
				icon={<AccountCircleOutlinedIcon color="inherit" />}
				sx={(theme) => ({
					"& .MuiChip-root": {
						display: "flex",
					},
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
					lineHeight: "inherit",
					backgroundColor: color || "#5b40e4",
					color: theme.palette.getContrastText(color || "#5b40e4"),
					borderColor: color,
					minWidth: 0,
				})}
			/>
		</Box>
	)

	const WrappedChip = (
		<StyledCell column={column} sx={{width: width}} >
			{MainChip}
		</StyledCell>
		
	)

	return wrapped ? WrappedChip : MainChip
};

export default RoleChip;
