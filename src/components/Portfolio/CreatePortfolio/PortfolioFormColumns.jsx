import { TextField, Button, MenuItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller } from "react-hook-form";


const REGIONS = ["af-south-1", "us-east-1", "us-west-2"];
const SIZES = ["c5.12xlarge", "t2.micro", "m5.large"];
const PRICING_MODELS = ["ondemand", "reserved", "spot"];

export const portfolioFormColumns = [
  {
    field: "instanceName",
    headerName: "UUID/Instance Name",
    width: 200,
    editable: true,
    renderEditCell: (params) => (
      <Controller
        name={`rows.${params.row.id}.instanceName`}
        control={control}
        defaultValue={params.row.instanceName}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            variant="outlined"
            error={!!errors.rows?.[params.row.id]?.instanceName}
            helperText={errors.rows?.[params.row.id]?.instanceName?.message}
            sx={{ bgcolor: "background.paper", color: "text.primary" }}
            autoFocus
          />
        )}
      />
    ),
    renderCell: (params) => <span>{params.value}</span>,
  },
  {
    field: "region",
    headerName: "Region",
    width: 150,
    editable: true,
    type: "singleSelect",
    valueOptions: REGIONS,
    renderEditCell: (params) => (
      <Controller
        name={`rows.${params.row.id}.region`}
        control={control}
        defaultValue={params.row.region}
        render={({ field }) => (
          <TextField
            {...field}
            select
            size="small"
            variant="outlined"
            error={!!errors.rows?.[params.row.id]?.region}
            helperText={errors.rows?.[params.row.id]?.region?.message}
            sx={{ bgcolor: "background.paper", color: "text.primary" }}
          >
            {REGIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    ),
    renderCell: (params) => <span>{params.value}</span>,
  },
  {
    field: "size",
    headerName: "Size",
    width: 150,
    editable: true,
    type: "singleSelect",
    valueOptions: SIZES,
    renderEditCell: (params) => (
      <Controller
        name={`rows.${params.row.id}.size`}
        control={control}
        defaultValue={params.row.size}
        render={({ field }) => (
          <TextField
            {...field}
            select
            size="small"
            variant="outlined"
            error={!!errors.rows?.[params.row.id]?.size}
            helperText={errors.rows?.[params.row.id]?.size?.message}
            sx={{ bgcolor: "background.paper", color: "text.primary" }}
          >
            {SIZES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    ),
    renderCell: (params) => <span>{params.value}</span>,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 110,
    editable: true,
    renderEditCell: (params) => (
      <Controller
        name={`rows.${params.row.id}.quantity`}
        control={control}
        defaultValue={params.row.quantity}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            type="number"
            variant="outlined"
            error={!!errors.rows?.[params.row.id]?.quantity}
            helperText={errors.rows?.[params.row.id]?.quantity?.message}
            sx={{ bgcolor: "background.paper", color: "text.primary" }}
          />
        )}
      />
    ),
    renderCell: (params) => <span>{params.value}</span>,
  },
  {
    field: "hours",
    headerName: "Total no. hours/month",
    width: 140,
    editable: true,
    renderEditCell: (params) => (
      <Controller
        name={`rows.${params.row.id}.hours`}
        control={control}
        defaultValue={params.row.hours}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            type="number"
            variant="outlined"
            error={!!errors.rows?.[params.row.id]?.hours}
            helperText={errors.rows?.[params.row.id]?.hours?.message}
            sx={{ bgcolor: "background.paper", color: "text.primary" }}
          />
        )}
      />
    ),
    renderCell: (params) => <span>{params.value}</span>,
  },
  {
    field: "pricing",
    headerName: "Pricing Model",
    width: 140,
    editable: true,
    type: "singleSelect",
    valueOptions: PRICING_MODELS,
    renderEditCell: (params) => (
      <Controller
        name={`rows.${params.row.id}.pricing`}
        control={control}
        defaultValue={params.row.pricing}
        render={({ field }) => (
          <TextField
            {...field}
            select
            size="small"
            variant="outlined"
            error={!!errors.rows?.[params.row.id]?.pricing}
            helperText={errors.rows?.[params.row.id]?.pricing?.message}
            sx={{ bgcolor: "background.paper", color: "text.primary" }}
          >
            {PRICING_MODELS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    ),
    renderCell: (params) => <span>{params.value}</span>,
  },
  {
    field: "id",
    headerName: "Actions",
    width: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <IconButton color="secondary" onClick={() => remove(params.row.id)}>
        <DeleteIcon />
      </IconButton>
    ),
  },
];
