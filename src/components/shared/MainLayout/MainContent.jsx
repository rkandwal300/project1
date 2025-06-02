import Sidebar from "@/components/shared/Sidebar/Sidebar"; 
import { Box, } from "@mui/material";
import InstanceForm from "@/components/shared/Form/InstanceForm";
import { useSelector } from "react-redux";
import { selectHideInstances } from "@/redux/features/form/formData.selector";
import PortfolioBody from "../PortfolioBody";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";

function MainContent() {
  const showTable = useSelector(selectHideInstances);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "flex-start",
        mt: 8,
        p: 0,
      }}
    >
      <Sidebar />
      <Box sx={{ flex: 1, p: 0, overflowY: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            overflowY: "auto",
            bgcolor: "primary.contrastText",
            boxShadow: 3,
            borderRadius: "0 0 10px 10px",
          }}
        >
          <InstanceForm />
          {!showTable && <PortfolioBody />}
        </Box>
      </Box>
    </Box>
  );
}


const MainContentWithErrorBoundary = withErrorBoundary(MainContent, "MainContent component has some Errors");
export default MainContentWithErrorBoundary