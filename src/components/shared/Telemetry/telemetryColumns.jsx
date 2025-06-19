import { Checkbox } from "@mui/material";

export const telemetryColumns = [
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
            id: "instance_id",
            header: "Instance ID",
            accessorKey: "host_id",
            minSize: 200,
            size: 200,
            maxSize: 400,
          },
          {
            id: "instanceName",
            header: () => "Instance Name",
            accessorKey: "instance_name",
            minSize: 150,
            size: 150,
            maxSize: 200,
          },
          {
            id: "instanceType",
            header: () => "Instance Type",
            accessorKey: "instance type",
            minSize: 100,
            size: 100,
            maxSize: 150,
          },
          {
            id: "region",
            header: () => "Region",
            accessorKey: "region",
            minSize: 100,
            size: 100,
            maxSize: 150,
          },
         
    ]