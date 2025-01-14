import { IconButton, Tooltip } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

const RemoveButton = ({
	onClick,
}: {
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
	return (
		<Tooltip title="Remove from list" placement="right">
			<IconButton
				onClick={(e) => {
					e.stopPropagation();
					if (onClick) onClick(e);
				}}
				sx={{ p: 0, width: "1.8rem", height: "1.8rem" }}
			>
				<BackspaceIcon
					sx={{
						color: "primary.main",
						fontSize: "1rem",
						"&:hover": { color: "error.main" },
					}}
				/>
			</IconButton>
		</Tooltip>
	);
};

export default RemoveButton;
