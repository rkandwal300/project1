import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { MenuItem, Typography, Avatar } from "@mui/material";
import CustomTable from "@/components/ui/table/CustomTable";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProvider } from "@/redux/features/providerData/providerData.slice";
import { addCurrentInstance } from "@/redux/features/instanceList/instanceList.slice";
import { resetInstanceState } from "@/redux/features/instance/instance.slice";

// Utility to format header text
const toTitleCase = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const ProviderDisplay = ({ onClose, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCellClick = useCallback(
    ({ getValue }) => {
      const { type, name, logo } = getValue();

      const handleClick = () => {
        dispatch(setProvider({ type, name }));
        dispatch(addCurrentInstance(null));
            dispatch(resetInstanceState());
        const formattedName = name;
        
        if (type === "cloud") {
          navigate(`/?type=${formattedName}`);
        } else if (type === "telemetry") {
          navigate(`/telemetry?type=${formattedName}`);
        }
        onClose();
      };

      return (
        <MenuItem
          value={name}
          onClick={handleClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            py: 1.25,
          }}
        >
          <Avatar src={logo} alt={name} sx={{ width: 24, height: 24 }} />
          <Typography variant="body2">{name}</Typography>
        </MenuItem>
      );
    },
    [dispatch, navigate, onClose]
  );

  const columns = useMemo(
    () =>
      ["cloud", "telemetry"].map((key) => ({
        accessorKey: key,
        header: toTitleCase(key),
        cell: handleCellClick,
        size: 150,
        minSize: 150,
        maxSize: 150,
      })),
    [handleCellClick]
  );

  return (
    <CustomTable
      data={data}
      columns={columns}
      variant="provider"
      sx={{
        maxWidth: 350,
        overflow: "hidden",
        position: "relative",
        zIndex: 1000,
        left: 0,
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
