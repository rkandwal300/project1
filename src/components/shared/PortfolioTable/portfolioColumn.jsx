// import { createColumnHelper } from "@tanstack/react-table";
// import { Checkbox } from '@mui/material';

import { Checkbox } from "@mui/material";

// const columnHelper = createColumnHelper();

// export const portfolioColumn = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllRowsSelected()}
//         indeterminate={table.getIsSomeRowsSelected()}
//         onChange={table.getToggleAllRowsSelectedHandler()}
//         sx={{
//           color: '#299bff',
//           '&.Mui-checked': {
//             color: '#299bff',
//           },
//             '&.MuiCheckbox-indeterminate': {
//                 color: '#299bff',
//             },
//         }}
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         indeterminate={row.getIsSomeSelected()}
//         onChange={row.getToggleSelectedHandler()}
//         sx={{
//     color: '#545454',
//     '&.Mui-checked': {
//       color: '#545454',
//     },
//   }}
//       />
//     ),
//     enableSorting: false,
//     enableColumnFilter: false,
//     size: 50,
//   },
//   columnHelper.accessor("uuid", {
//     header: "UUID/Instance Name",
//     cell: (info) => info.row.original.instanceType,
//   }),
//   columnHelper.accessor("region", {
//     header: "Region",
//   }),
//   columnHelper.accessor("instanceType", {
//     header: "Instance Type",
//     cell: (info) => info.row.original.instanceType,
//   }),
//   columnHelper.accessor("maxCpuUtilization", {
//     header: "CPU(%)",
//   }),
//   columnHelper.accessor("maxMemoryUsed", {
//     header: "Memory(GB)",
//   }),
//   columnHelper.accessor("maxDiskBandwidth", {
//     header: "Disk(MBps)",
//   }),
//   columnHelper.accessor("maxNetworkBandwidth", {
//     header: "Network (Mbps)",
//   }),
//   columnHelper.accessor("maxIOPS", {
//     header: "IOPS",
//   }),
//   columnHelper.accessor("pricingModel", {
//     header: "Pricing Model",
//   }),
// ];

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
    id: "instanceType",
    header: () => "Instance Type",
    accessorKey: "instanceType",
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


/*
  {
  header: 'Maximum Bandwidth Used',
  columns: [
    { accessorKey: 'maxCpuUtilization', header: 'CPU(%)' },
    { accessorKey: 'maxMemoryUsed', header: 'Memory(GB)' },
    { accessorKey: 'maxDiskBandwidth', header: 'Disk(MBps)' },
    { accessorKey: 'maxNetworkBandwidth', header: 'Network (Mbps)' },
    { accessorKey: 'maxIOPS', header: 'IOPS' },
  ],
}
*/