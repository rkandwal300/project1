import React from "react";
import { MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { selectProviderData } from "@/redux/features/providerData/providerData.selector";
// import { useTheme } from "@emotion/react" ;
import CustomTable from "@/components/ui/table/CustomTable";
import { useDispatch } from "react-redux";
import { setProvider } from "@/redux/features/providerData/providerData.slice";
import { useState } from "react";

const TableMenuItem = ({ type, logo, label, }) => {

  const dispatch = useDispatch()

  const handleClick = ()=>{
    dispatch((setProvider({ type,name: label })))

  }


  return (
  <MenuItem value ={label} onClick={handleClick()} style={{ display: "flex", alignItems: "center", gap: "8px", padding: '10px' }}>
    <img src={logo} alt={label} width={24} height={24} />
    <span style={{ fontSize: '14px' }}>{label}</span>
  </MenuItem>

  )
};

const columns = [
  {

    accessorKey: "cloud",
    header: "Cloud",
    cell: ({ getValue }) => {
      let value = getValue()
      value = { ...getValue(), type: "cloud" }
      return (
        <TableMenuItem {...value} />
      )
    },
    size: 150,
    minSize: 150,
    maxSize: 150
  },
  {
    accessorKey: "telemetry",
    header: "Telemetry ",
    cell: ({ getValue }) => {
      let value = getValue();
      if (value) {
        value = { ...value, type: "telemetry" }

        return <TableMenuItem {...value} />
      }
    },
    size: 150,
    minSize: 150,
    maxSize: 150
  },

];





const ProviderDisplay = () => {
  const providers = useSelector(selectProviderData);
  const maxLength = Math.max(providers.cloud.length, providers.telematry.length);

  const tableData = Array.from({ length: maxLength }, (_, i) => ({
    cloud: providers.cloud[i] || null,
    telemetry: providers.telematry[i] || null
  }));

  console.log(tableData)


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
