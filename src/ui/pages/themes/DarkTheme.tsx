import { backdropClasses } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  typography: {
    fontFamily: "Roboto, Inter, sans-serif",
  },
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#121212",
    },
    primary: {
      main: "#5B40E4",
    },
    action: {
      active: "#5B40E4",
    },
    text: {
      primary: "#ffffff",
      secondary: "#A2A2A2",
    },
    divider: "#303030",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          transition: "transform 0.3s ease-in-out",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            background: "rgba(91, 64, 228, 0.25)",
          },
          transition: "background-color 0.2s ease-in-out",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "background.default",
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "1px solid #e0e0e0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#5b40e4",
          "& th": {
            color: "white",
            fontWeight: "bold",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#5b40e4",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#5b40e4",
            },
          },
          "&:hover": {
            backgroundColor: "rgba(91, 64, 228, 0.25)",
          },
          transition: "background-color 0.2s ease-in-out",
          borderColor: "#5b40e4",
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#5b40e4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5b40e4",
            },
          },
        },
      },
    },
  },
});

export default darkTheme;
