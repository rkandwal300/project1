export const selfPrefAssessmentColumn = [
  {
    id: "instanceType",
    header: () => "Instance Type",
    accessorKey: "instanceType",
    cell: ({ getValue }) => <p style={{ height: "20px" }}>{getValue()}</p>,
    minSize: 150,
    size: 150,
    maxSize: 500,
  },
  {
    id: "saps",
    header: () => "saps",
    accessorKey: "saps",
    minSize: 150,
    size: 150,
    maxSize: 500,
  },
];