import React from "react";
import { Box, Button, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowRightIcon from "@mui/icons-material/East";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";

export default function ActionBlock({ table, onDelete }) {
  const selectedRows = table.getSelectedRowModel().rows;

  const portfolioName = useSelector(selectCurrentProviderName);

  const handleDelete = () => {
    if (!selectedRows || selectedRows.length === 0) return;

    onDelete({ selectedRows });
    table.resetRowSelection();
  };
  return (
    <Box
      sx={{
        my: 1,
        mb: 5,
        px: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        color="error"
        onClick={handleDelete}
        variant="contained"
        disabled={selectedRows.length === 0}
        startIcon={<DeleteIcon />}
        size="medium"
        sx={{
          m: 1,

          mb: 0,
          textTransform: "none",
        }}
      >
        {"Delete" +
          (selectedRows.length > 0 ? " (" + selectedRows.length + ")" : "")}
      </Button>

      <Link
        href={`https://eia-prod.amd.com/regionLists?providerName=${portfolioName}`}
        underline="none"
        color="text.primary"
        target="_blank"
        sx={{
          float: "right",
          mt: 1,
          display: "inline-flex",
          alignItems: "center",
          fontSize: "0.875rem",

          "&:hover": {
            textDecoration: "underline",
          },
        }}
        className="ListOfRegions"
      >
        List of AWS Regions
        <ArrowRightIcon sx={{ fontSize: "17px", ml: 0.5 }} />
      </Link>
    </Box>
  );
}

ActionBlock.propTypes = {
  table: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
