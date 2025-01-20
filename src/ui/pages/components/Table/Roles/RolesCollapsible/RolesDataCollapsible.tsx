import {
	Box,
	Checkbox,
	Divider,
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import CollapsibleCotainer from "../../../StyledComponent/CollapsibleContainer";
import { HexColorPicker } from "react-colorful";
import { BorderAll, BorderColor } from "@mui/icons-material";
import DetailsTextfield from "../../DetailsTextField";
import { useContext } from "react";
import { TableContext } from "../../../../context/TableContext";

type Props = {
	row: any;
	isEditable?: boolean;
};

const StyledColorPicker = styled(HexColorPicker)(({ theme }) => ({
	"&.react-colorful": {
		width: "100%",
		minWidth: "60px",
		gap: "1rem",
	},
	"& .react-colorful__saturation": {
		borderRadius: theme.shape.borderRadius,
	},

	"& .react-colorful__hue": {
		borderRadius: theme.shape.borderRadius,
	},
	"& .react-colorful__pointer": {
		width: "1rem",
		height: "1rem",
		borderWidth: "4px",
		boxShadow: `1px 2px 5px 0px rgba(0, 0, 0, 0.5)`,
		// outline: `1px solid ${theme.palette.text.secondary}`,
	},
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
	"& td:first-of-type": {
		fontWeight: "bold !important",
		borderRight: "1px solid",
		borderBottom: 0,
		borderColor: theme.palette.divider,
	},
}));

const StyledCell = styled(TableCell)(() => ({
	height: "0rem",
	padding: "1rem",
	minWidth: "2rem",
}));

const StyledHeadCell = styled(StyledCell)(() => ({
	fontWeight: "bold !important",
	backgroundColor: "background.default !important",
	"& th": {},
}));

const StyledBodyCell = styled(StyledCell)(() => ({
	justifyContent: "center",
}));

const CheckboxContainer = styled(Box)(() => ({
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}));

export default function RolesDataCollapsible({ row, isEditable }: Props) {
	return (
		<CollapsibleCotainer>
			<Box
				component={Paper}
				elevation={0}
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: 2,
					width: "100%",
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							padding: "1rem",
							boxSizing: "border-box",
						}}
					>
						<DetailsTextfield
							sx={{ width: "100%" }}
							label="Name"
							dataIndex={{ id: row.id, key: "role_name" }}
							required={isEditable || false}
							disabled={!isEditable}
							iniitialValue={row.role_name || ""}
						/>
						<DetailsTextfield
							sx={{ flexGrow: 1 }}
							label="Notes"
							dataIndex={{ id: row.id, key: "notes" }}
							disabled={!isEditable}
							iniitialValue={row.notes || ""}
							multiline
							rows={3}
						/>
					</Box>
					<Divider variant="fullWidth" />
					<Box>
						<PermissionTable isEditable={isEditable} row={row} />
					</Box>
				</Box>
			</Box>
		</CollapsibleCotainer>
	);
}

const PermissionTable = ({ row, isEditable }: Props) => {
	const { handleEditEntry: handleEdit } = useContext(TableContext);

	return (
		<Table>
			<TableHead
				sx={{
					"& th": {
						color: "text.primary",
						borderBottom: "1px solid",
						borderColor: "divider",
					},
				}}
			>
				<StyledRow>
					<StyledHeadCell>TABLES</StyledHeadCell>
					<StyledHeadCell>
						<CheckboxContainer>VIEW</CheckboxContainer>
					</StyledHeadCell>
					<StyledHeadCell>
						<CheckboxContainer>ADD</CheckboxContainer>
					</StyledHeadCell>
					<StyledHeadCell>
						<CheckboxContainer>EDIT</CheckboxContainer>
					</StyledHeadCell>
					<StyledHeadCell>
						<CheckboxContainer>REMOVE</CheckboxContainer>
					</StyledHeadCell>
					{isEditable && (
						<StyledHeadCell>
							<CheckboxContainer>COLOR</CheckboxContainer>
						</StyledHeadCell>
					)}
				</StyledRow>
			</TableHead>
			<TableBody>
				<StyledRow>
					<StyledCell>USERS</StyledCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.account_view}
								onChange={(e) =>
									handleEdit(row.id, "account_view", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.account_insert}
								onChange={(e) =>
									handleEdit(row.id, "account_insert", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.account_update}
								onChange={(e) =>
									handleEdit(row.id, "account_update", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.account_delete}
								onChange={(e) =>
									handleEdit(row.id, "account_delete", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					{isEditable && (
						<StyledBodyCell
							sx={{
								fontWeight: "bold !important",
								borderLeft: "1px solid",
								borderBottom: 0,
								borderColor: "divider",
							}}
							rowSpan={4}
						>
							<CheckboxContainer>
								<StyledColorPicker
									color={row.color}
									onChange={(newColor) => handleEdit(row.id, "color", newColor)}
								/>
							</CheckboxContainer>
						</StyledBodyCell>
					)}
				</StyledRow>
				<StyledRow>
					<StyledCell>ROLES</StyledCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.roles_view}
								onChange={(e) =>
									handleEdit(row.id, "roles_view", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.roles_insert}
								onChange={(e) =>
									handleEdit(row.id, "roles_insert", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.roles_update}
								onChange={(e) =>
									handleEdit(row.id, "roles_update", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.roles_delete}
								onChange={(e) =>
									handleEdit(row.id, "roles_delete", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
				</StyledRow>
				<StyledRow>
					<StyledCell>BOOKS</StyledCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.books_view}
								onChange={(e) =>
									handleEdit(row.id, "books_view", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.books_insert}
								onChange={(e) =>
									handleEdit(row.id, "books_insert", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.books_update}
								onChange={(e) =>
									handleEdit(row.id, "books_update", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.books_delete}
								onChange={(e) =>
									handleEdit(row.id, "books_delete", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
				</StyledRow>
				<StyledRow>
					<StyledCell>CATEGORIES</StyledCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.categories_view}
								onChange={(e) =>
									handleEdit(row.id, "categories_view", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.categories_insert}
								onChange={(e) =>
									handleEdit(row.id, "categories_insert", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.categories_update}
								onChange={(e) =>
									handleEdit(row.id, "categories_update", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
					<StyledBodyCell>
						<CheckboxContainer>
							<Checkbox
								defaultChecked={row.categories_delete}
								onChange={(e) =>
									handleEdit(row.id, "categories_delete", e.target.checked)
								}
								disabled={!isEditable || false}
							/>
						</CheckboxContainer>
					</StyledBodyCell>
				</StyledRow>
			</TableBody>
		</Table>
	);
};
