 
import { Box } from "@mui/material"; 
import { useSelector } from "react-redux";
import PortfolioBody from "../PortfolioBody"; 
import { selectInstances } from "@/redux/features/instance/instance.selector";
import CostAdvisoryForm from "../Form/CostAdvisoryForm";


function CCAMainContent() {
  const instanceData = useSelector(selectInstances);
  const showTable = instanceData.length > 0;
  return (
    <Box sx={{ flex: 1, p: 0, overflowY: "auto" }}>
        <CostAdvisoryForm />
        {showTable && <PortfolioBody />}
    </Box>
  );
}

 
export default CCAMainContent;
