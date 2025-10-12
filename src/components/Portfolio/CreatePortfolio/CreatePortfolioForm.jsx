import React from "react";
import {
  Box, 
  TextField,
  Button,
  MenuItem, 
  DataGrid
} from "../../template/index.js";
import { AddIcon, ArrowBackIcon } from "../../template/icons.js"; 
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { portfolioFormColumns } from "./PortfolioFormColumns";
import { portfolioSchema } from "../../../schemas/portfolio.schema";
import { useNavigate } from "react-router";

// Sample select options, replace with your real data if needed
const PROVIDERS = ["AWS", "Azure", "GCP"];
const REGIONS = ["af-south-1", "us-east-1", "us-west-2"];
const SIZES = ["c5.12xlarge", "t2.micro", "m5.large"];
const PRICING_MODELS = ["ondemand", "reserved", "spot"];
const CREATED_FOR = ["Finance", "Engineering", "Operations"];

const ROW_DEFAULT = {
  instanceName: "",
  region: "",
  size: "",
  quantity: "",
  hours: "",
  pricing: "",
};

export default function CreatePortfolioForm() {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      serviceProvider: "",
      portfolioName: "",
      createdFor: "",
      rows: [ROW_DEFAULT],
    },
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    getValues,
    setValue,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  // Make DataGrid rows with a unique id for react-hook-form
  const gridRows = fields.map((field, idx) => ({
    ...field,
    id: idx,
  }));

  const handleRowEditStop = (params, event) => {
    // Prevent loss of focus on edit
    event.defaultMuiPrevented = true;
  };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    // Update field array and validate row (already handled by react-hook-form)
    setValue(`rows.${newRow.id}`, newRow);
    return newRow;
  };

  const addRow = () => {
    append(ROW_DEFAULT);
  };

  const onSubmit = (data) => {
    // Validated data!
    console.log("Submitted portfolios: ", data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ p: 3, background: "background.default", width: '100%', minHeight: '100vh' }}>
        <Button
          onClick={() => navigate(-1)}
          startIcon={
            <ArrowBackIcon sx={{ fontSize: 30, width: 30, height: 30 }} />
          }
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            mb: 3,
            color: "primary.contrastText",
            textTransform: "none",
          }}
        >
          Create Portfolio
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            border: "1px solid",
            bgcolor: "secondary.main",
            borderColor: "secondary.main",
            overflow: "hidden",
            gap: 2,
          }}
        > 
          <Box
            sx={{
              display: "flex",
              gap: 2, 
            }}
          >
            <Controller
              name="serviceProvider"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  label="Service Provider"
                  sx={{ minWidth: 180 }}
                  error={!!errors.serviceProvider}
                  helperText={errors.serviceProvider?.message}
                >
                  {PROVIDERS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="portfolioName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Portfolio Name"
                  sx={{ minWidth: 220 }}
                  error={!!errors.portfolioName}
                  helperText={errors.portfolioName?.message}
                />
              )}
            />
            <Controller
              name="createdFor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  label="Created For"
                  sx={{ minWidth: 170 }}
                  error={!!errors.createdFor}
                  helperText={errors.createdFor?.message}
                >
                  {CREATED_FOR.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ ml: "auto" }}
              onClick={addRow}
              startIcon={<AddIcon />}
            >
              Add Row
            </Button>
          </Box>
          {/* Editable DataGrid */}
          <DataGrid
            rows={gridRows}
            columns={portfolioFormColumns}
            autoHeight
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={handleProcessRowUpdate}
            onRowEditStop={handleRowEditStop}
            disableRowSelectionOnClick
            hideFooter
            sx={{
              backgroundColor: "background.default",
              color: "text.primary",
              borderRadius: 2,

              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "background.paper",
                color: "text.primary",
              },
              "& .MuiDataGrid-cell": {
                bgcolor: "background.paper",
                color: "text.primary",
              },
              "& .Mui-disabled": { opacity: 0.7 },
            }}
          />
          {/* Action buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, p: 2 }}
          >
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
}
