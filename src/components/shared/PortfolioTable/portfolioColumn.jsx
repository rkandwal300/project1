import SelectHoc from "@/components/ui/Select";
import {
  instanceOptions,
  pricingModelOptions,
  regionOptions,
} from "@/lib/constant";
import { Checkbox, } from "@mui/material";

import { EditableSelectCell, EditableTextCell } from "./EditableCells.jsx";
export const portfolioColumn = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        sx={{
          color: "#299bff",
          "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: "#299bff" },
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
    size: 50,
  },
  {
    id: "uuid",
    header: () => "UUID/Instance Name",
    accessorKey: "uuid",
    cell: (info) => info.row.original.instanceType,
  },
  {
    id: "region",
    header: () => "Region",
    accessorKey: "region",
    cell: ({ getValue, row, isEditing, table }) =>
      isEditing ? (
        <EditableSelectCell
          value={getValue()}
          options={regionOptions}
          onChange={(val) => (row.original.region = val)}
          table={table}
          row={row}
          columnKey="region"
        />
      ) : (
        getValue()
      ),
  },
  {
    id: "type",
    header: () => "Type",
    accessorKey: "instanceType",
    cell: ({ row, isEditing, table }) =>
      isEditing ? (
        <EditableSelectCell
          value={row.original.type}
          options={instanceOptions}
          onChange={(val) => (row.original.type = val)}
          table={table}
          row={row}
          columnKey="type"
        />
      ) : (
        row.original.type
      ),
  },
  {
    header: "Maximum Bandwidth Used",
    columns: [
      {
        accessorKey: "maxCpuUtilization",
        header: "CPU(%)",
        cell: ({ getValue, row, isEditing }) =>
          isEditing ? (
            <EditableTextCell
              value={getValue()}
              onChange={(val) => (row.original.maxCpuUtilization = val)}
            />
          ) : (
            getValue()
          ),
      },
      {
        accessorKey: "maxMemoryUsed",
        header: "Memory(GB)",
        cell: ({ getValue, row, isEditing }) =>
          isEditing ? (
            <EditableTextCell
              value={getValue()}
              onChange={(val) => (row.original.maxMemoryUsed = val)}
            />
          ) : (
            getValue()
          ),
      },
      {
        accessorKey: "maxDiskBandwidth",
        header: "Disk(MBps)",
        cell: ({ getValue, row, isEditing }) =>
          isEditing ? (
            <EditableTextCell
              value={getValue()}
              onChange={(val) => (row.original.maxDiskBandwidth = val)}
            />
          ) : (
            getValue()
          ),
      },
      {
        accessorKey: "maxNetworkBandwidth",
        header: "Network (Mbps)",
        cell: ({ getValue, row, isEditing }) =>
          isEditing ? (
            <EditableTextCell
              value={getValue()}
              onChange={(val) => (row.original.maxNetworkBandwidth = val)}
            />
          ) : (
            getValue()
          ),
      },
      {
        accessorKey: "maxIOPS",
        header: "IOPS",
        cell: ({ getValue, row, isEditing }) =>
          isEditing ? (
            <EditableTextCell
              value={getValue()}
              onChange={(val) => (row.original.maxIOPS = val)}
            />
          ) : (
            getValue()
          ),
      },
    ],
  },
  {
    id: "pricingModel",
    header: () => "Pricing Model",
    accessorKey: "pricingModel",
    cell: ({ getValue, row, isEditing, table }) =>
      isEditing ? (
        <EditableSelectCell
          value={getValue()}
          options={pricingModelOptions}
          onChange={(val) => (row.original.pricingModel = val)}
          table={table}
          row={row}
          columnKey="pricingModel"
        />
      ) : (
        getValue()
      ),
  },
];

export const selfPrefAssessmentColumn = [
  {
    id: "instanceType",
    header: () => "Instance Type",
    accessorKey: "instanceType",
  },
  {
    id: "saps",
    header: () => "saps",
    accessorKey: "saps",
  },
];
