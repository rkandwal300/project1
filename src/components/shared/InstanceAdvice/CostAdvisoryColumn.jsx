import TooltipHoc from "@/components/ui/Tooltip";

// Utility: Default column sizes
const DEFAULT_SIZE = 150;
const DEFAULT_MIN_SIZE = 150;
const DEFAULT_MAX_SIZE = 200;

// Utility: Numeric cell renderer
const renderNumericCell = ({ getValue }) => {
  const value = getValue();
  return value !== undefined && value !== null ? Number(value).toFixed(2) : "-";
};

// Utility: Plain cell renderer
const renderPlainCell = ({ getValue }) => {
  const value = getValue();
  return value && value.length > 0 ? value : "-";
};

// Column Factory: Numeric
const numericColumn = ({
  id,
  accessorKey,
  header,
  minSize = DEFAULT_MIN_SIZE,
  size = DEFAULT_SIZE,
  maxSize = DEFAULT_MAX_SIZE,
  pin,
}) => ({
  id,
  accessorKey,
  header,
  cell: renderNumericCell,
  minSize,
  size,
  maxSize,
  ...(pin && { pin }),
});

// Column Factory: Plain
const plainColumn = ({
  id,
  accessorKey,
  header,
  minSize = DEFAULT_MIN_SIZE,
  size = DEFAULT_SIZE,
  maxSize = DEFAULT_MAX_SIZE,
  pin,
  cell,
}) => ({
  id,
  accessorKey,
  header,
  minSize,
  size,
  maxSize,
  cell: cell || renderPlainCell,
  ...(pin && { pin }),
});
 
const tooltipCell = ({ getValue }) => {
  const value = getValue();
  return (
    <TooltipHoc message={value || "-"}>
      <p
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: 0,
          maxWidth: "100%",
          cursor: "pointer", 
        }}
      >
        {value && value.length > 0 ? value : "-"}
      </p>
    </TooltipHoc>
  );
};
 
const currentMetricColumns = [
  plainColumn({
    id: "instanceType",
    accessorKey: "data.currentPlatform.type",
    header: "Instance Type",
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
];
 
const currentDetailColumns = [
  plainColumn({
    id: "uuid",
    accessorKey: "id",
    header: "UUID/Instance Name",
    cell: tooltipCell,
    size: 200,
  }),
  plainColumn({
    id: "csp",
    accessorKey: "csp",
    header: "Cloud",
  }),
  plainColumn({
    id: "pricingModel",
    accessorKey: "data.currentPlatform.pricingModel",
    header: "Pricing Model",
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
 
const recommendationColumns = (idx, label) => [
  plainColumn({
    id: `${label}_instanceType`,
    accessorKey: `data.recommendations.${idx}.type`,
    header: "Instance Type",
  }),
  plainColumn({
    id: `${label}_vCPU`,
    accessorKey: `data.recommendations.${idx}.vCPU`,
    header: "vCPU(s)",
    size: 120,
  }),
  numericColumn({
    id: `${label}_cost`,
    accessorKey: `data.recommendations.${idx}.cost`,
    header: "Cost($)",
  }),
  numericColumn({
    id: `${label}_power`,
    accessorKey: `data.recommendations.${idx}.power`,
    header: "Power(kw)",
  }),
  numericColumn({
    id: `${label}_carbon`,
    accessorKey: `data.recommendations.${idx}.carbon`,
    header: "Carbon (kgCO2eq)",
    size: 200,
  }),
  numericColumn({
    id: `${label}_saving`,
    accessorKey: `data.recommendations.${idx}.monthlySavings`,
    header: "Savings($)",
  }),
  numericColumn({
    id: `${label}_perf`,
    accessorKey: `data.recommendations.${idx}.perf`,
    header: "Performance Improvement*",
    size: 210,
    minSize: 210,
    maxSize: 210,
  }),
];


export const CostAdvisoryColumn = [
  {
    id: "current1",
    header: "Current",
    columns: currentMetricColumns,
    meta: {
      align: "center",
      colSpan: 4,
    },
  },
  {
    id: "current2",
    header: "",
    columns: currentDetailColumns,
    meta: {
      align: "center",
      colSpan: 4,
    },
  },
  ...["Optimal", "Best", "Good"].map((label, idx) => ({
    id: label.toLowerCase(),
    header: label,
    columns: recommendationColumns(idx, label),
    meta: {
      align: "center",
    },
  })),
];
