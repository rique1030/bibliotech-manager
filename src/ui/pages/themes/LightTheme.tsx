import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
	typography: {
		fontFamily: "Roboto, Inter, sans-serif",
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},

	shape: {
		borderRadius: 2,
	},

	mixins: {
		toolbar: {
			minHeight: 56,
		},
	},

	transitions: {
		easing: {
			easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
			easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
			easeIn: "cubic-bezier(0.4, 0, 1, 1)",
			sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
		},
		duration: {
			shortest: 150,
			shorter: 200,
			short: 250,
			standard: 300,
			complex: 375,
			enteringScreen: 225,
			leavingScreen: 195,
		},
	},

	palette: {
		mode: "light",
		background: {
			paper: "#ffffff",
			default: "#f4f6f8",
		},
		primary: {
			light: "#d2c7f6",
			main: "#5b40e4",
			dark: "#3b33d4",
		},
		secondary: {
			light: "#d2c6f4",
			main: "#7b59e2",
			dark: "#5436d5",
		},
		action: {
			active: "#3220e6",
		},
		text: {
			primary: "#000000",
			secondary: "#6e6e6e",
		},
		divider: "#e0e0e0",
		error: {
			main: colors.red[500],
		},
		warning: {
			main: colors.orange[500],
		},
		success: {
			main: colors.green[500],
		},
		info: {
			main: colors.blue[500],
		},
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
					"& .MuiSpan-Bold": {
						fontWeight: "bold",
						color: "#5b40e4",
					},
					overflowY: "scroll",
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					"& th": {
						backgroundColor: "#5b40e4",
						color: "#ffffff",
						userSelect: "none",
					},
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					"&.MuiTableRow-Data": {
						"&:hover": {
							backgroundColor: "rgba(91, 64, 228, 0.25)",
							"& .MuiTableCell-root": {
								color: "#5b40e4",
							},
						},
						transition: "background-color 0.2s ease-in-out",
					},
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#5b40e4",
						color: "#ffffff",
						"&:hover": {
							backgroundColor: "#5b40e4",
						},
					},
					"&:hover": {
						backgroundColor: "rgba(91, 64, 228, 0.25)",
					},
					transition: "background-color 0.2s ease-in-out",
					borderColor: "#5b40e4",
					color: "#5b40e4",
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
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "#5b40e4",
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "#5b40e4",
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: "#5b40e4",
					padding: 0,
					"&.Mui-checked": {
						color: "#5b40e4",
					},
				},
			},
		},
		MuiSkeleton: {
			styleOverrides: {
				root: {
					backgroundColor: "rgba(91, 64, 228, 0.15)",
					borderRadius: "4px",
				},
			},
		},
	},
});

export default lightTheme;
