import BottomBar from "@/components/shared/BottomBar";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/Footer/Footer/Footer";
import { Box } from "@mui/material";
import MainContent from "./MainContent";
import ProviderDisplay from "../Sidebar/ProviderList";
import ErrorBoundary from "../ErrorBoundary";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box display={"flex"} minHeight={"100vh"} flexDirection={"column"}>
        <MainContent />
       <ErrorBoundary fallback="Something went wrong">
        <ProviderDisplay />
        </ErrorBoundary> 
        <BottomBar />
      </Box>
      <Footer />
    </Box>
  );
}
export default MainLayout;
