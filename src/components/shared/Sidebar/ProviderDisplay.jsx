import React from "react";
import { MenuItem } from "@mui/material";
import CustomTable from "@/components/ui/table/CustomTable";
import { useSelector, useDispatch } from "react-redux";
import { setProvider } from "@/redux/features/providerData/providerData.slice";
import { selectProviderList } from "@/redux/features/providerData/providerData.selector";

const ProviderDisplay = ({onClose}) => {
  const dispatch = useDispatch();
  const providers = useSelector(selectProviderList);

  const handleTableCell = ({ getValue }) => {
    const { type, name, logo } = getValue();
    return (
      <MenuItem
        value={name}
        onClick={() => {dispatch(setProvider({ type, name }));
      onClose();}}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px",
        }}
      >
        <img src={logo} alt={name} width={24} height={24} />
        <span style={{ fontSize: "14px" }}>{name}</span>
      </MenuItem>
    );
  };
  const columns = ["cloud", "telemetry"].map((key) => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1),
    cell: handleTableCell,
    size: 150,
    minSize: 150,
    maxSize: 150,
  }));
  return (
    <CustomTable
      data={providers}
      columns={columns}
      variant={"provider"}
       
      sx={ {maxWidth:`${350}px`, overflow:'hidden', left:'0px', position:'relative', zIndex:1000} }
    />
  );
};

export default ProviderDisplay;
