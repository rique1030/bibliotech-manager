import { Box, Chip } from "@mui/material";
import StyledCell from "./TableStyledCell";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import convertToLetterCase from "../../helper/ConvertToLetterCase";

interface RoleChipProps {
	column: columnsInterface;
	columns: any[];
	newValue: string;
	color?: string;
	wrapped?: boolean
}

const RoleChip = ({ column, columns, newValue, color, wrapped=true }: RoleChipProps) => {

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
					// width: "8rem",
					minWidth: 0,
				})}
			/>
		</Box>
	)

	const WrappedChip = (
		<StyledCell
			borderColor="divider"
			column={column}
			index={columns.indexOf(column)}
			key={column.id}
			length={columns.length}
		>
			{MainChip}
		</StyledCell>
		
	)

	return wrapped ? WrappedChip : MainChip
};

export default RoleChip;
