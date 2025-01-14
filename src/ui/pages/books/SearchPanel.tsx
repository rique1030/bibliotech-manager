import {
	Autocomplete,
	Box,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import { TableSearchContext } from "../context/TableSearchContext";
import { useContext } from "react";

const SearchPanel = () => {
	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				boxSizing: "border-box",
			}}
		>
			<SearchBar />
			<SearchFilter />
		</Box>
	);
};

const SearchBar = () => {
	const {
		search: { suggestions, setSearchTerm },
	} = useContext(TableSearchContext);
	if (!suggestions) {
		return (
			<TextField
				onChange={(e) => setSearchTerm(e.target.value)}
				label="Search"
				size="small"
				sx={{ width: "100%", maxWidth: "300px" }}
			/>
		);
	}
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={suggestions || []}
			sx={{
				minWidth: 10,
				width: "100%",
				maxWidth: "300px",
			}}
			onInputChange={(_, value) => setSearchTerm(value)}
			renderInput={(params) => (
				<TextField
					{...params}
					// onChange={(e) => onChange(e.target.value)}
					label="Search"
					size="small"
				/>
			)}
		/>
	);
};

const SearchFilter = () => {
	const {
		search: { setFilterTerm, filterTerm },
		searchFilter,
	} = useContext(TableSearchContext);

	const handleAlignment = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if (newAlignment !== null) {
			setFilterTerm(newAlignment);
		}
	};

	return (
		<ToggleButtonGroup value={filterTerm} exclusive onChange={handleAlignment}>
			{searchFilter?.map(
				({ filter, value }: { filter: string; value: string }) => (
					<ToggleButton
						value={value}
						key={value}
						size="small"
						sx={{
							width: "4rem",

							fontSize: "0.8rem",
							textTransform: "capitalize",
						}}
					>
						{filter}
					</ToggleButton>
				)
			)}
		</ToggleButtonGroup>
	);
};

export default SearchPanel;
