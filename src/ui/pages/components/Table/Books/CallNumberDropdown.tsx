import { useContext } from "react";
import { TableContext } from "../../../context/TableContext";
import {
	Box,
	Divider,
	MenuItem,
	Select,
	Tooltip,
	Typography,
} from "@mui/material";
import { LabeledSelect } from "../Accounts/AccountsCollapsible/AccountsDataCollapsible";

export default function CallNumberDropdown() {
	const {
		callNoFormatter: { formats, currentFormat, handleChangeFormat },
	} = useContext(TableContext);

	return (
		<LabeledSelect
			label="Call Number Format"
			size="small"
			value={currentFormat.id}
			onChange={(e: any) => handleChangeFormat(e.target.value)}
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
								tooltip: {
									sx: {
										maxWidth: "20rem",
										padding: 0,
									},
								},
							}}
							title={<TooltipContents {...format} />}
							placement="right"
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
		</LabeledSelect>
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
				boxSizing: "border-box",
			}}
		>
			<Typography
				variant="h4"
				sx={{
					color: "text.primary",
					padding: "1rem",
					fontSize: "1rem",
					fontWeight: "bold",
				}}
			>
				{name}
			</Typography>
			<Divider />
			<Typography
				variant="caption"
				sx={{ padding: "0px 1rem", fontWeight: "bold" }}
			>
				{format}
			</Typography>
			<Typography
				variant="body2"
				sx={(theme) => ({
					fontSize: "0.8rem",
					padding: "0.5rem 1rem",
					borderRadius: "0.2rem",
				})}
			>
				{description}
			</Typography>
		</Box>
	);
}
