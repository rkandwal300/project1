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
        },
        containedSecondary: {
          backgroundColor: "#E53935",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#C62828",
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


// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#000000",
//     },
//     secondary: {
//       main: "#E8E8E8",
//       default: "#6F7072",
//       sidebar: "#F0F0F0",
//       sidebarBorder: "#CCCCCC",
//     },
//     error: {
//       main: "#f44336",
//       contrastText: "#fff",
//     },
//     success: {
//       main: "#4caf50",
//       contrastText: "#fff",
//     },
//     background: {
//       default: "#f9f9f9",
//       paper: "#000000",
//     },
//     dark: {
//       default: "#000000",
//       paper: "#000000",
//       secondary: "#333",
//     },
//     custom: {
//       black: "#000000",
//       grayDark: "#333333",
//     },
//     text: {
//       default: "#000000",
//       primary: "#ffffff",
//       secondary: "#555555",
//     },
//     divider: "#fffff",
//   },
//   typography: {
//     fontFamily: "Inter, Arial, sans-serif",
//     fontSize: 14,
//     button: {
//       textTransform: "none",
//       fontWeight: 500,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 4,
//           padding: "6px 16px",
//         },
//         containedPrimary: {
//           backgroundColor: "#000000",
//           color: "#fff",
//           "&:hover": {
//             backgroundColor: "#333333",
//           },
//         },
//         containedSecondary: {
//           backgroundColor: "#f44336",
//           color: "#fff",
//           "&:hover": {
//             backgroundColor: "#d32f2f",
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       defaultProps: {
//         size: "small",
//         variant: "outlined",
//       },
//       styleOverrides: {
//         root: {
//           backgroundColor: "#fff",
//         },
//       },
//     },
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: {
//           backgroundColor: "#333",
//           fontSize: "0.75rem",
//         },
//       },
//     },
//     MuiSelect: {
//       defaultProps: {
//         size: "small",
//       },
//     },
//     MuiInputBase: {
//       styleOverrides: {
//         input: {
//           padding: "8px 12px",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//         },
//       },
//     },
//   },
// });

// export default theme;
