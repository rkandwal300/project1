import React from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"; // or use Excel icon from third-party
import TooltipHoc from "@/components/ui/Tooltip";
import DialogHoc from "@/components/ui/Dialog";
import CloseIcon from "@mui/icons-material/Close";

const InstanceAdviceHeader = () => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "1.3rem", fontWeight: "bold", color: "primary.main" }}
        >
          Instance advice
        </Typography>

        <TooltipHoc message="Export detailed recommendation">
          <Button
            id="btn-cost-advice-export"
            variant="outlined"
            size="small"
            href="/cost_advisor.xlsx"
            startIcon={<FileDownloadOutlinedIcon />}
          >
            Export
          </Button>
        </TooltipHoc>
      </Box>
      <Typography
        variant="body2"
        sx={{ fontSize: "13px", color: "primary.main", px: "5px", pt: "20px" }}
      >
        *Note : All measurements are per month
      </Typography>
      <FormControlLabel
        sx={{
          px: "5px",
          "& .MuiFormControlLabel-label": {
            fontWeight: "600",
            fontSize: "16px",
            color: "#5f5f5f",
          },
        }}
        control={
          <Checkbox
            id="checkbox-128"
            value="true"
            slotProps={{
              input: {
                "aria-label": "Annually",
                "aria-describedby": "checkbox-128-messages",
              },
            }}
          />
        }
        label="Annually"
      />

      <Typography
        variant="body2"
        sx={{
          fontFamily: '"Open Sans", Arial, sans-serif',
          fontSize: "13px",
          ml: "auto",
          mb: "30px",
        }}
      >
        CI-Current Instance Data,{" "}
        <span
          style={{
            marginLeft: "0.5rem",
            fontFamily: '"Open Sans", Arial, sans-serif',
          }}
        >
          Performance Improvement*
        </span>{" "}
        <DialogHoc
          trigger={({ onClick }) => (
            <span
              onClick={onClick}
              style={{
                marginLeft: "0.5rem",
                fontFamily: '"Open Sans", Arial, sans-serif',
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 700,
              }}
            >
              Input Errors Explanation
            </span>
          )}
          content={({ handleClose }) => (
            <Box sx={{ p: 0 }} gap={0}>
              <Box
                display={"flex"}
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                {/* Title */}
                <div>
                  <Typography
                    variant="body2"
                    fontSize={"16px"}
                    fontWeight="bold"
                    gutterBottom
                  >
                    Invalid or Unsupported Scenarios:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontSize={"16px"}
                    gutterBottom
                  >
                    Region or Instance input data is invalid or specifies an
                    unsupported instance type
                  </Typography>
                </div>

                {/* Close Button */}
                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
             
                <List
                  sx={{ listStyleType: "decimal", pl: 3 }}
                  dense
                >
                  <ListItem sx={{ display: "list-item" }}>
                    <ListItemText
                      primary={
                        "Instances for which performance data is unavailable."
                      }
                      primaryTypographyProps={{ fontSize: "16px" }}
                    />
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    <ListItemText
                      primary="Older generation series (e.g., 3rd generations) with insufficient performance data."
                      primaryTypographyProps={{ fontSize: "16px" }}
                    />
                  </ListItem>
                  <ListItem sx={{ display: "list-item" }}>
                    <ListItemText
                      primary="Graviton instances, which are not currently supported by EIA."
                      primaryTypographyProps={{ fontSize: "16px" }}
                    />
                  </ListItem>
                </List>
              </Box> 
          )}
        />
      </Typography>
    </>
  );
};

export default InstanceAdviceHeader;
