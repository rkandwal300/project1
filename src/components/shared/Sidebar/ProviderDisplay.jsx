import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { MenuItem, Typography, Avatar, Box } from "@mui/material";
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
      if (!getValue()) return;
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
          id={`menuItem-${type}-${name}`}
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
    () => [
      {
        header: toTitleCase("cloud"),
        accessorKey: "cloud",
        cell: handleCellClick,
        size: 100,
        minSize: 100,
        maxSize: 100,
      },
      {
        accessorKey: "telemetry",
        cell: handleCellClick,
        size: 150,
        minSize: 150,
        maxSize: 150,
      },
    ],
    [handleCellClick]
  );

  return (
    <Box sx={{ pb: 2, maxWidth: 370 }}>
      <CustomTable
        data={data}
        columns={columns}
        variant="provider"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          borderRadius: 0,
          borderBottom: "1px solid",
          borderColor: "grey.400",
          maxWidth: 370,
          overflow: "hidden",
          transform: "translateX(-2px)",
        }}
      />
      <Box sx={{ px: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",

            fontSize: "12px",
          }}
        >
          <strong>Disclaimer:</strong> All third-party logos and icons used are
          the property of their respective owners and are displayed for
          informational purposes only, without implying any affiliation,
          endorsement, or sponsorship.
        </Typography>
      </Box>
    </Box>
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
