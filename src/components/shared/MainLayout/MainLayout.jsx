import BottomBar from "@/components/shared/BottomBar";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/Footer/Footer/Footer";
import { Box, useTheme } from "@mui/material";
import MainContent from "./MainContent";

function MainLayout() {
  const themeColor = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: themeColor.palette.background.default,
      }}
    >
      <Header />
      <MainContent />
      <BottomBar />
      <Footer />
    </Box>
  );
}
export default MainLayout;
