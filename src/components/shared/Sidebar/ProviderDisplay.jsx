import React from "react";
import { Box, Card, CardContent, Typography, Grid, Avatar, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { selectorProviderData } from "@/redux/features/providerData/providerData.selector";
import { useTheme } from "@emotion/react";
import { Divider } from "@mui/material";
import CustomTable from "@/components/ui/table/CustomTable";

const TableMenuItem = ({  logo, label }) => (<MenuItem style={{ display: "flex", alignItems: "center", gap: "8px", padding: '10px' }}>
  <img src={logo} alt={label} width={24} height={24} />
  <span style={{fontSize:'14px'}}>{label}</span>
</MenuItem>
);

const columns = [
  {
    accessorKey: "cloud",
    header: "Cloud",
    cell: ({ getValue }) => (
      <TableMenuItem {...getValue()} />
    ),
    size: 150,
    minSize: 150,
    maxSize: 150
  },
  {
    accessorKey: "telemetry",
    header: "Telemetry ",
    cell: ({ getValue }) => getValue() &&(
      <TableMenuItem {...getValue()}  />
    ),
    size: 150,
    minSize: 150,
    maxSize: 150
  },
];



const ProviderDisplay = () => {
  const providers = useSelector(selectorProviderData);
  const theme = useTheme()
  const maxLength = Math.max(providers.cloud.length, providers.telematry.length);

  const tableData = Array.from({ length: maxLength }, (_, i) => ({
    cloud: providers.cloud[i] || null,
    telemetry: providers.telematry[i] || null
  }));


  return (
    <CustomTable
      data={tableData}
      columns={columns}
      variant={"provider"}
      size={350}
    />
  );
};

export default ProviderDisplay;
