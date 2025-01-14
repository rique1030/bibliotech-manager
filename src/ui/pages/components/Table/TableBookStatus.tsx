import { Chip, Theme, useTheme, alpha, styled } from "@mui/material";
import React, { useRef, useState } from "react";
import { TableContext } from "../../context/TableContext";
import { Transform } from "@mui/icons-material";

const StyledChip = styled(Chip)(({ theme }: { theme: Theme }) => ({
	justifySelf: "center",
	fontSize: "0.8rem",
	width: 150,
	fontWeight: "bold",
	"&.MuiChip-clickable": {
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			color: "white",
		},
		cursor: "pointer",
	},
	"@keyframes blink": {
		"0%": {
			//backgroundColor: alpha(theme.palette.text.secondary, 0.5),
			Transform: "scale(0.95)",
			boxShadow: `0 0 0 0 ${alpha(theme.palette.text.secondary, 0.7)}`,
		},
		"50%": {
			//backgroundColor: alpha(theme.palette.text.secondary, 0.4),
			Transform: "scale(1)",
			boxShadow: `0 0 0 10px ${alpha(theme.palette.text.secondary, 0)}`,
		},
		"100%": {
			//backgroundColor: alpha(theme.palette.text.secondary, 0.5),
			Transform: "scale(0.95)",
			boxShadow: `0 0 0 0 ${alpha(theme.palette.text.secondary, 0)}`,
		},
	},
}));

const GetStatus = ({
	row,
	status: statusProp,
	edit,
}: {
	row: booksRowsInterface | BookPayload;
	status: string;
	edit?: boolean | false;
}) => {
	const { handleEditEntry } = React.useContext(TableContext);
	const statuses: bookStatusInterface["bookStatus"][] = [
		"available",
		"borrowed",
		"reserved",
		"lost",
	];
	const [statusIndex, setStatusIndex] = useState(1);
	const [statusDisplay, setStatusDisplay] = useState("select status");
	const isInitialRender = useRef(true);

	React.useEffect(() => {
		if (!statuses.includes(row?.status || "")) {
			if (edit) {
				return setStatusDisplay("Click Me");
			}
			return setStatusDisplay("select status");
		}
		setStatusDisplay(row?.status);
	}, [row?.status]);

	const handleChangeStatus = () => {
		if (!edit) return;

		if (!statuses.includes(statusProp || "")) {
			handleEditEntry?.(row.id, "status", statuses[0]);
			return;
		}
		setStatusIndex((statusIndex) => (statusIndex + 1) % statuses.length);
		handleEditEntry?.(row.id, "status", statuses[statusIndex]);
	};

	const theme: Theme = useTheme();

	const getColor = (bookStatus: string): any => {
		switch (bookStatus) {
			case "available":
				return theme.palette.success.main;
				break;
			case "borrowed":
				return theme.palette.warning.main;
				break;
			case "reserved":
				return theme.palette.info.main;
				break;
			case "lost":
				return theme.palette.error.main;
				break;
			case "overdue":
				return theme.palette.primary.main;
				break;
			default:
				return theme.palette.primary.main;
			//alpha(theme.palette.text.secondary, 0.5);
		}
	};
	const paletteColor = getColor(statusDisplay);
	return (
		<StyledChip
			onClick={edit ? handleChangeStatus : undefined}
			label={statusDisplay.toUpperCase()}
			sx={{
				color: `${paletteColor}`,
				backgroundColor: `${alpha(paletteColor, 0.3)}`,
				border: `1px solid ${paletteColor}`,
				"&.MuiChip-clickable": {
					"&:hover": {
						borderColor: paletteColor,
						backgroundColor: paletteColor,
					},
				},
				animation:
					(statusDisplay.toUpperCase() === "STATUS" || statusDisplay === "") &&
					edit
						? "blink 2s infinite"
						: "none",
			}}
			variant="outlined"
			size="small"
		/>
	);
};

export default GetStatus;
