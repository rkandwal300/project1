import { Checkbox } from "@mui/material";

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
          "&.Mui-checked": {
            color: "#299bff",
          },
          "&.MuiCheckbox-indeterminate": {
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
          "&.Mui-checked": {
            color: "#545454",
          },
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
  },
  {
    id: "type",
    header: () => "Instance Type",
    accessorKey: "instanceType",
    cell: (info) => info.row.original.type,
  },
  {
    header: "Maximum Bandwidth Used", // Grouped Header
    columns: [
      {
        accessorKey: "maxCpuUtilization",
        header: "CPU(%)",
      },
      {
        accessorKey: "maxMemoryUsed",
        header: "Memory(GB)",
      },
      {
        accessorKey: "maxDiskBandwidth",
        header: "Disk(MBps)",
      },
      {
        accessorKey: "maxNetworkBandwidth",
        header: "Network (Mbps)",
      },
      {
        accessorKey: "maxIOPS",
        header: "IOPS",
      },
    ],
  },
  {
    id: "pricingModel",
    header: () => "Pricing Model",
    accessorKey: "pricingModel",
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
