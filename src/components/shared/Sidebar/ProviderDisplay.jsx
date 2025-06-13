import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import CustomTable from "@/components/ui/table/CustomTable";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProvider } from "@/redux/features/providerData/providerData.slice";

const ProviderDisplay = ({ onClose, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTableCell = ({ getValue }) => {
    const { type, name, logo } = getValue();
    const handleClick = () => {
      dispatch(setProvider({ type, name }));
      onClose();
       
        navigate("/telemetry?type="+name.replace(/\s+/g, '_').toLowerCase());
    
    };
    return (
      <MenuItem
        value={name}
        onClick={handleClick}
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
      data={data}
      columns={columns}
      variant={"provider"}
      sx={{
        maxWidth: `${350}px`,
        overflow: "hidden",
        left: "0px",
        position: "relative",
        zIndex: 1000,
      }}
    />
  );
};

ProviderDisplay.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProviderDisplay;
