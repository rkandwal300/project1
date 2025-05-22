import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import theme from "./lib/themes"; 
import Header from "./components/shared/header/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header /> 
      <h1>Vite + React</h1>
      <div className="card">
        <Typography color="primary">
          Edit <code>src/App.jsx</code> and save to test HMR
        </Typography>
      </div>
      <Typography variant="h3">
        Click on the Vite and React logos to learn more
      </Typography>
    </ThemeProvider>
  );
}

export default App;
