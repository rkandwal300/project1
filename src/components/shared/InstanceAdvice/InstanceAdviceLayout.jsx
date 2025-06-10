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
import Dashboard from "./Dashboard";

function InstanceAdviceLayout() {
  const [ isAnnually, setIsAnnually ] = React.useState(false);
  const data = costAdvisor.Data;
  // const grandTotal = data.reduce(
  //   (acc, item) => {
  //     return   {
  //    ...acc,
  //     data: {
  //       currentPlatform: {
  //         ...acc.data.currentPlatform,
         
  //         cost: Number(acc.data.currentPlatform.cost) + Number(item.data.currentPlatform.cost),
  //         power: Number(acc.data.currentPlatform.power) + Number(item.data.currentPlatform.power),
  //         carbon: Number(acc.data.currentPlatform.carbon) + Number(item.data.currentPlatform.carbon),
  //         status: "",
  //         vCPU: Number(acc.data.currentPlatform.vCPU) + Number(item.data.currentPlatform.vCPU),
  //         pricingModel: "-",
  //       },
  //       recommendations: acc.data.recommendations.map((rec, index) => ({
  //         ...rec,
  //         cost: Number(rec.cost) + Number(item.data.recommendations[index].cost),
  //         power: Number(rec.power) + Number(item.data.recommendations[index].power),
  //         carbon: Number(rec.carbon) + Number(item.data.recommendations[index].carbon),
  //         perf: Number(rec.perf) + Number(item.data.recommendations[index].perf),
  //         monthlySavings: Number(rec.monthlySavings) + Number(item.data.recommendations[index].monthlySavings),
  //         vCPU: Number(rec.vCPU) + Number(item.data.recommendations[index].vCPU),
  //       })),
          
  //     },
  //   };
  //   },
  //   {
  //     id: "",
  //     csp: "",
  //     data: {
  //       currentPlatform: {
  //         type: "GRAND TOTAL",
  //         cost: "0",
  //         power: "0",
  //         carbon: "0",
  //         status: "",
  //         vCPU: "0",
  //         pricingModel: "-",
  //       },
  //       recommendations: [
  //         {
  //           cost: "0",
  //           type: "0",
  //           power: "0",
  //           carbon: "0",
  //           perf: "0",
  //           monthlySavings: "0",
  //           vCPU: "0",
  //         },
  //         {
  //           cost: "0",
  //           type: "0",
  //           power: "0",
  //           carbon: "0",
  //           perf: "0",
  //           monthlySavings: "0",
  //           vCPU: "0",
  //         },
  //         {
  //           cost: "0",
  //           type: "0",
  //           power: "0",
  //           carbon: "0",
  //           perf: "0",
  //           monthlySavings: "0",
  //           vCPU: "0",
  //         },
  //       ],
  //     },
  //   }
  // ); 
const grandTotal = data.reduce(
  (acc, item, index) => {
    const current = item.data.currentPlatform;
    const recommendations = item.data.recommendations;

    // If first item, initialize recommendations
    if (index === 0) {
      acc.data.recommendations = recommendations.map((rec) => ({
        ...rec,
        cost: Number(rec.cost),
        power: Number(rec.power),
        carbon: Number(rec.carbon),
        perf: Number(rec.perf),
        monthlySavings: Number(rec.monthlySavings),
        vCPU: Number(rec.vCPU),
      }));
    } else {
      acc.data.recommendations = acc.data.recommendations.map((rec, i) => {
        const currentRec = recommendations[i];
        return {
          ...rec,
          cost: rec.cost + Number(currentRec.cost),
          power: rec.power + Number(currentRec.power),
          carbon: rec.carbon + Number(currentRec.carbon),
          perf: rec.perf + Number(currentRec.perf),
          monthlySavings: rec.monthlySavings + Number(currentRec.monthlySavings),
          vCPU: rec.vCPU + Number(currentRec.vCPU),
        };
      });
    }

    acc.data.currentPlatform.cost += Number(current.cost);
    acc.data.currentPlatform.power += Number(current.power);
    acc.data.currentPlatform.carbon += Number(current.carbon);
    acc.data.currentPlatform.vCPU += Number(current.vCPU);

    return acc;
  },
  {
    id: "grand-total",
    csp: "all",
    data: {
      currentPlatform: {
        type: "GRAND TOTAL",
        cost: 0,
        power: 0,
        carbon: 0,
        status: "",
        vCPU: 0,
        pricingModel: "-",
      },
      recommendations: [],
    },
  }
);

 const dashboardData = React.useMemo(() => {
  const multiplier = isAnnually ? 12 : 1;

  return {
    currentPlatform: {
      cost: Number(grandTotal.data.currentPlatform.cost) * multiplier,
      power: Number(grandTotal.data.currentPlatform.power) * multiplier,
      carbon: Number(grandTotal.data.currentPlatform.carbon) * multiplier,
    },
    recommendations: grandTotal.data.recommendations.map((rec) => ({
      cost: Number(rec.cost) * multiplier,
      power: Number(rec.power) * multiplier,
      carbon: Number(rec.carbon) * multiplier,
    })),
  };
}, [isAnnually, grandTotal]);

 
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
              <InstanceAdviceHeader isAnnually={isAnnually} setIsAnnually={setIsAnnually}  />
              <Dashboard data = {dashboardData} />
              <CustomTable
                variant="primaryBorder"
                data={[...data, grandTotal]}
                columns={CostAdvisoryColumn}
                isPagination
                defaultColumnPinningState={{
                  left: ["current", "instanceType", "cost", "power", "carbon"],
                  right: [],
                }}id="instance-advice-table"
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
