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
import {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { TableContext } from "../../../../context/TableContext";

const SmallDetails = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	width: "100%",
}));

const BookDetailsContainer = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	width: "100%",
}));

const BooksDataCollapsible = ({
	row,
	edit,
}: {
	row: booksRowsInterface | BookPayload;
	edit?: boolean;
}) => {
	return (
		<CollapsibleCotainer>
			<BookDetailsContainer>
				<Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
					<CoverAndStatusContainer edit={edit} row={row} />
					<SmallDetails>
						<TopDescriptionContainer row={row} edit={edit} />
						<DetailsContainer>
							<DetailsTextfield
								disabled={!edit}
								label="Description"
								iniitialValue={row.description || ""}
								required={false}
								multiline
								rows={2}
								sx={{ maxWidth: "100%" }}
								slotProps={{ htmlInput: { maxLength: 255 } }}
								dataIndex={{ id: row.id, key: "description" }}
							/>
						</DetailsContainer>
					</SmallDetails>
				</Box>
				<CategorySelector row={row} edit={edit} />
			</BookDetailsContainer>
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
	transition: "width 0.2s ease-in-out",
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

		console.log(newValue);

		const categories = Array.isArray(row?.book_categories)
			? row.book_categories
			: [];

		const savedValue = categories.find((v: any) => v?.id === newValue?.id)
			? categories.filter((v: any) => v?.id !== newValue?.id)
			: [...categories, newValue];
		console.log(savedValue);
		handleEditEntry(row.id, "book_categories", savedValue);
	};

	useLayoutEffect(() => {
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
				minHeight: "5.5rem",
				maxHeight: "5.5rem",
				overflow: "auto",
				"&::-webkit-scrollbar": {
					display: "block",
				},
			}}>
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
	const { availableCategories, refetch } = useContext(TableContext);
	const handleOpen = () => {
		setOpen(!open);
	};

	useLayoutEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, [open]);

	useEffect(() => {
		refetch();
	}, []);

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
				// maxWidth: "10rem",
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
