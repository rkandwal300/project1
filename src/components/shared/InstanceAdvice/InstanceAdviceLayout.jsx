import { Box } from "@mui/material";
import React from "react";
import Footer from "../Footer/Footer/Footer";
import InstanceAdviceBottomBar from "./InstanceAdviceBottomBar";
import Header from "../header/Header";
import Sidebar from "../Sidebar/Sidebar";
import InstanceAdviceHeader from "./InstanceAdviceHeader";
import costAdvisor from "@/lib/instanceAdvice.json";
import CustomTable from "@/components/ui/table/CustomTable";
import { CostAdvisoryColumn } from "./CostAdvisoryColumn";

function InstanceAdviceLayout() { 
  const data = costAdvisor.Data; 
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
          <Box
            sx={{
              flex: 1,
              p: 0,
              overflowY: "auto",
              bgcolor: "error.contrastText",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                padding: 2,
              }}
            >
              <InstanceAdviceHeader />
              <CustomTable
                variant="primaryBorder"
                data={data}
                columns={CostAdvisoryColumn}
                isPagination
                defaultColumnPinningState={{
                  left: ["current","instanceType", "cost", "power", "carbon"],
                  right: [],
                }}
              />
            </Box>
          </Box>
        </Box>
        <InstanceAdviceBottomBar />
      </Box>
      <Footer />
    </Box>
  );
}

export default InstanceAdviceLayout;
