import { useMemo, useCallback, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Checkbox, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
import { updateSingleInstance } from "@/redux/features/instance/instance.slice.js";
import { useDispatch ,useSelector } from "react-redux";
import { selectCurrentProviderInstanceTypes, selectCurrentProviderPricingModels, selectCurrentProviderRegions } from "@/redux/features/providerData/providerData.selector.js";

// Lazy load editable cells for performance
const EditableSelectCell = lazy(() =>
  import("./EditableCells.jsx").then((mod) => ({
    default: mod.EditableSelectCell,
  }))
);
const EditableTextCell = lazy(() =>
  import("./EditableCells.jsx").then((mod) => ({
    default: mod.EditableTextCell,
  }))
);

const EditableCell = ({ type, ...props }) => {
  return (
    <Suspense fallback={props.value ?? ""}>
      {type === "select" ? (
        <EditableSelectCell {...props} />
      ) : (
        <EditableTextCell {...props} />
      )}
    </Suspense>
  );
};

EditableCell.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
  table: PropTypes.object,
};


export default function GetInstanceColumn() {
  const dispatch = useDispatch();
  const regionOptions = useSelector  (selectCurrentProviderRegions)
  const instanceOptions = useSelector  (selectCurrentProviderInstanceTypes)
  const pricingModelOptions = useSelector  (selectCurrentProviderPricingModels)
  const getOptionsByField = (field) => {
    switch (field) {
      case "region":
        return regionOptions;
      case "instanceType":
        return instanceOptions;
      case "pricingModel":
        return pricingModelOptions;
      default:
        return undefined;
    }
  };
  const theme = useTheme();

  const handleValueChange = useCallback(
    (index, field, value) => {
      dispatch(updateSingleInstance({ index, field, value }));
    },
    [dispatch]
  );

  // Memoized renderers for editable cells
  const renderEditableCell = useCallback(
    (type, field) =>
      ({ getValue, row, isEditing, table }) =>
        isEditing ? (
          <EditableCell
            type={type}
            table={table}
            value={getValue()}
            options={getOptionsByField(field)}
            onChange={(val) => handleValueChange(row.index, field, val)}
          />
        ) : (
          getValue()
        ),
    [handleValueChange]
  );

  const renderEditableTextCell = useCallback(
    (field) =>
      ({ getValue, row, isEditing, table }) =>
        isEditing ? (
          <EditableCell
            table={table}
            id={`tableCell_${row.index}_${field}_cell`}
            type="text"
            value={getValue()}
            onChange={(val) => handleValueChange(row.index, field, val)}
          />
        ) : (
          getValue()
        ),
    [handleValueChange]
  );

  return useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            sx={{
              color: "#299bff",
              "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                color: "#299bff",
              },
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            sx={{
              color: "#545454",
              "&.Mui-checked": { color: "#545454" },
            }}
          />
        ),
        enableSorting: false,
        enableColumnFilter: false,
        size: 70,
        maxSize: 70,
        minSize: 70,
      },
      {
        id: "uuid",
        header: () => "UUID/Instance Name",
        accessorKey: "uuid",
        minSize: 200,
        size: 200,
        maxSize: 400,
      },
      {
        id: "region",
        header: () => "Region",
        accessorKey: "region",
        cell: renderEditableCell("select", "region"),
        minSize: 150,
        size: 150,
        maxSize: 200,
      },
      {
        id: "instanceType",
        header: () => "Type",
        accessorKey: "instanceType",
        cell: renderEditableCell("select", "instanceType"),
        minSize: 150,
        size: 150,
        maxSize: 200,
      },
      {
        header: "Maximum Bandwidth Used",
        columns: [
          {
            id: "maxCpuUtilization",
            accessorKey: "maxCpuUtilization",
            header: "CPU(%)",
            cell: renderEditableTextCell("maxCpuUtilization"),
            minSize: 150,
            size: 150,
            maxSize: 200,
          },
          {
            id: "maxMemoryUsed",
            accessorKey: "maxMemoryUsed",
            header: "Memory(GB)",
            cell: renderEditableTextCell("maxMemoryUsed"),
            minSize: 150,
            size: 150,
            maxSize: 200,
          },
          {
            id: "maxDiskBandwidth",
            accessorKey: "maxDiskBandwidth",
            header: "Disk(MBps)",
            cell: renderEditableTextCell("maxDiskBandwidth"),
            minSize: 150,
            size: 150,
            maxSize: 200,
          },
          {
            id: "maxNetworkBandwidth",
            accessorKey: "maxNetworkBandwidth",
            header: "Network (Mbps)",
            cell: renderEditableTextCell("maxNetworkBandwidth"),
            minSize: 150,
            size: 150,
            maxSize: 200,
          },
          {
            accessorKey: "maxIOPS",
            header: "IOPS",
            cell: renderEditableTextCell("maxIOPS"),
            minSize: 150,
            size: 150,
            maxSize: 200,
          },
        ],
      },
      {
        id: "pricingModel",
        header: () => "Pricing Model",
        accessorKey: "pricingModel",
        cell: renderEditableCell("select", "pricingModel"),
        minSize: 150,
        size: 150,
        maxSize: 200,
      },
      {
        id: "uavg",
        header: () => "UAVG",
        accessorKey: "uavg",
        cell:({getValue})=>getValue()?? "-",
        minSize: 90,
        size: 90,
        maxSize: 90,
      },
      {
        id: "pavg",
        header: () => "PAVG",
        accessorKey: "pavg",
        cell:({getValue})=>getValue()?? "-",
        minSize: 90,
        size: 90,
        maxSize: 90,
      },
      {
        id: "u95",
        header: () => "U95",
        accessorKey: "p95",
        cell:({getValue})=>getValue()?? "-",
        minSize: 90,
        size: 90,
        maxSize: 90,
      },
      {
        id: "p95",
        header: () => "P95",
        accessorKey: "p95",
        cell:({getValue})=>getValue()?? "-",
        minSize: 90,
        size: 90,
        maxSize: 90,
      },
      {
        id: "action",
        cell: ({ table, row }) => (
          <IconButton
            aria-label="clear Editable field"
            onClick={() =>
              table.options.meta.setEditingCell({
                rowIndex: null,
                columnId: null,
              })
            }
            edge="end"
            size="small"
            sx={{
              visibility:
                table.options.meta?.editingCell?.rowIndex === row.index
                  ? "visible"
                  : "hidden",
              scale: "0.8",
              bgcolor: theme.palette.grey[600],
              color: theme.palette.primary.contrastText,
              borderRadius: "50%",
              p: 0.5,
              ml: 0.5,
              "&:hover": {
                bgcolor: theme.palette.grey[600],
              },
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
        size: 50,
        maxSize: 50,
        minSize: 50,
      },
    ],
    [renderEditableCell, renderEditableTextCell, theme]
  );
}
