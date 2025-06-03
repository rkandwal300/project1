const numericColumn = ({
  id,
  accessorKey,
  header,
  minSize = 150,
  size = 150,
  maxSize = 200,
  pin,
}) => ({
  id,
  accessorKey,
  header,
  cell: ({ getValue }) => {
    const value = getValue();
    return value !== undefined && value !== null ? Number(value).toFixed(2) : "";
  },
  minSize,
  size,
  maxSize,
  ...(pin ? { pin } : {}),
});

const plainColumn = ({
  id,
  accessorKey,
  header,
  minSize = 150,
  size = 150,
  maxSize = 200,
  pin,
}) => ({
  id,
  accessorKey,
  header,
  minSize,
  size,
  maxSize,
  ...(pin ? { pin } : {}),
});

const currentColumns = [
  plainColumn({
    id: "instanceType",
    accessorKey: "data.currentPlatform.type",
    header: "Instance Type",
    size: 150,
  }),
  numericColumn({
    id: "cost",
    accessorKey: "data.currentPlatform.cost",
    header: "Cost($)",
    pin: "left",
  }),
  numericColumn({
    id: "power",
    accessorKey: "data.currentPlatform.power",
    header: "Power(kw)",
    pin: "left",
  }),
  numericColumn({
    id: "carbon",
    accessorKey: "data.currentPlatform.carbon",
    header: "Carbon (kgCO2eq)",
    size: 200,
    pin: "left",
  }),
  plainColumn({
    id: "uuid",
    accessorKey: "data.currentPlatform.type",
    header: "UUID/Instance Name",
    size: 200,
  }),
  plainColumn({
    id: "csp",
    accessorKey: "csp",
    header: "Cloud",
    size: 150,
  }),
  plainColumn({
    id: "pricingModel",
    accessorKey: "data.currentPlatform.pricingModel",
    header: "Pricing Model",
    size: 150,
  }),
  plainColumn({
    id: "vCPU",
    accessorKey: "data.currentPlatform.vCPU",
    header: "vCPU(s)",
    size: 120,
  }),
  plainColumn({
    id: "status",
    accessorKey: "data.currentPlatform.status",
    header: "Remark",
    minSize: 300,
    size: 300,
    maxSize: 300,
  }),
];

const recommendationColumns = (idx, val) => [
  plainColumn({
    id: `${val}_instanceType`,
    accessorKey: `data.recommendations.${idx}.type`,
    header: "Instance Type",
    size: 150,
  }),
  plainColumn({
    id: `${val}_vCPU`,
    accessorKey: `data.recommendations.${idx}.vCPU`,
    header: "vCPU(s)",
    size: 120,
  }),
  numericColumn({
    id: `${val}_cost`,
    accessorKey: `data.recommendations.${idx}.cost`,
    header: "Cost($)",
  }),
  numericColumn({
    id: `${val}_carbon`,
    accessorKey: `data.recommendations.${idx}.carbon`,
    header: "Carbon(kgCO2eq)",
  }),
  numericColumn({
    id: `${val}_carbon_detail`,
    accessorKey: `data.recommendations.${idx}.carbon`,
    header: "Carbon (kgCO2eq)",
    size: 200,
  }),
  numericColumn({
    id: `${val}_saving`,
    accessorKey: `data.recommendations.${idx}.monthlySavings`,
    header: "Savings($)",
  }),
  numericColumn({
    id: `${val}_perf`,
    accessorKey: `data.recommendations.${idx}.perf`,
    header: "Performance Improvement*",
    size: 200,
  }),
];

export const CostAdvisoryColumn = [
  {
    id: "current",
    header: "Current",
    columns: currentColumns,
  },
  ...["Optimal", "Best", "Good"].map((val, idx) => ({
    id: val.toLowerCase(),
    header: val,
    columns: recommendationColumns(idx, val),
  })),
];
