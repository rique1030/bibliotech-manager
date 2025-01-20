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
	// const isInitialRender = useRef(true);

	React.useEffect(() => {
		if (!statuses.includes(row?.status || "") && row?.status !== "overdue") {
			console.log(row?.status);
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
				return theme.palette.error.main;
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
			variant="filled"
			sx={(theme) => ({
				// color: `${paletteColor}`,
				border: "1px solid",
				backgroundColor: paletteColor,
				color: theme.palette.getContrastText(paletteColor),
				"&.MuiChip-clickable": {
					"&:hover": {
						borderColor: paletteColor,
						color: paletteColor,
						backgroundColor: theme.palette.background.default,
					},
				},
				animation: edit ? "blink 3s infinite" : "none",
				"@keyframes blink": {
					"0%": {
						transform: "scale(1)",
						boxShadow: `0 0 0 0  ${alpha(paletteColor, 0.7)}`,
					},
					"15%": {
						transform: "scale(1.05)",
						boxShadow: `0 0 0 10px ${alpha(paletteColor, 0)}`,
					},
					"30%": {
						transform: "scale(1)",
						boxShadow: `0 0 0 0 ${alpha(paletteColor, 0)}`,
					},
					"100%": {
						transform: "scale(1)",
						boxShadow: `0 0 0 0 ${alpha(paletteColor, 0)}`,
					},
				},
			})}
			// variant="outlined"
			size="small"
		/>
	);
};

export default GetStatus;
