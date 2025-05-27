import { CustomTable } from "@/components/ui/table/CustomTable";
import React from "react";
import { portfolioColumn } from "./portfolioColumn";
import { useSelector } from "react-redux";
import { selectInstanceStats } from "@/redux/features/instance/instance.selector";

function PortfolioTable() {
  const data = useSelector(selectInstanceStats);
  return (
    <CustomTable
      variant="primary"
      data={data}
      columns={portfolioColumn}
      isPagination={true}
    />
  );
}

export default PortfolioTable;
