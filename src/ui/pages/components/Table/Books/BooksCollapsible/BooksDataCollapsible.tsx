import {
	Autocomplete,
	Box,
	Chip,
	createFilterOptions,
	styled,
	TextField,
} from "@mui/material";
import CollapsibleCotainer from "../../../StyledComponent/CollapsibleContainer";
import CoverAndStatusContainer from "./CoverAndStatusContainer";
import TopDescriptionContainer from "./TopDescriptionContainer";
import DetailsContainer from "../../../StyledComponent/DetailsContainer";
import DetailsTextfield from "../../DetailsTextField";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useEffect, useRef, useState } from "react";
import { TableContext } from "../../../../context/TableContext";

const BooksDataCollapsible = ({
	row,
	isEditable,
}: {
	row: booksRowsInterface | BookPayload;
	isEditable?: boolean;
}) => {
	return (
		<CollapsibleCotainer>
			<CoverAndStatusContainer edit={isEditable} row={row} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					width: "100%",
				}}
			>
				<TopDescriptionContainer row={row} isEditable={isEditable} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						width: "100%",
					}}
				>
					<DetailsContainer>
						<DetailsTextfield
							disabled={!isEditable}
							label="Description"
							iniitialValue={row.description || ""}
							required={false}
							multiline
							rows={4}
							sx={{ maxWidth: "50%" }}
							slotProps={{ htmlInput: { maxLength: 255 } }}
							dataIndex={{ id: row.id || 0, key: "description" }}
						/>
						<CategorySelector row={row} edit={isEditable} />
					</DetailsContainer>
				</Box>
			</Box>
		</CollapsibleCotainer>
	);
};

const ChipInputBase = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	border: "none",
	borderRadius: "100rem",
}));
const ChipInput = styled(TextField)(() => ({
	"& .MuiInputBase-input": {
		color: "white",
		fontSize: "0.8rem",
		"&:after": { display: "none" },
		"&:before": { display: "none" },
	},
	"& .Mui-disabled": {
		color: "white",
		WebkitTextFillColor: "white",
	},

	"& .MuiOutlinedInput-notchedOutline": {
		border: "none",
	},
}));

const ChipAutoComplete = styled(Autocomplete)(() => ({
	transition: "all 0.2s ease-in-out",
	maxWidth: "10rem",
	boxSizing: "border-box",
	position: "relative",
	"& .MuiInputBase-root": {
		padding: "0.5rem !important",
	},
}));

function CategorySelector({ row, edit }: any) {
	const { handleEditEntry, availableCategories } = useContext(TableContext);
	const handleAdd = (newValue: any) => {
		if (!newValue) return;

		const savedValue = row?.book_categories?.find(
			(v: any) => v?.id === newValue?.id
		)
			? row?.book_categories.filter((v: any) => v?.id !== newValue?.id)
			: [...row?.book_categories, newValue];

		handleEditEntry(row.id, "book_categories", savedValue);
	};

	useEffect(() => {
		if (row?.book_category_ids && !row.book_categories) {
			row.book_categories = [];
			const newBookCategories = availableCategories.filter((category: any) =>
				row.book_category_ids.includes(category.id)
			);
			handleEditEntry(row.id, "book_categories", newBookCategories);
		}
	}, [row]);

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				border: "1px solid",
				borderColor: "action.disabled",
				width: "100%",
				padding: "0.5rem",
				gap: "0.5rem",
				boxSizing: "border-box",
				maxWidth: "50%",
				maxHeight: "5.5rem",
				overflow: "auto",
				"&::-webkit-scrollbar": {
					display: "block",
				},
			}}
		>
			{row?.book_categories?.map((category: any) => (
				<Chip
					key={category?.id}
					label={category?.name}
					onDelete={edit ? () => handleAdd(category) : undefined}
					color="primary"
					variant="outlined"
					sx={{
						padding: "0.5rem",
						boxSizing: "border-box",
						height: edit ? "2.5rem" : "1.5rem",
						borderRadius: "100rem",
						"& .MuiChip-deleteIcon": {
							fontSize: "1.5rem",
						},
					}}
				/>
			))}
			{edit && <ChipAutocomplete handleAdd={handleAdd} />}
		</Box>
	);
}

function ChipAutocomplete({ handleAdd }: { handleAdd: any }) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [autoValue, setAutoValue] = useState<string>("");
	const [open, setOpen] = useState(false);
	const filterOptions = createFilterOptions({
		limit: 8,
	});
	const { availableCategories } = useContext(TableContext);
	const handleOpen = () => {
		setOpen(!open);
	};

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, [open]);

	return (
		<ChipAutoComplete
			filterOptions={filterOptions}
			autoFocus
			disablePortal
			disabled={!open}
			options={availableCategories}
			getOptionLabel={(option: any) => option.name}
			inputValue={autoValue}
			onInputChange={(_, newInputValue) => {
				setAutoValue(newInputValue);
			}}
			value={null}
			onChange={(_, value) => {
				handleAdd(value);
				setAutoValue("");
			}}
			id="combo-box-demo"
			sx={{
				width: open ? "100%" : "min-content",
				minWidth: open ? "fit-content" : 0,
			}}
			renderInput={(params) => (
				<ChipInputBase ref={params.InputProps.ref}>
					<ChipInput
						placeholder="Add category..."
						type="text"
						{...params.inputProps}
						inputRef={inputRef}
						onBlur={() => setOpen(false)}
						color="primary"
						size="small"
						sx={{
							transition: "all 0.2s ease-in-out",
							"& input": {
								transition: "all 0.2s ease-in-out",
								width: open ? "100%" : 0,

								padding: open ? "0px 0.5rem" : 0,
							},
						}}
						slotProps={{
							input: {
								endAdornment: (
									<CancelIcon
										sx={{
											padding: "0rem",
											fontSize: "1.5rem",
											fill: "white",
											cursor: "pointer",
											transition: "transform 0.2s ease-in-out",
											transform: open ? "rotate(0deg)" : "rotate(-135deg)",
										}}
										onClick={handleOpen}
									/>
								),
							},
						}}
					/>
				</ChipInputBase>
			)}
		/>
	);
}

export default BooksDataCollapsible;
