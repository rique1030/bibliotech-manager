import { alpha, colors, Fade } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
	typography: {
		fontFamily: ["Roboto", "Roboto Mono", "Inter", "sans-serif"].join(", "),
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
		contrastThreshold: 2,
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
			disabled: "#c7c7c7",
			disabledBackground: "#e0e0e0",
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
			light: colors.green[200],
			dark: colors.green[800],
		},
		info: {
			main: colors.blue[500],
		},
	},
	components: {
		MuiTooltip: {
			defaultProps: {
				slots: {
					transition: Fade,
				},
			},
			styleOverrides: {
				tooltip: {
					transition: "transform 0.3s ease-in-out",
					background: "white",
					border: "1px solid #e0e0e0",
					borderRadius: "5px",
					boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
					color: "black",
					padding: "0.5rem",
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
					boxSizing: "border-box",
					"& .MuiSpan-Bold": {
						fontWeight: "bold",
						color: "#5b40e4",
					},
					overflowY: "scroll",
				},
			},
		},
		MuiTable: {
			styleOverrides: {
				root: {
					borderCollapse: "collapse",
				},
			},
		},

		MuiTableHead: {
			styleOverrides: {
				root: {
					"& thead": {
						color: "#ffffff",
					},
					"& th": {
						// backgroundColor: "#5b40e4",
						boxSizing: "border-box",
						color: "#ffffff",
						userSelect: "none",
					},
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					boxSizing: "border-box",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					// padding: "1rem",
					fontSize: "0.8rem",
					boxSizing: "border-box",
					transition: "all 0.2s ease-in-out",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					"&.Mui-disabled": {
						backgroundColor: "rgba(91, 64, 228, 0.25)",
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

		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					fontSize: "inherit",
					"&:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "#5b40e4",
					},

					"&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "#ff4343",
					},

					"&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "#ff4343",
					},

					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "#5b40e4",
					},
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					// border: "2px solid",
					borderRadius: "0.3rem",
					color: alpha("#000000", 0.7),
					fontWeight: "bold",
					"&.MuiAlert-colorSuccess": {
						backgroundColor: colors.green[500],
						// borderColor: colors.green[500],
						// color: colors.green[50],
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
					backgroundColor: "#d2c6f4",
					borderRadius: "4px",
				},
			},
		},
		MuiPagination: {
			styleOverrides: {
				root: {
					"& .MuiPaginationItem-root": {
						color: "#5b40e4",
						"&.Mui-selected": {
							backgroundColor: "#5b40e4",
							color: "#ffffff",
						},
					},
					BorderColor: "#5b40e4",
				},
			},
		},
	},
});

export default lightTheme;
