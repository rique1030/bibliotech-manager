import { IconButton, Tooltip } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

const RemoveButton = ({
	onClick,
	sx,
	iconSx,
}: {
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	sx?: any;
	iconSx?: any;
}) => {
	return (
		<Tooltip title="Remove from list" placement="right">
			<IconButton
				onClick={(e) => {
					e.stopPropagation();
					if (onClick) onClick(e);
				}}
				sx={{ p: 0, width: "1.8rem", height: "1.8rem", ...sx }}
			>
				<BackspaceIcon
					sx={{
						color: "primary.main",
						fontSize: "1rem",
						"&:hover": { color: "error.main" },
						...iconSx,
					}}
				/>
			</IconButton>
		</Tooltip>
	);
};

export default RemoveButton;
