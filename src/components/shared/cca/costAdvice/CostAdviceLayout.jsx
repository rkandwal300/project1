import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import InstanceAdviceHeader from "./InstanceAdviceHeader";
import costAdvisor from "@/lib/costAdvice.json";
import CustomTable from "@/components/ui/table/CustomTable";
import { CostAdvisoryColumn } from "./CostAdvisoryColumn";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CostAdvisaryCardList from "../../MainLayout/CostAdvisaryCardList";
import { useSelector } from "react-redux";


function CostAdviceLayout() {
   const data = costAdvisor.Data;
   const grandTotalRaw = costAdvisor.grandTotal;
   const isGrid = useSelector((state) => state.customizeTable.isGrid);

  const grandTotal = {
    data: {
      currentPlatform: {
        zone: "Grand Total",
        numberOfInstances: grandTotalRaw["Number of Instances"].toString(),
        monthlyCost: grandTotalRaw["Current Monthly Cost"],
        annualCost: grandTotalRaw["Annual Cost"],
      },
      recommendations: [
        {
          monthlyCost: grandTotalRaw["Monthly Cost I"],
          totalCost: grandTotalRaw["Annual Cost I (perf scaled)"],
          annualSavings: grandTotalRaw["Annual Savings I"],
          perf: grandTotalRaw["Perf Enhancement I"],
          // map more if needed
        },
        {
          monthlyCost: grandTotalRaw["Monthly Cost II"],
          totalCost: grandTotalRaw["Annual Cost II (perf scaled)"],
          annualSavings: grandTotalRaw["Annual Savings II"],
          perf: grandTotalRaw["Perf Enhancement II"],
        },
        {
          monthlyCost: grandTotalRaw["Monthly Cost III"],
          totalCost: grandTotalRaw["Annual Cost III (perf scaled)"],
          annualSavings: grandTotalRaw["Annual Savings III"],
          perf: grandTotalRaw["Perf Enhancement III"],
        },
      ],
    },
  };
  return (
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
          padding: 1,
        }}
      >
        <InstanceAdviceHeader />
        {/* <div style={{ marginLeft: "auto" }}>
          <Button onClick={() => setIsGrid(true)}><CalendarViewMonthIcon /></Button>
          <Button onClick={() => setIsGrid(false)}><FormatListBulletedIcon /></Button>
        </div> */}
        {isGrid ?
          <CostAdvisaryCardList data={data} isCCa={true} />
          : <CustomTable
            variant="primaryBorder"
            data={[...data, grandTotal]}
            columns={CostAdvisoryColumn}
            isPagination={true}
            defaultColumnPinningState={{
              left: [
                "current",
                "zone",
                "instanceType",
                "monthlyCost",
                "annualCost",
              ],
              right: [],
            }}
            id="instance-advice-table"
          />}
      </Box>
    </Box>
  );
}

export default CostAdviceLayout;
