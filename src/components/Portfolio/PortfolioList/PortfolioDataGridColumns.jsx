import awsLogo from "../../../assets/logos/providers/awslogo.svg";
import { Box, Avatar, IconButton } from "@mui/material";
import { Edit, Delete, AttachMoney, Lock } from "@mui/icons-material";
import DialogHoc from "../../ui/Dialog";
import ConfirmationDialogContent from "./DeleteDialogContent";

export const PortfolioDataGridColumns = [
  {
    field: "portfolioName",
    headerName: "Portfolio Name",
    flex: 2, // Takes 2 parts of available space
    minWidth: 250, // Never shrinks below this
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          sx={{
            width: 42,
            height: 42,
            backgroundColor: "primary.contrastText",
          }}
          src={awsLogo}
          alt="AWS"
        >
          <Box
            component="span"
            sx={{
              fontSize: "10px",
              fontWeight: "bold",
              color: "secondary.default",
            }}
          >
            aws
          </Box>
        </Avatar>
        <Box>
          <Box
            sx={{
              color: "primary.contrastText",
              fontSize: "14px",
              fontWeight: 400,
              mb: 0.3,
            }}
          >
            Portfolio Name
          </Box>
          <Box
            sx={{ color: "primary.main", fontSize: "14px", fontWeight: 500 }}
          >
            {params.value}
          </Box>
        </Box>
      </Box>
    ),
  },
  {
    field: "instances",
    headerName: "No. of Instance",
    flex: 1, // Takes 1 part of available space
    minWidth: 150, // Never shrinks below this
    renderCell: (params) => (
      <Box>
        <Box sx={{ color: "primary.contrastText", fontSize: "13px", mb: 0.3 }}>
          No. of Instance
        </Box>
        <Box sx={{ color: "primary.main", fontSize: "14px", fontWeight: 500 }}>
          {params.value}
        </Box>
      </Box>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1.2, // Takes 1.2 parts of available space
    minWidth: 180, // Never shrinks below this
    renderCell: (params) => (
      <Box>
        <Box sx={{ color: "primary.contrastText", fontSize: "13px", mb: 0.3 }}>
          Created At
        </Box>
        <Box sx={{ color: "secondary.contrastText", fontSize: "14px" }}>
          {params.value}
        </Box>
      </Box>
    ),
  },
  {
    field: "createdBy",
    headerName: "Created by",
    flex: 1, // Takes 1 part of available space
    minWidth: 150, // Never shrinks below this
    renderCell: (params) => (
      <Box>
        <Box sx={{ color: "primary.contrastText", fontSize: "13px", mb: 0.3 }}>
          Created by
        </Box>
        <Box sx={{ color: "secondary.contrastText", fontSize: "14px" }}>
          {params.value}
        </Box>
      </Box>
    ),
  },
  {
    field: "createdFor",
    headerName: "Created for",
    flex: 1, // Takes 1 part of available space
    minWidth: 150, // Never shrinks below this
    renderCell: (params) => (
      <Box>
        <Box sx={{ color: "primary.contrastText", fontSize: "13px", mb: 0.3 }}>
          Created for
        </Box>
        <Box sx={{ color: "secondary.contrastText", fontSize: "14px" }}>
          {params.value}
        </Box>
      </Box>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1.2, // Takes 1.2 parts of available space
    minWidth: 180, // Never shrinks below this (enough space for all 4 icons)
    sortable: false,
    renderCell: () => {
      const handleDelete = () => {
        alert("Portfolio deleted");
      };
      return (
        <Box
          sx={{ display: "flex", gap: 1 }}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
        >
          <IconButton
            size="small"
            sx={{
              color: "primary.contrastText",
              "&:hover": {
                color: "primary.contrastText",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <DialogHoc
            maxWidth="xs"
            trigger={({ onClick }) => (
              <IconButton
                size="small"
                sx={{
                  color: "primary.contrastText",
                  "&:hover": {
                    color: "primary.contrastText",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
                onClick={onClick}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
            content={({ handleClose }) => (
              <ConfirmationDialogContent
                onClose={handleClose}
                onConfirm={handleDelete}
                title="Confirmation"
                message="Are you sure you want to Delete this Portfolio?"
                confirmText="DELETE"
                cancelText="CANCEL"
              />
            )}
          />
          <IconButton
            size="small"
            sx={{
              color: "primary.contrastText",
              "&:hover": {
                color: "primary.contrastText",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <AttachMoney fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "primary.contrastText",
              "&:hover": {
                color: "primary.contrastText",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Lock fontSize="small" />
          </IconButton>
        </Box>
      );
    },
  },
];
