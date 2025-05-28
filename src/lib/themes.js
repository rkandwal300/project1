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
      default:"#f5f5f5"
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
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#6B6B6B",
      disabled: "#9E9E9E",
    },
    sidebar:{
      background: "#F0F0F0",
      border: "#CCCCCC"
    },
    divider: "#E0E0E0",
    grey: {
      100: "#F5F5F5",
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
          '&.Mui-disabled': {
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
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
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
  },
});

export default theme;

 