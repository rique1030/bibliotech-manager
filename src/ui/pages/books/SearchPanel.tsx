import {
  Autocomplete,
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

interface SearchSuggestion {
  suggestions?: string[];
}

interface SearchPanelProps {
  children: React.ReactNode;
}

const SearchPanel = ({ children }: SearchPanelProps) => {
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
      {children}
    </Box>
  );
};

const SearchBar = ({ suggestions }: SearchSuggestion) => {
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
      renderInput={(params) => (
        <TextField {...params} label="Search" size="small" />
      )}
    />
  );
};

interface SearchFilterProps {
  contents?: { filter: string; value: string }[];
  value?: string;
  onChange?: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => void;
}

const SearchFilter = ({ contents, value, onChange }: SearchFilterProps) => {
  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChange}>
      {contents?.map(({ filter, value }) => (
        <ToggleButton
          value={value}
          key={value}
          size="small"
          sx={{
            width: "7rem",
            fontSize: "0.8rem",
            textTransform: "capitalize",
          }}
        >
          {filter}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export { SearchPanel, SearchBar, SearchFilter };
