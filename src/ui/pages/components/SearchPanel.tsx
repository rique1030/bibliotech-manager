import {
	Autocomplete,
	Box,
	IconButton,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { TableSearchContext } from "../context/TableSearchContext";
import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import ReplayIcon from "@mui/icons-material/Replay";

const SearchPanel = () => {
	const {
		search: { refresh },
	} = useContext(TableSearchContext);
	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				boxSizing: "border-box",
				gap: "2rem",
			}}
		>
			<SearchBar />
			<IconButton onClick={refresh} color="primary" sx={{ height: "2rem" }}>
				<ReplayIcon />
			</IconButton>
			<SearchFilter />
		</Box>
	);
};

const SearchBar = () => {
	const {
		search: { suggestions, filterTerm, setSearchTerm },
	} = useContext(TableSearchContext);

	const { availableRoles } = useContext(TableContext);

	const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		let searchTerm: any = e.target.value;
		if (filterTerm === "is_verified") {
			switch (searchTerm) {
				case "true":
					searchTerm = "1";
					break;
				case "false":
					searchTerm = "0";
					break;
				default:
					searchTerm = "";
					break;
			}
		} else if (filterTerm === "role_id") {
			const roleIndex = availableRoles.find(
				(role) => role.role_name === e.target.value
			)?.id;
			searchTerm = roleIndex;
		}

		setSearchTerm(searchTerm);
	};

	if (!suggestions) {
		return (
			<TextField
				onChange={(e) => handleSubmit(e as any)}
				label="Search"
				size="small"
				sx={{ width: "100%", maxWidth: "300px" }}
			/>
		);
	}
	return (
		<Autocomplete
			clearOnBlur={false}
			disablePortal
			id="combo-box-demo"
			options={suggestions || []}
			sx={{
				minWidth: 10,
				width: "100%",
				maxWidth: "600px",
			}}
			onInputChange={(_, value) => handleSubmit({ target: { value } } as any)}
			renderInput={(params) => (
				<TextField {...params} label="Search" size="small" />
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
		<Box sx={{ display: "flex", gap: "1rem" }}>
			<Typography
				variant="overline"
				sx={{ fontWeight: "bold", color: "primary.main", whiteSpace: "nowrap" }}
			>
				Filter By:
			</Typography>
			<ToggleButtonGroup
				value={filterTerm}
				exclusive
				onChange={handleAlignment}
			>
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
		</Box>
	);
};

export default SearchPanel;
