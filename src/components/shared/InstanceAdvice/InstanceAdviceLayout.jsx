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
  const grandTotal = data.reduce(
    (acc, item) => {
      return   {
     ...acc,
      data: {
        currentPlatform: {
          ...acc.data.currentPlatform,
         
          cost: Number(acc.data.currentPlatform.cost) + Number(item.data.currentPlatform.cost),
          power: Number(acc.data.currentPlatform.power) + Number(item.data.currentPlatform.power),
          carbon: Number(acc.data.currentPlatform.carbon) + Number(item.data.currentPlatform.carbon),
          status: "",
          vCPU: Number(acc.data.currentPlatform.vCPU) + Number(item.data.currentPlatform.vCPU),
          pricingModel: "-",
        },
        recommendations: acc.data.recommendations.map((rec, index) => ({
          ...rec,
          cost: Number(rec.cost) + Number(item.data.recommendations[index].cost),
          power: Number(rec.power) + Number(item.data.recommendations[index].power),
          carbon: Number(rec.carbon) + Number(item.data.recommendations[index].carbon),
          perf: Number(rec.perf) + Number(item.data.recommendations[index].perf),
          monthlySavings: Number(rec.monthlySavings) + Number(item.data.recommendations[index].monthlySavings),
          vCPU: Number(rec.vCPU) + Number(item.data.recommendations[index].vCPU),
        })),
          
      },
    };
    },
    {
      id: "",
      csp: "",
      data: {
        currentPlatform: {
          type: "GRAND TOTAL",
          cost: "0",
          power: "0",
          carbon: "0",
          status: "",
          vCPU: "0",
          pricingModel: "-",
        },
        recommendations: [
          {
            cost: "0",
            type: "0",
            power: "0",
            carbon: "0",
            perf: "0",
            monthlySavings: "0",
            vCPU: "0",
          },
          {
            cost: "0",
            type: "0",
            power: "0",
            carbon: "0",
            perf: "0",
            monthlySavings: "0",
            vCPU: "0",
          },
          {
            cost: "0",
            type: "0",
            power: "0",
            carbon: "0",
            perf: "0",
            monthlySavings: "0",
            vCPU: "0",
          },
        ],
      },
    }
  );
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
                data={[...data, grandTotal]}
                columns={CostAdvisoryColumn}
                isPagination
                defaultColumnPinningState={{
                  left: ["current", "instanceType", "cost", "power", "carbon"],
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
