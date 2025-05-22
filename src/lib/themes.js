import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      
    },
    secondary: {
      main: "#f44336",
    },
    background: {
      default: "#f9f9f9",
      paper:  "#000000",
    },
    dark: {
      default: "#000000",
      paper:  "#000000",
      secondary:"#333"
    },
    text: {
      default: "#000000",
      primary: "#ffffff",
      secondary: "#555555",
    },
    divider: "#fffff"

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
          borderRadius: 4,
          padding: "6px 16px",
        },
        containedPrimary: {
          backgroundColor: "#000000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
        containedSecondary: {
          backgroundColor: "#f44336",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#d32f2f",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#333",
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
  },
});

export default theme;
