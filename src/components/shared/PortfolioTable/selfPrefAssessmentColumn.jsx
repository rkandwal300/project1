export const selfPrefAssessmentColumn = [
  {
    id: "instanceType",
    header: () => "Instance Type",
    accessorKey: "instanceType",
    cell: ({ getValue }) => <p style={{ height: "20px" }}>{getValue()}</p>,
  },
  {
    id: "saps",
    header: () => "saps",
    accessorKey: "saps",
  },
];