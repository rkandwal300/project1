import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1A1A1A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F5F5F5",
      contrastText: "#1A1A1A",
      default: "#8a8a8a",
    },
    error: {
      main: "#E53935",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#43A047",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#f5f5f5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#6B6B6B",
      disabled: "#9E9E9E",
    },

    sidebar: {
      background: "#F0F0F0",
      border: "#CCCCCC",
    },
    divider: "#E0E0E0",
    grey: {
      100: "#e8e8e8",
      200: "#EEEEEE",
      300: "#595959",
      500: "#9E9E9E",
      700: "#212121",
      900: "#212121",
    },
    dark: "#000000",
  },

  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 20px",
        },
        containedPrimary: {
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#333333",
          },
          "&.Mui-disabled": {
            backgroundColor: "#757575",
            color: "#FFFFFF",
          },
        },
        containedSecondary: {
          backgroundColor: "#E53935",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#C62828",
          },
        },

        containedError: {
          backgroundColor: "#E53935",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#C62828",
          },
          "&.Mui-disabled": {
            backgroundColor: "#d67687",
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#333333",
          color: "#FFFFFF",
          fontSize: "0.75rem",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: "8px 12px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "#b00020",
          color: "#FFFFFF",
          borderRadius: 6,
        },
        icon: {
          color: "#FFFFFF", // Fallback if needed
        },
        standardError: {
          backgroundColor: "#b00020",
          color: "#FFFFFF",
          "& .MuiAlert-icon": {
            color: "#FFFFFF",
          },
        },
        filledError: {
          backgroundColor: "#b00020",
          color: "#FFFFFF",
          "& .MuiAlert-icon": {
            color: "#FFFFFF",
          },
        },
        outlinedError: {
          backgroundColor: "#b00020",
          color: "#FFFFFF",
          border: "1px solid #b00020",
          "& .MuiAlert-icon": {
            color: "#FFFFFF",
          },
        },
        // Success overrides
        standardSuccess: {
          backgroundColor: "#43A047",
          color: "#FFFFFF",
          "& .MuiAlert-icon": {
            color: "#FFFFFF",
          },
        },
        filledSuccess: {
          backgroundColor: "#43A047",
          color: "#FFFFFF",
          "& .MuiAlert-icon": {
            color: "#FFFFFF",
          },
        },
        outlinedSuccess: {
          backgroundColor: "#43A047",
          color: "#FFFFFF",
          border: "1px solid #43A047",
          "& .MuiAlert-icon": {
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});

export default theme;
