import { useContext } from "react";
import { TableContext } from "../../../context/TableContext";
import { Box, MenuItem, Select, Tooltip, Typography } from "@mui/material";

export default function CallNumberDropdown() {
	const {
		callNoFormatter: { formats, currentFormat, handleChangeFormat },
	} = useContext(TableContext);
    
	return (
		<Select
			size="small"
			value={currentFormat.id}
			onChange={(e) => handleChangeFormat(e.target.value)}
			sx={{ width: "15rem" }}
		>
			{formats.map((format) => {
				return (
					<MenuItem key={format.id} value={format.id}>
						<Tooltip
							slotProps={{
								popper: {
									modifiers: [
										{
											name: "offset",
											options: {
												offset: [0, 30],
											},
										},
									],
								},
							}}
							title={<TooltipContents {...format} />}
							placement="right"
							arrow
						>
							<Typography
								sx={{
									width: "100%",
									overflow: "hidden",
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
								}}
							>
								{format.name}
							</Typography>
						</Tooltip>
					</MenuItem>
				);
			})}
		</Select>
	);
}

export function TooltipContents({
	name,
	format,
	description,
}: {
	name: string;
	format: string;
	description: string;
}) {
	return (
		<Box
			gap={1}
			sx={{
				display: "flex",
				flexDirection: "column",
				padding: 1,
				boxSizing: "border-box",
			}}
		>
			<Typography variant="h4" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
				{name}
			</Typography>
			<Typography
				sx={{
					color: "text.secondary",
					fontSize: "0.8rem",
					padding: "0.5rem",
					borderRadius: "0.5rem",
				}}
			>
				{format}
			</Typography>
			<Typography
				component={"code"}
				sx={{
					backgroundColor: "#444",
					fontSize: "0.8rem",
					padding: "0.5rem",
					borderRadius: "0.2rem",
				}}
			>
				{description}
			</Typography>
		</Box>
	);
}
